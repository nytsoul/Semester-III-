type Cell = {
  value: string;
  element: HTMLDivElement;
  revealed: boolean;
};

let cells: Cell[] = [];
let first: Cell | null = null;
let score = 0;
const scoreEl = document.getElementById('memoryScore');

function initMemory() {
  const container = document.getElementById('memoryGrid') as HTMLDivElement;
  const values = [
    'Canada', 'Brazil', 'India', 'China', 'Germany', 'France', 'Japan', 'Australia',
    'Russia', 'Egypt', 'Spain', 'Italy'
  ];
  const all = [...values, ...values];
  all.push('danger');

  shuffle(all);

  all.forEach(val => {
    const div = document.createElement('div');
    // card base styling: gray square with rounded corners and hover effect
    div.className = 'bg-gray-300 h-16 flex items-center justify-center cursor-pointer rounded-lg shadow hover:bg-gray-200';
    div.textContent = '';
    container.appendChild(div);
    const cell: Cell = { value: val, element: div, revealed: false };
    div.addEventListener('click', () => onCellClick(cell));
    cells.push(cell);
  });
  updateScore();
}

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function onCellClick(cell: Cell) {
  if (cell.revealed) return;
  if (cell.value === 'danger') {
    alert('Danger! Game over.');
    resetMemory();
    return;
  }
  reveal(cell);
  if (!first) {
    first = cell;
  } else {
    if (first.value === cell.value) {
      score += 10;
      first = null;
      updateScore();
    } else {
      score = 0;
      updateScore();
      const second = cell;
      setTimeout(() => {
        hide(first!);
        hide(second);
        first = null;
      }, 800);
    }
  }
}
function reveal(cell: Cell) {
  cell.element.textContent = cell.value;
  cell.revealed = true;
  cell.element.classList.add('bg-white');
}
function hide(cell: Cell) {
  cell.element.textContent = '';
  cell.revealed = false;
  cell.element.classList.remove('bg-white');
}
function updateScore() {
  scoreEl!.textContent = `Score: ${score}`;
}
function resetMemory() {
  location.reload();
}
window.addEventListener('DOMContentLoaded', initMemory);
