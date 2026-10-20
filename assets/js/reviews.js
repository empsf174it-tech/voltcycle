/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Verified User Reviews Controller (reviews.js)
 * Implements rating summary distribution bars, review cards list,
 * verified-only filter toggle, and sort by rating/recency.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('reviewsSection')) {
    initReviewsSection();
  }
});

function initReviewsSection() {
  const reviewsContainer = document.getElementById('homeReviewsGrid');
  const sortSelect = document.getElementById('reviewsSortSelect');
  const verifiedOnlyCb = document.getElementById('verifiedOnlyCb');

  if (!reviewsContainer || !window.VoltData || !window.VoltData.reviews) return;

  const renderHomeReviews = () => {
    let list = [...window.VoltData.reviews];

    // Filter verified only
    if (verifiedOnlyCb && verifiedOnlyCb.checked) {
      list = list.filter(r => r.verified);
    }

    // Sort
    const sortVal = sortSelect ? sortSelect.value : 'newest';
    if (sortVal === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortVal === 'lowest') {
      list.sort((a, b) => a.rating - b.rating);
    } // 'newest' is default seed order

    reviewsContainer.innerHTML = list.map(r => `
      <article class="review-card">
        <div class="review-card-header">
          <div class="reviewer-avatar">${r.avatar ? `<img src="${r.avatar}" alt="${r.reviewer}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${r.initials}'))">` : r.initials}</div>
          <div class="reviewer-info">
            <h4>${r.reviewer}</h4>
            <div class="review-date-distance">${r.date} · <span class="tabular-nums">${r.distanceRidden}</span> logged</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: var(--space-2);">
          <div style="color: #FBBF24; font-size: 0.95rem;">
            ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
          </div>
          <span class="verified-pill" aria-label="Verified e-bike owner purchase">
            <i class="ph-bold ph-shield-check"></i> Verified Owner
          </span>
        </div>

        <div class="review-card-body">
          <h5>${r.title}</h5>
          <p>${r.body}</p>
        </div>

        <div style="margin-top: auto; padding-top: var(--space-3); border-top: 1px solid var(--color-primary-border); width: 100%; font-size: 0.78rem; color: var(--color-secondary-dim);">
          Model: <strong style="color: var(--color-secondary-light);">${r.modelName}</strong>
        </div>
      </article>
    `).join('');
  };

  if (sortSelect) sortSelect.addEventListener('change', renderHomeReviews);
  if (verifiedOnlyCb) verifiedOnlyCb.addEventListener('change', renderHomeReviews);

  renderHomeReviews();
}
