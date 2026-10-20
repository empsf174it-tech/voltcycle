/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Affiliate Link Tracking Engine (affiliate.js)
 * Implements delegated click tracking, window.dataLayer telemetry events,
 * and on-screen micro-toast feedback for demo verification.
 */

window.dataLayer = window.dataLayer || [];

document.addEventListener('DOMContentLoaded', () => {
  initAffiliateTracking();
});

function initAffiliateTracking() {
  // Global delegated click listener for all affiliate buttons
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.affiliate-track-btn, [data-affiliate-id]');
    if (!target) return;

    const affId = target.getAttribute('data-affiliate-id') || 'vc-aff-unknown';
    const product = target.getAttribute('data-product') || 'E-Bike Model';
    const placement = target.getAttribute('data-placement') || 'unknown';
    const destinationUrl = target.getAttribute('href') || '#';

    // 1. Push standard event to dataLayer
    const telemetryEvent = {
      event: 'affiliate_click',
      affiliate_id: affId,
      product_name: product,
      placement: placement,
      destination_url: destinationUrl,
      timestamp: new Date().toISOString()
    };
    window.dataLayer.push(telemetryEvent);

    // 2. Show unobtrusive micro-toast notification to inform user of tracking simulation
    showAffiliateToast(product, placement);
  });
}

function showAffiliateToast(product, placement) {
  let toast = document.getElementById('affiliateToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'affiliateToast';
    toast.className = 'affiliate-toast';
    toast.innerHTML = `
      <div class="toast-icon"><i class="ph-bold ph-lightning"></i></div>
      <div class="toast-text">
        <strong id="toastProductTitle">Affiliate Click</strong>
        <div id="toastDetails" style="font-size:0.76rem; color:var(--color-secondary);">Simulated sponsor referral tracked via window.dataLayer</div>
      </div>
    `;
    document.body.appendChild(toast);
  }

  const titleEl = document.getElementById('toastProductTitle');
  const detailsEl = document.getElementById('toastDetails');
  if (titleEl) titleEl.textContent = `Referral Tracked: ${product}`;
  if (detailsEl) detailsEl.textContent = `Placement: [${placement}] · Sponsored partner redirect simulated`;

  toast.classList.add('is-active');

  clearTimeout(window.affiliateToastTimer);
  window.affiliateToastTimer = setTimeout(() => {
    toast.classList.remove('is-active');
  }, 4200);
}
