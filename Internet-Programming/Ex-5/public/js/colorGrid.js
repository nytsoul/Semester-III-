"use strict";
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
function initColorGrid() {
    const boxes = document.querySelectorAll('#grid .box');
    boxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.style.backgroundColor = randomColor();
        });
    });
    const resetButton = document.getElementById('resetColors');
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', () => {
        boxes.forEach(b => {
            b.style.backgroundColor = 'brown';
        });
    });
}
window.addEventListener('DOMContentLoaded', initColorGrid);
