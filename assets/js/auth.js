/* ==========================================================================
   VOLTCYCLE — AUTH PAGES (login / signup / forgot-password)
   Client-side validation + UI states. No backend is wired up yet:
   set AUTH_ENDPOINTS below to your API routes to make the forms live.
   ========================================================================== */

const AUTH_ENDPOINTS = {
  login: null,   // e.g. '/api/auth/login'
  signup: null,  // e.g. '/api/auth/signup'
  forgot: null   // e.g. '/api/auth/forgot-password'
};

document.addEventListener('DOMContentLoaded', () => {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- Show / hide password ---------- */
  document.querySelectorAll('.auth-toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      btn.innerHTML = `<i class="ph ph-${show ? 'eye-slash' : 'eye'}"></i>`;
    });
  });

  /* ---------- Password strength (signup) ---------- */
  const pwInput = document.getElementById('signupPassword');
  const meter = document.getElementById('pwMeter');
  const hints = document.querySelectorAll('#pwHints [data-rule]');
  const PW_RULES = {
    length: v => v.length >= 8,
    case: v => /[a-z]/.test(v) && /[A-Z]/.test(v),
    number: v => /\d/.test(v),
    symbol: v => /[^A-Za-z0-9]/.test(v)
  };
  const pwScore = v => Object.values(PW_RULES).filter(fn => fn(v)).length;
  if (pwInput && meter) {
    pwInput.addEventListener('input', () => {
      const v = pwInput.value;
      meter.dataset.score = v ? pwScore(v) : 0;
      hints.forEach(li => li.classList.toggle('ok', PW_RULES[li.dataset.rule](v)));
    });
  }

  /* ---------- Field error helpers ---------- */
  const setError = (input, msg) => {
    const field = input.closest('.auth-field') || input.closest('.auth-check');
    if (!field) return;
    field.classList.add('has-error');
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    const err = field.querySelector('.auth-error span');
    if (err && msg) err.textContent = msg;
  };
  const clearError = input => {
    const field = input.closest('.auth-field') || input.closest('.auth-check');
    if (field) field.classList.remove('has-error');
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
  };
  document.querySelectorAll('.auth-form input').forEach(i =>
    i.addEventListener('input', () => clearError(i)));

  const showAlert = (form, msg, isError = false) => {
    const alert = form.querySelector('.auth-alert');
    if (!alert) return;
    alert.classList.toggle('is-error', isError);
    alert.querySelector('span').textContent = msg;
    alert.classList.add('is-visible');
  };

  const setLoading = (btn, loading, label) => {
    if (!btn.dataset.label) btn.dataset.label = btn.innerHTML;
    btn.disabled = loading;
    btn.innerHTML = loading ? `<i class="ph ph-spinner ph-spin"></i> ${label}` : btn.dataset.label;
  };

  // POSTs to the configured endpoint, or simulates a short delay in demo mode.
  const submitTo = async (endpoint, payload) => {
    if (!endpoint) {
      await new Promise(r => setTimeout(r, 1100));
      return { ok: true, demo: true };
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    let data = {};
    try { data = await res.json(); } catch (_) { /* empty body */ }
    return { ok: res.ok, ...data };
  };

  /* ---------- Login ---------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = loginForm.querySelector('#loginEmail');
      const pw = loginForm.querySelector('#loginPassword');
      let valid = true;
      if (!EMAIL_RE.test(email.value.trim())) { setError(email, 'Enter a valid email address.'); valid = false; }
      if (!pw.value) { setError(pw, 'Enter your password.'); valid = false; }
      if (!valid) return (loginForm.querySelector('.is-invalid') || email).focus();

      const btn = loginForm.querySelector('.auth-submit');
      setLoading(btn, true, 'Signing in…');
      try {
        const res = await submitTo(AUTH_ENDPOINTS.login, {
          email: email.value.trim(), password: pw.value,
          remember: loginForm.querySelector('#rememberMe').checked
        });
        if (!res.ok) throw new Error(res.message || 'Incorrect email or password.');
        if (res.demo) {
          showAlert(loginForm, 'Demo mode: no account server is connected yet, so nothing was checked. Redirecting to the homepage…');
          setTimeout(() => { window.location.href = 'index.html'; }, 1600);
        } else {
          window.location.href = res.redirect || 'index.html';
        }
      } catch (err) {
        showAlert(loginForm, err.message, true);
        setLoading(btn, false);
      }
    });
  }

  /* ---------- Signup ---------- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async e => {
      e.preventDefault();
      const first = signupForm.querySelector('#signupFirst');
      const last = signupForm.querySelector('#signupLast');
      const email = signupForm.querySelector('#signupEmail');
      const pw = signupForm.querySelector('#signupPassword');
      const terms = signupForm.querySelector('#signupTerms');
      let valid = true;
      if (!first.value.trim()) { setError(first, 'Required.'); valid = false; }
      if (!last.value.trim()) { setError(last, 'Required.'); valid = false; }
      if (!EMAIL_RE.test(email.value.trim())) { setError(email, 'Enter a valid email address.'); valid = false; }
      if (pwScore(pw.value) < 3 || pw.value.length < 8) { setError(pw, 'Use 8+ characters with a mix of cases, numbers or symbols.'); valid = false; }
      if (!terms.checked) { setError(terms); valid = false; }
      if (!valid) return (signupForm.querySelector('.is-invalid') || first).focus();

      const btn = signupForm.querySelector('.auth-submit');
      setLoading(btn, true, 'Creating account…');
      try {
        const interests = [...signupForm.querySelectorAll('input[name="interest"]:checked')].map(i => i.value);
        const res = await submitTo(AUTH_ENDPOINTS.signup, {
          firstName: first.value.trim(), lastName: last.value.trim(),
          email: email.value.trim(), password: pw.value, interests,
          newsletter: signupForm.querySelector('#signupNews').checked
        });
        if (!res.ok) throw new Error(res.message || 'We could not create your account. Please try again.');
        document.getElementById('successEmail').textContent = email.value.trim();
        signupForm.closest('.auth-form-wrap').hidden = true;
        document.getElementById('authSuccess').classList.add('is-visible');
      } catch (err) {
        showAlert(signupForm, err.message, true);
        setLoading(btn, false);
      }
    });
  }

  /* ---------- Forgot password ---------- */
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = forgotForm.querySelector('#forgotEmail');
      if (!EMAIL_RE.test(email.value.trim())) { setError(email, 'Enter a valid email address.'); return email.focus(); }

      const btn = forgotForm.querySelector('.auth-submit');
      setLoading(btn, true, 'Sending link…');
      try {
        const res = await submitTo(AUTH_ENDPOINTS.forgot, { email: email.value.trim() });
        if (!res.ok) throw new Error(res.message || 'Something went wrong. Please try again.');
        document.getElementById('successEmail').textContent = email.value.trim();
        forgotForm.closest('.auth-form-wrap').hidden = true;
        document.getElementById('authSuccess').classList.add('is-visible');
      } catch (err) {
        showAlert(forgotForm, err.message, true);
        setLoading(btn, false);
      }
    });

    const resend = document.getElementById('resendBtn');
    if (resend) resend.addEventListener('click', () => {
      document.getElementById('authSuccess').classList.remove('is-visible');
      forgotForm.closest('.auth-form-wrap').hidden = false;
      setLoading(forgotForm.querySelector('.auth-submit'), false);
      forgotForm.querySelector('#forgotEmail').focus();
    });
  }

  /* ---------- Social buttons (not wired yet) ---------- */
  document.querySelectorAll('.auth-social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const form = document.querySelector('.auth-form');
      if (form) showAlert(form, `${btn.dataset.provider} sign-in is not connected yet. Use email for now.`);
    });
  });
});
