/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Contact Form Controller (contact.js)
 * Implements client-side validation, live character counting,
 * consent requirement blocker, and inline success notification.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('contactForm')) {
    initContactForm();
  }
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const topicSelect = document.getElementById('contactTopic');
  const messageInput = document.getElementById('contactMessage');
  const consentCb = document.getElementById('contactConsent');
  const charCounter = document.getElementById('messageCharCounter');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const alertSuccess = document.getElementById('contactSuccessAlert');

  if (!form) return;

  // Live character counter for message
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 1000 characters (min 20)`;
      if (len < 20 || len > 1000) {
        charCounter.style.color = 'var(--color-danger)';
      } else {
        charCounter.style.color = 'var(--color-secondary-dim)';
      }
    });
  }

  // Field validation helpers
  const validateField = (input, isValid, feedbackText) => {
    const feedbackEl = input.parentElement.querySelector('.invalid-feedback');
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedbackEl) feedbackEl.style.display = 'none';
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (feedbackEl) {
        feedbackEl.textContent = feedbackText;
        feedbackEl.style.display = 'block';
      }
    }
    return isValid;
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      validateField(nameInput, false, 'Please enter your full name (minimum 2 characters).');
      isFormValid = false;
    } else {
      validateField(nameInput, true);
    }

    // Validate Email
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      validateField(emailInput, false, 'Please enter a valid email address.');
      isFormValid = false;
    } else {
      validateField(emailInput, true);
    }

    // Validate Topic
    if (!topicSelect.value) {
      validateField(topicSelect, false, 'Please select an enquiry topic.');
      isFormValid = false;
    } else {
      validateField(topicSelect, true);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 20) {
      validateField(messageInput, false, 'Your message must be at least 20 characters long.');
      isFormValid = false;
    } else if (messageInput.value.trim().length > 1000) {
      validateField(messageInput, false, 'Message exceeds 1000 character limit.');
      isFormValid = false;
    } else {
      validateField(messageInput, true);
    }

    // Validate Consent Checkbox
    if (!consentCb.checked) {
      const consentFeedback = consentCb.parentElement.querySelector('.invalid-feedback');
      if (consentFeedback) consentFeedback.style.display = 'block';
      isFormValid = false;
    } else {
      const consentFeedback = consentCb.parentElement.querySelector('.invalid-feedback');
      if (consentFeedback) consentFeedback.style.display = 'none';
    }

    if (!isFormValid) return;

    // Disable button and simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending message...';

    setTimeout(() => {
      form.reset();
      // Remove valid classes
      [nameInput, emailInput, topicSelect, messageInput].forEach(el => el.classList.remove('is-valid'));
      if (charCounter) charCounter.textContent = '0 / 1000 characters (min 20)';
      
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="ph ph-paper-plane-right"></i>';

      if (alertSuccess) {
        alertSuccess.style.display = 'block';
        alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 900);
  });
}
