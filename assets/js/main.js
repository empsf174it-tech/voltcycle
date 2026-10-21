/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Main UI Controller (main.js)
 * Handles navbar, responsive mobile drawer, accordions, scroll-spy, and global modal events.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initScrollSpy();
});

/**
 * Mobile Drawer & Dropdown Logic
 */
function initNavbar() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('navDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link:not(.drawer-accordion-btn), .drawer-sublink');
  const accordionBtn = document.querySelector('.drawer-accordion-btn');
  const sublinks = document.querySelector('.drawer-sublinks');

  if (hamburgerBtn && drawer && backdrop) {
    const openDrawer = () => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    hamburgerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Accordion toggle inside mobile drawer for Services
    if (accordionBtn && sublinks) {
      accordionBtn.addEventListener('click', () => {
        const isOpen = sublinks.classList.contains('is-open');
        if (isOpen) {
          sublinks.classList.remove('is-open');
          accordionBtn.setAttribute('aria-expanded', 'false');
        } else {
          sublinks.classList.add('is-open');
          accordionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }
}

/**
 * FAQ Accordion Component
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isCurrentOpen = item.classList.contains('is-open');
      // Close other open items
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isCurrentOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Scroll Spy for Home Page Anchor Navigation
 */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-link[href^="index.html#"]');
  if (!navLinks.length) return;

  const sections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
    if (hash && hash !== '#') {
      const target = document.querySelector(hash);
      if (target) sections.push({ link, target });
    }
  });

  if (!sections.length) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    let currentFound = false;

    for (let i = sections.length - 1; i >= 0; i--) {
      const { link, target } = sections[i];
      if (target.offsetTop <= scrollPos) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentFound = true;
        break;
      }
    }

    if (!currentFound && window.scrollY < 300) {
      navLinks.forEach(l => l.classList.remove('active'));
      const homeLink = document.querySelector('.nav-link[href="index.html"], .nav-link[href="./"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }, { passive: true });
}

/* Premium polish: header state on scroll + scroll-reveal */
(function () {
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll(
    'main section .section-header, .type-card, .model-card, .review-card, .method-card, .rider-card, .pricing-card, .factor-card, .faq-item, .cta-box'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { 
        const el = e.target;
        el.classList.add('is-visible');
        io.unobserve(el);
        setTimeout(() => { el.style.transitionDelay = ''; el.classList.remove('reveal'); }, 1400);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach((el) => {
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    el.style.transitionDelay = Math.min(siblings.indexOf(el), 6) * 70 + 'ms';
    el.classList.add('reveal');
    io.observe(el);
  });
})();

/* Range sliders: paint the filled portion of the track */
(function () {
  const sliders = document.querySelectorAll('.range-slider');
  if (!sliders.length) return;
  const paint = () => sliders.forEach((s) => {
    const min = +s.min || 0, max = +s.max || 100;
    s.style.setProperty('--fill', ((s.value - min) / (max - min)) * 100 + '%');
  });
  sliders.forEach((s) => { s.addEventListener('input', paint); s.addEventListener('change', paint); });
  // unit toggles and "relax filters" set values programmatically
  document.addEventListener('click', () => requestAnimationFrame(paint));
  paint();
})();


// Back to top button
(function () {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="ph-bold ph-arrow-up"></i>';
  document.body.appendChild(btn);
  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
