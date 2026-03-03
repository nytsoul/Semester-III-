const lightIds = ['redLight', 'greenLight', 'yellowLight'];
let current = 0;

function updateLights() {
  lightIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;

    // remove all of the colour classes first, then add the one we want.
    el.classList.remove('bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-gray-500');

    if (idx === current) {
      if (id === 'redLight') el.classList.add('bg-red-500');
      else if (id === 'greenLight') el.classList.add('bg-green-500');
      else if (id === 'yellowLight') el.classList.add('bg-yellow-500');
    } else {
      el.classList.add('bg-gray-500');
    }
  });
}

function initTrafficLight() {
  const button = document.getElementById('nextLight');
  button?.addEventListener('click', () => {
    current = (current + 1) % lightIds.length;
    updateLights();
  });
  updateLights();
}

window.addEventListener('DOMContentLoaded', initTrafficLight);
