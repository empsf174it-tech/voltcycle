/**
 * VOLTCYCLE — Electric Bike Buying Guide
 * Motor & Battery Explainer Module (explainer.js)
 * Implements interactive Hub vs Mid-Drive comparison, SVG schematic toggles,
 * Watt-Hour (Wh = V × Ah) live calculator, and range factors toggle list.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('explainerSection')) {
    initExplainer();
  }
});

function initExplainer() {
  initMotorToggle();
  initWhCalculator();
}

/**
 * Hub Motor vs Mid-Drive Interactive Comparison
 */
function initMotorToggle() {
  const hubBtn = document.getElementById('motorHubBtn');
  const midBtn = document.getElementById('motorMidBtn');
  const diagramWrap = document.getElementById('motorSvgDiagram');
  const motorFeelText = document.getElementById('motorFeelText');
  const motorTerrainText = document.getElementById('motorTerrainText');
  const motorMaintText = document.getElementById('motorMaintText');
  const motorCostText = document.getElementById('motorCostText');

  const motorData = {
    hub: {
      feel: "Delivers an energetic 'push from behind' sensation. Power is directly applied to the rear wheel regardless of which gear you select on the chain derailleur.",
      terrain: "Flourishes on flat roads, gentle rolling city streets, and paved suburban trails. Can bog down on extended steep mountain passes exceeding 15% gradient.",
      maint: "Ultra-low drivetrain wear. Because power goes straight to the wheel hub, your bike chain and cassette experience zero motor stress and last as long as a normal acoustic bike.",
      cost: "Significantly more affordable to manufacture and replace. Standard geared hub motors keep complete e-bike builds between $1,200 and $1,900.",
      svg: `
        <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rear Hub Motor Schematic">
          <!-- Bike Frame Outline -->
          <path d="M 60,150 L 140,150 L 220,70 L 120,70 Z" fill="none" stroke="#2B3340" stroke-width="4"/>
          <path d="M 140,150 L 260,150 L 320,70" fill="none" stroke="#2B3340" stroke-width="4"/>
          <path d="M 220,70 L 200,150" fill="none" stroke="#2B3340" stroke-width="4"/>
          <!-- Front Wheel -->
          <circle cx="320" cy="150" r="45" fill="none" stroke="#3A4454" stroke-width="5" stroke-dasharray="4,4"/>
          <!-- Rear Wheel with Hub Motor Highlight -->
          <circle cx="60" cy="150" r="45" fill="none" stroke="#3A4454" stroke-width="5"/>
          <circle cx="60" cy="150" r="22" fill="#CCFF00" stroke="#000" stroke-width="2"/>
          <text x="60" y="154" fill="#000" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="10" text-anchor="middle">HUB</text>
          <!-- Power Arrow to Rear Hub -->
          <path d="M 140,105 L 85,140" fill="none" stroke="#CCFF00" stroke-width="3" stroke-dasharray="4,3"/>
          <text x="60" y="195" fill="#CCFF00" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="12" text-anchor="middle">Direct Wheel Propulsion</text>
        </svg>
      `
    },
    mid: {
      feel: "Intuitively mirrors natural human pedaling. Motor torque flows directly through the bicycle gears, multiplying mechanical advantage during steep climbs or fast flats.",
      terrain: "Dominates steep hills, technical mountain trails, and heavy cargo loads. Shifting down into 1st gear allows the motor to spin at its peak efficiency RPM even at 4 mph.",
      maint: "Transmits full motor torque through the chain, chainring, and rear cassette. Demands regular chain lubrication and higher chain replacement frequency (every 1,500–2,500 miles).",
      cost: "More complex internal torque-sensing mechanisms and integrated bottom bracket frames increase base pricing ($2,200 to $4,500+).",
      svg: `
        <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mid-Drive Motor Schematic">
          <!-- Bike Frame Outline -->
          <path d="M 60,150 L 170,150 L 230,70 L 130,70 Z" fill="none" stroke="#2B3340" stroke-width="4"/>
          <path d="M 170,150 L 270,150 L 330,70" fill="none" stroke="#2B3340" stroke-width="4"/>
          <path d="M 230,70 L 170,150" fill="none" stroke="#2B3340" stroke-width="4"/>
          <!-- Rear Wheel -->
          <circle cx="60" cy="150" r="45" fill="none" stroke="#3A4454" stroke-width="5" stroke-dasharray="4,4"/>
          <!-- Front Wheel -->
          <circle cx="330" cy="150" r="45" fill="none" stroke="#3A4454" stroke-width="5" stroke-dasharray="4,4"/>
          <!-- Mid-Drive Crank Motor Highlight -->
          <circle cx="170" cy="150" r="22" fill="#CCFF00" stroke="#000" stroke-width="2"/>
          <text x="170" y="154" fill="#000" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="9" text-anchor="middle">MID-DRIVE</text>
          <!-- Chain Driving Rear Wheel -->
          <path d="M 170,140 L 60,145" fill="none" stroke="#CCFF00" stroke-width="3"/>
          <path d="M 170,160 L 60,155" fill="none" stroke="#CCFF00" stroke-width="3"/>
          <text x="170" y="195" fill="#CCFF00" font-family="'Space Grotesk', sans-serif" font-weight="600" font-size="12" text-anchor="middle">Gear-Multiplied Crank Torque</text>
        </svg>
      `
    }
  };

  const setMotorType = (type) => {
    if (type === 'hub') {
      hubBtn.classList.add('active');
      midBtn.classList.remove('active');
    } else {
      midBtn.classList.add('active');
      hubBtn.classList.remove('active');
    }

    const data = motorData[type];
    if (diagramWrap) diagramWrap.innerHTML = data.svg;
    if (motorFeelText) motorFeelText.textContent = data.feel;
    if (motorTerrainText) motorTerrainText.textContent = data.terrain;
    if (motorMaintText) motorMaintText.textContent = data.maint;
    if (motorCostText) motorCostText.textContent = data.cost;
  };

  if (hubBtn && midBtn) {
    hubBtn.addEventListener('click', () => setMotorType('hub'));
    midBtn.addEventListener('click', () => setMotorType('mid'));
    // Initialize with mid-drive
    setMotorType('mid');
  }
}

/**
 * Battery Capacity Calculator: Wh = V × Ah
 */
function initWhCalculator() {
  const voltSelect = document.getElementById('calcVoltageSelect');
  const ahSlider = document.getElementById('calcAhSlider');
  const ahValLabel = document.getElementById('calcAhValLabel');
  const whResult = document.getElementById('calcWhResult');
  const rangeEstResult = document.getElementById('calcRangeEstResult');

  if (!voltSelect || !ahSlider || !whResult) return;

  const calculateWh = () => {
    const volts = parseFloat(voltSelect.value);
    const ah = parseFloat(ahSlider.value);
    const wh = Math.round(volts * ah);
    
    // Average mixed riding uses ~12.5 Wh per mile
    const estMiles = Math.round(wh / 12.5);
    const estKm = Math.round(estMiles * 1.60934);

    whResult.textContent = `${wh} Wh`;
    if (ahValLabel) ahValLabel.textContent = `${ah.toFixed(1)} Ah`;
    if (rangeEstResult) {
      rangeEstResult.textContent = `~${estMiles} miles (${estKm} km) typical real-world range at balanced assist`;
    }
  };

  voltSelect.addEventListener('change', calculateWh);
  ahSlider.addEventListener('input', calculateWh);

  calculateWh();
}
