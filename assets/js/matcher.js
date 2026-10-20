/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Range & Budget Matcher Controller (matcher.js)
 * Implements real-world range estimation formula, scoring algorithm,
 * dynamic match rankings, and relaxed-filter empty state.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('matcherContainer')) {
    initMatcher();
  }
});

function initMatcher() {
  // State
  const state = {
    unit: 'mi', // 'mi' or 'km'
    weightUnit: 'lbs', // 'lbs' or 'kg'
    dailyDistance: 24, // in current unit
    terrain: 'mixed', // 'flat', 'mixed', 'hilly'
    weight: 180, // in current weightUnit
    assist: 'balanced', // 'light', 'balanced', 'max'
    maxBudget: 3500,
    bikeType: 'any',
    mustHaves: []
  };

  // DOM Elements
  const unitMilesBtn = document.getElementById('unitMilesBtn');
  const unitKmBtn = document.getElementById('unitKmBtn');
  const distanceSlider = document.getElementById('distanceSlider');
  const distanceValBadge = document.getElementById('distanceValBadge');
  const distanceUnitLabel = document.getElementById('distanceUnitLabel');

  const terrainSelect = document.getElementById('terrainSelect');

  const weightUnitLbsBtn = document.getElementById('weightUnitLbsBtn');
  const weightUnitKgBtn = document.getElementById('weightUnitKgBtn');
  const weightInput = document.getElementById('weightInput');
  const weightUnitLabel = document.getElementById('weightUnitLabel');

  const assistRadios = document.querySelectorAll('input[name="assistPref"]');
  const budgetSlider = document.getElementById('budgetSlider');
  const budgetValBadge = document.getElementById('budgetValBadge');
  const typeSelect = document.getElementById('matcherTypeSelect');
  const mustHaveBoxes = document.querySelectorAll('.must-have-cb');

  const resultsList = document.getElementById('matchResultsList');
  const matchCountBadge = document.getElementById('matchCountBadge');
  const emptyStateBox = document.getElementById('matcherEmptyState');
  const relaxFiltersBtn = document.getElementById('relaxFiltersBtn');

  // Event Listeners for Distance Unit
  if (unitMilesBtn && unitKmBtn) {
    unitMilesBtn.addEventListener('click', () => {
      if (state.unit === 'mi') return;
      state.unit = 'mi';
      unitMilesBtn.classList.add('active');
      unitKmBtn.classList.remove('active');
      state.dailyDistance = Math.round(state.dailyDistance * 0.621371);
      distanceSlider.min = 5;
      distanceSlider.max = 80;
      distanceSlider.value = state.dailyDistance;
      distanceUnitLabel.textContent = 'miles';
      distanceValBadge.textContent = `${state.dailyDistance} mi`;
      updateMatches();
    });

    unitKmBtn.addEventListener('click', () => {
      if (state.unit === 'km') return;
      state.unit = 'km';
      unitKmBtn.classList.add('active');
      unitMilesBtn.classList.remove('active');
      state.dailyDistance = Math.round(state.dailyDistance * 1.60934);
      distanceSlider.min = 8;
      distanceSlider.max = 130;
      distanceSlider.value = state.dailyDistance;
      distanceUnitLabel.textContent = 'km';
      distanceValBadge.textContent = `${state.dailyDistance} km`;
      updateMatches();
    });
  }

  // Distance Slider
  if (distanceSlider) {
    distanceSlider.addEventListener('input', (e) => {
      state.dailyDistance = parseInt(e.target.value, 10);
      distanceValBadge.textContent = `${state.dailyDistance} ${state.unit}`;
      updateMatches();
    });
  }

  // Terrain Select
  if (terrainSelect) {
    terrainSelect.addEventListener('change', (e) => {
      state.terrain = e.target.value;
      updateMatches();
    });
  }

  // Weight Unit Toggle
  if (weightUnitLbsBtn && weightUnitKgBtn) {
    weightUnitLbsBtn.addEventListener('click', () => {
      if (state.weightUnit === 'lbs') return;
      state.weightUnit = 'lbs';
      weightUnitLbsBtn.classList.add('active');
      weightUnitKgBtn.classList.remove('active');
      state.weight = Math.round(state.weight * 2.20462);
      weightInput.value = state.weight;
      weightUnitLabel.textContent = 'lbs';
      updateMatches();
    });

    weightUnitKgBtn.addEventListener('click', () => {
      if (state.weightUnit === 'kg') return;
      state.weightUnit = 'kg';
      weightUnitKgBtn.classList.add('active');
      weightUnitLbsBtn.classList.remove('active');
      state.weight = Math.round(state.weight / 2.20462);
      weightInput.value = state.weight;
      weightUnitLabel.textContent = 'kg';
      updateMatches();
    });
  }

  // Weight Input Validation
  if (weightInput) {
    weightInput.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 10) val = 150;
      state.weight = val;
      updateMatches();
    });
  }

  // Assist Mode Radios
  assistRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.assist = e.target.value;
        updateMatches();
      }
    });
  });

  // Budget Slider
  if (budgetSlider) {
    budgetSlider.addEventListener('input', (e) => {
      state.maxBudget = parseInt(e.target.value, 10);
      budgetValBadge.textContent = `$${state.maxBudget.toLocaleString()}`;
      updateMatches();
    });
  }

  // Bike Type Select
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      state.bikeType = e.target.value;
      updateMatches();
    });
  }

  // Must-Have Checkboxes
  mustHaveBoxes.forEach(cb => {
    cb.addEventListener('change', () => {
      state.mustHaves = Array.from(mustHaveBoxes)
        .filter(c => c.checked)
        .map(c => c.value);
      updateMatches();
    });
  });

  // Relax Filters Button (Empty State)
  if (relaxFiltersBtn) {
    relaxFiltersBtn.addEventListener('click', () => {
      state.maxBudget = 4500;
      if (budgetSlider) {
        budgetSlider.value = 4500;
        budgetValBadge.textContent = '$4,500';
      }
      state.bikeType = 'any';
      if (typeSelect) typeSelect.value = 'any';
      mustHaveBoxes.forEach(cb => { cb.checked = false; });
      state.mustHaves = [];
      updateMatches();
    });
  }

  // Initial Calculation Run
  updateMatches();

  /**
   * Core Calculation & Ranking Engine
   */
  function updateMatches() {
    if (!window.VoltData || !window.VoltData.models) return;

    // Convert distance & weight to imperial standards for calculation
    const distanceMiles = state.unit === 'mi' ? state.dailyDistance : state.dailyDistance * 0.621371;
    const weightLbs = state.weightUnit === 'lbs' ? state.weight : state.weight * 2.20462;

    const scoredModels = window.VoltData.models.map(model => {
      // 1. Calculate estimated real-world range using rule of thumb
      const estRangeMiles = window.VoltData.calculateRange(
        model.batteryWh,
        state.assist,
        weightLbs,
        state.terrain
      );
      const estRangeDisplay = state.unit === 'mi' ? estRangeMiles : Math.round(estRangeMiles * 1.60934);

      // 2. Budget Score (0 to 35 points)
      let budgetScore = 0;
      if (model.price <= state.maxBudget) {
        budgetScore = 35;
      } else {
        const overage = model.price - state.maxBudget;
        budgetScore = Math.max(0, 35 - (overage / 40));
      }

      // 3. Range Margin Score (0 to 35 points)
      // Ideal: estimated range covers daily commute with at least 25% safety reserve
      const rangeRatio = estRangeMiles / (distanceMiles * 1.25);
      let rangeScore = 0;
      if (rangeRatio >= 1.0) {
        rangeScore = 35;
      } else {
        rangeScore = Math.max(0, rangeRatio * 35);
      }

      // 4. Type Match (0 to 15 points)
      let typeScore = 15;
      if (state.bikeType !== 'any' && model.type !== state.bikeType) {
        typeScore = 0;
      }

      // 5. Must-Haves Match (0 to 15 points)
      let mustHaveScore = 15;
      if (state.mustHaves.length > 0) {
        const matchedTags = state.mustHaves.filter(tag => model.mustHaves.includes(tag));
        mustHaveScore = (matchedTags.length / state.mustHaves.length) * 15;
      }

      const totalScore = Math.round(budgetScore + rangeScore + typeScore + mustHaveScore);
      const matchPct = Math.min(99, Math.max(35, totalScore));

      // Generate dynamic context-rich "Why" explanation
      let whyText = '';
      if (estRangeMiles >= distanceMiles * 1.3) {
        whyText = `${model.batteryWh}Wh pack easily covers your ${state.dailyDistance} ${state.unit} target with ${Math.round((estRangeMiles / distanceMiles - 1) * 100)}% safety reserve on ${state.terrain} terrain.`;
      } else if (estRangeMiles >= distanceMiles) {
        whyText = `Meets your ${state.dailyDistance} ${state.unit} commute with regular nightly charging recommended.`;
      } else {
        whyText = `At high assist levels or cold weather, you may need mid-day top-up charging at work.`;
      }

      if (model.mustHaves.includes('torque_sensor') && state.mustHaves.includes('torque_sensor')) {
        whyText += ' Features smooth torque-sensing pedal assist.';
      } else if (model.mustHaves.includes('hydraulic_brakes') && state.mustHaves.includes('hydraulic_brakes')) {
        whyText += ' Equipped with premium hydraulic disc brakes.';
      }

      return {
        ...model,
        estRange: estRangeDisplay,
        matchPct,
        whyText,
        isEligible: (state.bikeType === 'any' || model.type === state.bikeType) && (model.price <= state.maxBudget * 1.15)
      };
    });

    // Filter and sort descending by match percentage
    const filtered = scoredModels
      .filter(m => m.isEligible && m.matchPct >= 50)
      .sort((a, b) => b.matchPct - a.matchPct);

    renderResults(filtered);
  }

  /**
   * Render Matcher Results Cards
   */
  function renderResults(matches) {
    if (!resultsList) return;

    if (matchCountBadge) {
      matchCountBadge.textContent = `${matches.length} Models Matched`;
    }

    if (matches.length === 0) {
      resultsList.innerHTML = '';
      if (emptyStateBox) emptyStateBox.style.display = 'block';
      return;
    }

    if (emptyStateBox) emptyStateBox.style.display = 'none';

    resultsList.innerHTML = matches.map(m => `
      <article class="match-result-card" data-model-id="${m.id}">
        <div class="match-card-top">
          <div>
            <h4 class="match-model-title">${m.name}</h4>
            <span class="match-model-brand">${m.brand} · ${m.type.toUpperCase()} · ${m.ebikeClass}</span>
          </div>
          <span class="match-pct-pill">${m.matchPct}% MATCH</span>
        </div>

        <div class="match-why-box">
          <p>${m.whyText}</p>
        </div>

        <div class="match-card-specs-row">
          <div class="match-spec-item">
            <span>Est. Real Range</span>
            <strong>${m.estRange} ${state.unit}</strong>
          </div>
          <div class="match-spec-item">
            <span>Motor & Torque</span>
            <strong>${m.motorWatts}W · ${m.motorTorque}Nm</strong>
          </div>
          <div class="match-spec-item">
            <span>Price</span>
            <strong>$${m.price.toLocaleString()}</strong>
          </div>
        </div>

        <div class="match-card-actions">
          <button type="button" class="btn btn-secondary btn-sm inspect-model-btn" data-model-id="${m.id}">
            <i class="ph ph-sliders"></i> Specs & Score
          </button>
          
          <!-- AFFILIATE_LINK -->
          <a href="https://example.com/check-price?utm_source=voltcycle&utm_medium=affiliate&utm_campaign=buying-guide&utm_content=${m.id}_matcher" 
             class="btn btn-primary btn-sm affiliate-track-btn" 
             target="_blank" 
             rel="sponsored noopener"
             data-affiliate-id="vc-aff-${m.id}"
             data-product="${m.name}"
             data-placement="matcher_result">
            Check price <i class="ph ph-arrow-up-right"></i>
          </a>
        </div>
      </article>
    `).join('');

    // Attach inspect click listeners to trigger model detail modal
    resultsList.querySelectorAll('.inspect-model-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modelId = btn.dataset.modelId;
        if (window.openModelModal) {
          window.openModelModal(modelId);
        }
      });
    });
  }
}
