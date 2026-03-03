
// Map names to URLs.  Using placeholder images so the app works even when
// no local files have been dropped into public/images.  You can still put
// your own JPGs in `public/images` (cat.jpg, lion.jpg, etc.) and the viewer
// will pick them up automatically.
const animals: { [key: string]: string } = {
  cat: 'https://via.placeholder.com/150?text=Cat',
  dog: 'https://via.placeholder.com/150?text=Dog',
  lion: 'https://via.placeholder.com/150?text=Lion',
  tiger: 'https://via.placeholder.com/150?text=Tiger',
  elephant: 'https://via.placeholder.com/150?text=Elephant'
};

function initAnimalViewer() {
  const input = document.getElementById('animalInput') as HTMLInputElement;
  const button = document.getElementById('showAnimal');
  const result = document.getElementById('animalResult');

  button?.addEventListener('click', () => {
    const name = input.value.trim().toLowerCase();
    result!.innerHTML = '';
    if (name && animals[name]) {
      const img = document.createElement('img');
      img.src = `images/${animals[name]}`;
      img.alt = name;
      img.className = 'max-w-xs';
      result!.appendChild(img);
    } else {
      result!.textContent = 'Image not found';
    }
  });
}

window.addEventListener('DOMContentLoaded', initAnimalViewer);
