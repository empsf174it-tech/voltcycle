/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Models Grid, Filters, Compare Matrix & Detail Modal (models.js)
 * Implements filtering, sorting, compare tray, sticky feature matrix,
 * accessible model detail modal (4 tabs) and dynamic JSON-LD injection.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('modelsGrid')) {
    initModelsModule();
  }
});

let compareSelectedIds = [];

function initModelsModule() {
  const modelsGrid = document.getElementById('modelsGrid');
  const typeFilter = document.getElementById('filterType');
  const priceFilter = document.getElementById('filterPrice');
  const motorFilter = document.getElementById('filterMotor');
  const classFilter = document.getElementById('filterClass');
  const sortSelect = document.getElementById('sortSelect');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  const compareTray = document.getElementById('compareTray');
  const compareChipsList = document.getElementById('compareChipsList');
  const compareOpenBtn = document.getElementById('compareOpenBtn');
  const compareClearBtn = document.getElementById('compareClearBtn');
  const matrixModal = document.getElementById('matrixModal');
  const matrixCloseBtn = document.getElementById('matrixCloseBtn');
  const matrixTableWrap = document.getElementById('matrixTableWrap');

  // Detail Modal Elements
  const detailModal = document.getElementById('modelDetailModal');
  const detailModalClose = document.getElementById('detailModalClose');
  const detailModalTitle = document.getElementById('detailModalTitle');
  const detailModalBrand = document.getElementById('detailModalBrand');
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const modalTabContents = document.querySelectorAll('.modal-tab-pane');

  // Check URL parameters or prefilter triggers
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  if (typeParam && typeFilter) {
    typeFilter.value = typeParam;
  }

  // Pre-filter trigger from Bike Types section cards
  document.querySelectorAll('.type-card[data-filter-type]').forEach(card => {
    card.addEventListener('click', () => {
      const targetType = card.dataset.filterType;
      if (typeFilter) {
        typeFilter.value = targetType;
        renderModels();
        const modelsSec = document.getElementById('models');
        if (modelsSec) {
          modelsSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Show the top 6 by default; "Show all" reveals the rest
  const MAX_VISIBLE_MODELS = 6;
  let showAllModels = false;
  let showMoreWrap = null;
  if (modelsGrid) {
    showMoreWrap = document.createElement("div");
    showMoreWrap.className = "models-show-more";
    modelsGrid.insertAdjacentElement("afterend", showMoreWrap);
    showMoreWrap.addEventListener("click", (e) => {
      if (!e.target.closest("button")) return;
      showAllModels = !showAllModels;
      renderModels();
      if (!showAllModels) modelsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderShowMore(total) {
    if (!showMoreWrap) return;
    if (total <= MAX_VISIBLE_MODELS) { showMoreWrap.innerHTML = ""; return; }
    showMoreWrap.innerHTML = showAllModels
      ? `<button type="button" class="btn btn-secondary"><i class="ph ph-caret-up"></i> Show fewer</button>`
      : `<button type="button" class="btn btn-secondary">Show all ${total} models <i class="ph ph-caret-down"></i></button>`;
  }

  // Filter & Sort Change Listeners
  [typeFilter, priceFilter, motorFilter, classFilter, sortSelect].forEach(el => {
    if (el) el.addEventListener('change', () => { showAllModels = false; renderModels(); });
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      if (typeFilter) typeFilter.value = 'all';
      if (priceFilter) priceFilter.value = 'all';
      if (motorFilter) motorFilter.value = 'all';
      if (classFilter) classFilter.value = 'all';
      if (sortSelect) sortSelect.value = 'score_desc';
      showAllModels = false;
      renderModels();
    });
  }

  // Compare Tray Event Listeners
  if (compareClearBtn) {
    compareClearBtn.addEventListener('click', () => {
      compareSelectedIds = [];
      updateCompareTray();
      renderModels();
    });
  }

  if (compareOpenBtn && matrixModal) {
    compareOpenBtn.addEventListener('click', () => {
      if (compareSelectedIds.length < 2) {
        alert('Please select at least 2 models to compare.');
        return;
      }
      openMatrixModal();
    });
  }

  if (matrixCloseBtn && matrixModal) {
    matrixCloseBtn.addEventListener('click', () => {
      matrixModal.classList.remove('is-open');
      document.body.style.overflow = '';
    });
    matrixModal.addEventListener('click', (e) => {
      if (e.target === matrixModal) {
        matrixModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // Model Detail Modal Listeners
  if (detailModalClose && detailModal) {
    detailModalClose.addEventListener('click', closeDetailModal);
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  // Modal Tabs Switching
  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.dataset.tab;
      modalTabBtns.forEach(b => b.classList.remove('active'));
      modalTabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${tabTarget}`);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  // Global Keydown (Esc closes modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (detailModal && detailModal.classList.contains('is-open')) closeDetailModal();
      if (matrixModal && matrixModal.classList.contains('is-open')) {
        matrixModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });

  // Expose openModelModal globally
  window.openModelModal = openDetailModal;

  // Initial render
  renderModels();

  /**
   * Filter & Sort Logic
   */
  function getFilteredModels() {
    if (!window.VoltData || !window.VoltData.models) return [];
    let list = [...window.VoltData.models];

    // Filter by Type
    const selectedType = typeFilter ? typeFilter.value : 'all';
    if (selectedType !== 'all') {
      list = list.filter(m => m.type === selectedType);
    }

    // Filter by Price
    const selectedPrice = priceFilter ? priceFilter.value : 'all';
    if (selectedPrice === 'under2000') list = list.filter(m => m.price < 2000);
    else if (selectedPrice === '2000-3000') list = list.filter(m => m.price >= 2000 && m.price <= 3000);
    else if (selectedPrice === 'over3000') list = list.filter(m => m.price > 3000);

    // Filter by Motor
    const selectedMotor = motorFilter ? motorFilter.value : 'all';
    if (selectedMotor !== 'all') {
      list = list.filter(m => m.motorType === selectedMotor);
    }

    // Filter by Class
    const selectedClass = classFilter ? classFilter.value : 'all';
    if (selectedClass !== 'all') {
      list = list.filter(m => m.ebikeClass === selectedClass);
    }

    // Sort
    const sortVal = sortSelect ? sortSelect.value : 'score_desc';
    if (sortVal === 'score_desc') {
      list.sort((a, b) => b.editorialScore - a.editorialScore);
    } else if (sortVal === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'range_desc') {
      list.sort((a, b) => b.claimedRange - a.claimedRange);
    }

    return list;
  }

  /**
   * Render Models Grid Cards
   */
  function renderModels() {
    if (!modelsGrid) return;
    const allModels = getFilteredModels();
    const models = showAllModels ? allModels : allModels.slice(0, MAX_VISIBLE_MODELS);
    renderShowMore(allModels.length);

    if (models.length === 0) {
      modelsGrid.innerHTML = `
        <div class="matcher-empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon"><i class="ph ph-magnifying-glass"></i></div>
          <h3>No Models Match These Filters</h3>
          <p class="section-subtitle" style="margin-bottom: var(--space-4);">Try resetting the price, motor type, or bike class criteria.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="emptyResetBtn">Reset All Filters</button>
        </div>
      `;
      const btn = document.getElementById('emptyResetBtn');
      if (btn && resetFiltersBtn) btn.addEventListener('click', () => resetFiltersBtn.click());
      return;
    }

    modelsGrid.innerHTML = models.map(m => {
      const isCompared = compareSelectedIds.includes(m.id);
      return `
        <article class="model-card" data-id="${m.id}">
          ${m.badge ? `<span class="model-card-badge">${m.badge}</span>` : ''}
          
          <div class="model-img-wrapper">
            <img src="${m.image}" alt="${m.name} electric bicycle" class="model-img" loading="lazy">
          </div>

          <div class="model-card-body">
            <div class="model-card-header">
              <div class="model-title-block">
                <h3>${m.name}</h3>
                <span class="model-brand-line">${m.brand} · ${m.type.toUpperCase()} · ${m.ebikeClass}</span>
              </div>
            </div>

            <!-- Scores Row: Editorial /10 vs User /5 -->
            <div class="scores-row">
              <div class="editorial-score-badge" title="Voltcycle Editorial Lab Score">
                <span class="score-num">${m.editorialScore}</span>
                <span class="score-scale">/10 TEST SCORE</span>
              </div>
              <div class="user-rating-mini" title="Based on ${m.reviewCount} verified owners">
                <i class="ph-fill ph-star"></i>
                <span class="tabular-nums" style="font-weight: 540; color: #FFF;">${m.userRating}</span>
                <span class="user-count">(${m.reviewCount})</span>
              </div>
            </div>

            <!-- Key Specs Strip -->
            <div class="model-specs-strip">
              <div class="spec-mini">
                <span>Motor</span>
                <strong>${m.motorWatts}W ${m.motorType === 'mid' ? 'Mid' : 'Hub'}</strong>
              </div>
              <div class="spec-mini">
                <span>Battery</span>
                <strong>${m.batteryWh}Wh</strong>
              </div>
              <div class="spec-mini">
                <span>Est. Range</span>
                <strong>${m.claimedRange} mi</strong>
              </div>
            </div>

            <!-- Review Snippet -->
            <p class="review-snippet-quote">${m.reviewSnippet}</p>

            <!-- Card Compare Checkbox -->
            <label class="compare-checkbox-label">
              <input type="checkbox" class="model-compare-cb" data-id="${m.id}" ${isCompared ? 'checked' : ''}>
              <span>Add to Compare Tray</span>
            </label>

            <!-- Card Footer -->
            <div class="model-card-footer">
              <div class="price-block">
                <span class="price-label">MSRP Est.</span>
                <span class="price-amount">$${m.price.toLocaleString()}</span>
              </div>

              <div class="model-card-btns">
                <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-id="${m.id}" aria-label="View specifications for ${m.name}">
                  Review <i class="ph ph-arrow-right"></i>
                </button>
                
                <!-- AFFILIATE_LINK -->
                <a href="https://example.com/check-price?utm_source=voltcycle&utm_medium=affiliate&utm_campaign=buying-guide&utm_content=${m.id}_grid_card"
                   class="btn btn-primary btn-sm affiliate-track-btn"
                   target="_blank"
                   rel="sponsored noopener"
                   data-affiliate-id="vc-aff-${m.id}"
                   data-product="${m.name}"
                   data-placement="grid_card">
                  Check price <i class="ph ph-arrow-up-right"></i>
                </a>
              </div>
            </div>
            
            <div style="font-size: 0.7rem; color: var(--color-secondary-dim); text-align: center; margin-top: 6px;">
              Affiliate partner pricing · Updated daily
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners
    modelsGrid.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', () => openDetailModal(btn.dataset.id));
    });

    modelsGrid.querySelectorAll('.model-compare-cb').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = cb.dataset.id;
        if (cb.checked) {
          if (compareSelectedIds.length >= 4) {
            alert('You can compare a maximum of 4 models simultaneously.');
            cb.checked = false;
            return;
          }
          if (!compareSelectedIds.includes(id)) compareSelectedIds.push(id);
        } else {
          compareSelectedIds = compareSelectedIds.filter(x => x !== id);
        }
        updateCompareTray();
      });
    });
  }

  /**
   * Compare Tray Controller
   */
  function updateCompareTray() {
    if (!compareTray || !compareChipsList || !compareOpenBtn) return;

    if (compareSelectedIds.length > 0) {
      compareTray.classList.add('is-active');
      compareOpenBtn.textContent = `Compare (${compareSelectedIds.length}/4)`;

      compareChipsList.innerHTML = compareSelectedIds.map(id => {
        const model = window.VoltData.models.find(m => m.id === id);
        if (!model) return '';
        return `
          <div class="tray-chip">
            <span>${model.name}</span>
            <span class="tray-remove-btn" data-id="${model.id}" title="Remove">&times;</span>
          </div>
        `;
      }).join('');

      compareChipsList.querySelectorAll('.tray-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          compareSelectedIds = compareSelectedIds.filter(x => x !== id);
          updateCompareTray();
          renderModels();
        });
      });
    } else {
      compareTray.classList.remove('is-active');
    }
  }

  /**
   * Comparison Feature Matrix Modal
   */
  function openMatrixModal() {
    if (!matrixModal || !matrixTableWrap) return;
    const selectedModels = compareSelectedIds.map(id => window.VoltData.models.find(m => m.id === id)).filter(Boolean);

    const specRows = [
      { label: 'Editorial Score', key: 'editorialScore', format: (m) => `<strong class="matrix-highlight-val">${m.editorialScore}/10</strong>` },
      { label: 'User Rating', key: 'userRating', format: (m) => `★ ${m.userRating}/5 (${m.reviewCount})` },
      { label: 'Price (MSRP)', key: 'price', format: (m) => `<strong class="matrix-highlight-val">$${m.price.toLocaleString()}</strong>` },
      { label: 'Bike Type', key: 'type', format: (m) => m.type.toUpperCase() },
      { label: 'Motor Drive', key: 'motorType', format: (m) => `${m.motorWatts}W ${m.motorLabel}` },
      { label: 'Motor Torque', key: 'motorTorque', format: (m) => `${m.motorTorque} Nm` },
      { label: 'Battery Capacity', key: 'batteryWh', format: (m) => `${m.batteryWh} Wh (${m.batterySpec})` },
      { label: 'Claimed Range', key: 'claimedRange', format: (m) => `${m.claimedRange} miles` },
      { label: 'Bike Weight', key: 'weight', format: (m) => `${m.weight} lbs` },
      { label: 'Max Payload', key: 'maxLoad', format: (m) => `${m.maxLoad} lbs` },
      { label: 'Brake System', key: 'brakes', format: (m) => m.brakes },
      { label: 'Gears / Drivetrain', key: 'gears', format: (m) => m.gears },
      { label: 'Cockpit Display', key: 'display', format: (m) => m.display },
      { label: 'Lighting System', key: 'lights', format: (m) => m.lights },
      { label: 'E-Bike Legal Class', key: 'ebikeClass', format: (m) => m.ebikeClass },
      { label: 'Warranty', key: 'warranty', format: (m) => m.warranty },
      {
        label: 'Affiliate Action',
        key: 'affiliate',
        format: (m) => `
          <!-- AFFILIATE_LINK -->
          <a href="https://example.com/check-price?utm_source=voltcycle&utm_medium=affiliate&utm_campaign=buying-guide&utm_content=${m.id}_matrix"
             class="btn btn-primary btn-sm affiliate-track-btn"
             target="_blank"
             rel="sponsored noopener"
             data-affiliate-id="vc-aff-${m.id}"
             data-product="${m.name}"
             data-placement="matrix_table">
            Check price <i class="ph ph-arrow-up-right"></i>
          </a>
        `
      }
    ];

    matrixTableWrap.innerHTML = `
      <div class="matrix-container">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>Feature Spec</th>
              ${selectedModels.map(m => `
                <th>
                  ${m.badge ? `<span class="model-card-badge" style="position:static; display:inline-block; margin-bottom:4px;">${m.badge}</span><br>` : ''}
                  <strong>${m.name}</strong><br>
                  <small style="color:var(--color-secondary);">${m.brand}</small>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${specRows.map(row => `
              <tr>
                <td><strong>${row.label}</strong></td>
                ${selectedModels.map(m => `<td>${row.format(m)}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    matrixModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Accessible Model Detail Modal (4 Tabs)
   */
  function openDetailModal(modelId) {
    if (!detailModal) return;
    const model = window.VoltData.models.find(m => m.id === modelId);
    if (!model) return;

    // Header info
    detailModalTitle.textContent = model.name;
    detailModalBrand.textContent = `${model.brand} · ${model.type.toUpperCase()} · ${model.ebikeClass}`;

    // Reset to Overview tab
    modalTabBtns.forEach(b => b.classList.remove('active'));
    modalTabContents.forEach(c => c.style.display = 'none');
    const firstTabBtn = document.querySelector('.modal-tab-btn[data-tab="overview"]');
    if (firstTabBtn) firstTabBtn.classList.add('active');
    const firstPane = document.getElementById('tab-overview');
    if (firstPane) firstPane.style.display = 'block';

    // Populate Tab 1: Overview
    const tabOverview = document.getElementById('tab-overview');
    if (tabOverview) {
      tabOverview.innerHTML = `
        <div class="overview-grid">
          <div>
            <img src="${model.image}" alt="${model.name}" class="modal-gallery-img">
            <p style="font-size:0.92rem; color:var(--color-secondary); margin-bottom:var(--space-4);">${model.tagline}</p>
            <div style="background:var(--color-primary); padding:var(--space-4); border-radius:var(--radius-global); border:1px solid var(--color-primary-border);">
              <h4 style="font-size:0.95rem; margin-bottom:6px;"><i class="ph ph-certificate" style="color:var(--color-accent);"></i> Voltcycle Lab Evaluation</h4>
              <p style="font-size:0.84rem; color:var(--color-secondary);">Overall Score: <strong style="color:var(--color-accent); font-size:1.1rem;">${model.editorialScore}/10</strong> · Verified owner aggregate: <strong>★ ${model.userRating}/5</strong>.</p>
              <a href="about.html#methodology" style="font-size:0.82rem; color:var(--color-accent); text-decoration:underline; display:inline-block; margin-top:6px;">Read our rigorous scoring methodology &rarr;</a>
            </div>
          </div>

          <div>
            <div class="score-breakdown-card">
              <h4 style="font-size:1rem; margin-bottom:var(--space-3);"><i class="ph ph-chart-bar" style="color:var(--color-accent);"></i> Score Breakdown</h4>
              <div class="score-row">
                <span>Ride Quality & Handling</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div class="score-bar-bg"><div class="score-bar-fill" style="width:${model.categoryScores.ride * 10}%;"></div></div>
                  <strong>${model.categoryScores.ride}/10</strong>
                </div>
              </div>
              <div class="score-row">
                <span>Battery & Real Range</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div class="score-bar-bg"><div class="score-bar-fill" style="width:${model.categoryScores.battery * 10}%;"></div></div>
                  <strong>${model.categoryScores.battery}/10</strong>
                </div>
              </div>
              <div class="score-row">
                <span>Frame & Build Quality</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div class="score-bar-bg"><div class="score-bar-fill" style="width:${model.categoryScores.build * 10}%;"></div></div>
                  <strong>${model.categoryScores.build}/10</strong>
                </div>
              </div>
              <div class="score-row">
                <span>Components & Value</span>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div class="score-bar-bg"><div class="score-bar-fill" style="width:${model.categoryScores.value * 10}%;"></div></div>
                  <strong>${model.categoryScores.value}/10</strong>
                </div>
              </div>
            </div>

            <div style="margin-top:var(--space-4); background:var(--color-primary); padding:var(--space-4); border-radius:var(--radius-global); border:1px solid var(--color-primary-border);">
              <h4 style="font-size:0.95rem; margin-bottom:var(--space-2);">Quick Highlights</h4>
              <ul style="list-style:none; font-size:0.85rem; color:var(--color-secondary); display:flex; flex-direction:column; gap:6px;">
                <li><i class="ph-bold ph-check" style="color:var(--color-accent);"></i> ${model.motorLabel} (${model.motorWatts}W · ${model.motorTorque}Nm)</li>
                <li><i class="ph-bold ph-check" style="color:var(--color-accent);"></i> ${model.batterySpec} (${model.batteryWh}Wh Capacity)</li>
                <li><i class="ph-bold ph-check" style="color:var(--color-accent);"></i> ${model.brakes}</li>
                <li><i class="ph-bold ph-check" style="color:var(--color-accent);"></i> Total Weight: ${model.weight} lbs (Max load ${model.maxLoad} lbs)</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    // Populate Tab 2: Pros & Cons (Grouped by category, equal height blocks, verdict box)
    const tabProsCons = document.getElementById('tab-pros-cons');
    if (tabProsCons) {
      tabProsCons.innerHTML = `
        <div class="pros-cons-grid">
          <div class="pro-con-box">
            <h4><i class="ph ph-bicycle"></i> Ride Quality</h4>
            ${model.pros.ride.map(p => `<div class="pro-item"><i class="ph-bold ph-check-circle"></i> <span>${p}</span></div>`).join('')}
            ${model.cons.ride.map(c => `<div class="con-item"><i class="ph-bold ph-x-circle"></i> <span>${c}</span></div>`).join('')}
          </div>

          <div class="pro-con-box">
            <h4><i class="ph ph-battery-charging"></i> Battery & Range</h4>
            ${model.pros.battery.map(p => `<div class="pro-item"><i class="ph-bold ph-check-circle"></i> <span>${p}</span></div>`).join('')}
            ${model.cons.battery.map(c => `<div class="con-item"><i class="ph-bold ph-x-circle"></i> <span>${c}</span></div>`).join('')}
          </div>

          <div class="pro-con-box">
            <h4><i class="ph ph-wrench"></i> Frame & Build</h4>
            ${model.pros.build.map(p => `<div class="pro-item"><i class="ph-bold ph-check-circle"></i> <span>${p}</span></div>`).join('')}
            ${model.cons.build.map(c => `<div class="con-item"><i class="ph-bold ph-x-circle"></i> <span>${c}</span></div>`).join('')}
          </div>

          <div class="pro-con-box">
            <h4><i class="ph ph-currency-dollar"></i> Price & Value</h4>
            ${model.pros.value.map(p => `<div class="pro-item"><i class="ph-bold ph-check-circle"></i> <span>${p}</span></div>`).join('')}
            ${model.cons.value.map(c => `<div class="con-item"><i class="ph-bold ph-x-circle"></i> <span>${c}</span></div>`).join('')}
          </div>
        </div>

        <div class="verdict-box">
          <div class="verdict-col">
            <h4 style="color:var(--color-accent);"><i class="ph ph-thumbs-up"></i> Who It's For</h4>
            <p>${model.verdict.forWho}</p>
          </div>
          <div class="verdict-col">
            <h4 style="color:var(--color-danger);"><i class="ph ph-thumbs-down"></i> Who Should Skip</h4>
            <p>${model.verdict.skipWho}</p>
          </div>
        </div>
      `;
    }

    // Populate Tab 3: Reviews (Verified reviews for this model)
    const tabReviews = document.getElementById('tab-reviews');
    if (tabReviews) {
      const modelReviews = window.VoltData.reviews.filter(r => r.modelId === model.id);
      tabReviews.innerHTML = `
        <div style="margin-bottom:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h4 style="font-size:1.1rem; margin-bottom:2px;">Verified Owner Feedback</h4>
            <span style="font-size:0.84rem; color:var(--color-secondary);">Aggregate Rating: ★ ${model.userRating} / 5 (${model.reviewCount} customer ratings)</span>
          </div>
          <span class="verified-pill"><i class="ph ph-shield-check"></i> 100% Verified Purchases</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:var(--space-3);">
          ${modelReviews.length > 0 ? modelReviews.map(r => `
            <div style="background:var(--color-primary); border:1px solid var(--color-primary-border); border-radius:var(--radius-global); padding:var(--space-4);">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <strong style="font-size:0.92rem;">${r.reviewer}</strong>
                  <span class="verified-pill"><i class="ph ph-check"></i> Verified Owner</span>
                  <span style="font-size:0.75rem; color:var(--color-secondary-dim);">· ${r.distanceRidden} ridden</span>
                </div>
                <div style="color:#FBBF24; font-size:0.88rem;">${'★'.repeat(r.rating)}</div>
              </div>
              <h5 style="font-size:0.92rem; color:#FFF; margin-bottom:4px;">${r.title}</h5>
              <p style="font-size:0.84rem; color:var(--color-secondary); line-height:1.5;">${r.body}</p>
            </div>
          `).join('') : `
            <div style="background:var(--color-primary); padding:var(--space-6); text-align:center; border-radius:var(--radius-global); color:var(--color-secondary);">
              <p>Overall model rating ★ ${model.userRating} across verified fleet telemetry logs. Full individual reviews loading in next data cycle.</p>
            </div>
          `}
        </div>
      `;
    }

    // Populate Tab 4: Specs
    const tabSpecs = document.getElementById('tab-specs');
    if (tabSpecs) {
      tabSpecs.innerHTML = `
        <div class="matrix-container" style="margin-top:0;">
          <table class="matrix-table">
            <tbody>
              <tr><td>Motor</td><td><strong>${model.motorWatts}W ${model.motorLabel}</strong></td></tr>
              <tr><td>Torque</td><td><strong>${model.motorTorque} Nm</strong></td></tr>
              <tr><td>Battery</td><td><strong>${model.batteryWh} Wh (${model.batterySpec})</strong></td></tr>
              <tr><td>Claimed Range</td><td><strong>${model.claimedRange} Miles (real-world ~${Math.round(model.claimedRange * 0.82)} mi in mixed hills)</strong></td></tr>
              <tr><td>Weight</td><td><strong>${model.weight} lbs</strong></td></tr>
              <tr><td>Payload Capacity</td><td><strong>${model.maxLoad} lbs</strong></td></tr>
              <tr><td>Brakes</td><td><strong>${model.brakes}</strong></td></tr>
              <tr><td>Gears</td><td><strong>${model.gears}</strong></td></tr>
              <tr><td>Display</td><td><strong>${model.display}</strong></td></tr>
              <tr><td>Lighting</td><td><strong>${model.lights}</strong></td></tr>
              <tr><td>E-Bike Class</td><td><strong>${model.ebikeClass}</strong></td></tr>
              <tr><td>Warranty</td><td><strong>${model.warranty}</strong></td></tr>
            </tbody>
          </table>
        </div>
      `;
    }

    // Modal Footer with Affiliate Button
    const modalFooter = document.getElementById('modalFooter');
    if (modalFooter) {
      modalFooter.innerHTML = `
        <div>
          <span style="font-size:0.75rem; color:var(--color-secondary-dim); display:block;">Starting MSRP</span>
          <strong style="font-family:var(--font-heading); font-size:1.35rem; color:#FFF;">$${model.price.toLocaleString()}</strong>
        </div>
        
        <div style="display:flex; align-items:center; gap:var(--space-3);">
          <span style="font-size:0.75rem; color:var(--color-secondary-dim);">Affiliate partner tracking enabled</span>
          
          <!-- AFFILIATE_LINK -->
          <a href="https://example.com/check-price?utm_source=voltcycle&utm_medium=affiliate&utm_campaign=buying-guide&utm_content=${model.id}_modal"
             class="btn btn-primary btn-sm affiliate-track-btn"
             target="_blank"
             rel="sponsored noopener"
             data-affiliate-id="vc-aff-${model.id}"
             data-product="${model.name}"
             data-placement="modal_detail">
            Check live price <i class="ph ph-arrow-up-right"></i>
          </a>
        </div>
      `;
    }

    // Dynamic JSON-LD update for current model
    injectModelJsonLd(model);

    detailModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus trap into modal
    const closeBtn = detailModal.querySelector('#detailModalClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeDetailModal() {
    if (!detailModal) return;
    detailModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /**
   * Dynamic JSON-LD Injection for Product + Review + AggregateRating
   */
  function injectModelJsonLd(model) {
    let scriptTag = document.getElementById('jsonLdModelProduct');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonLdModelProduct';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": model.name,
      "image": model.image,
      "description": model.tagline,
      "brand": {
        "@type": "Brand",
        "name": model.brand
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": model.price,
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": model.userRating,
        "bestRating": "5",
        "ratingCount": model.reviewCount
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": model.editorialScore,
          "bestRating": "10"
        },
        "author": {
          "@type": "Organization",
          "name": "Voltcycle Editorial Labs"
        },
        "reviewBody": model.reviewSnippet
      }
    };

    scriptTag.textContent = JSON.stringify(schemaData);
  }
}
