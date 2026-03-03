# Event-Driven Web Applications (Ex-5)

This workspace contains a set of interactive web applications built with **HTML**, **TypeScript** and **Tailwind CSS**. Tasks include:

1. Interactive color grid with reset
2. Animal image viewer
3. Traffic light simulation
4. Number guessing game
5. Memory match game with danger box

## Project Structure

```
Ex-5/
├── public/
│   ├── index.html       # single page containing all tasks
│   ├── images/          # put your animal images here (e.g. cat.jpg, dog.jpg, ...)
│   └── js/              # compiled JS output from TypeScript
├── src/                 # TypeScript source files
│   ├── colorGrid.ts
│   ├── animalViewer.ts
│   ├── trafficLight.ts
│   ├── guessingGame.ts
│   └── memoryGame.ts
├── package.json         # build scripts and dependencies
├── tsconfig.json
└── README.md
```

## Getting Started

1. Install dependencies:
   ```powershell
   cd d:\Programming\Internet-Programming\Ex-5
   npm install
   ```

2. Build the TypeScript files:
   ```powershell
   npm run build
   ```
   or watch for changes with `npm run watch`.

3. Open `public/index.html` in your browser (you can use a simple static server or open file directly).

4. Put animal images inside `public/images` matching the names defined in `src/animalViewer.ts`.

## Notes

- Tailwind is included via CDN for simplicity. You can replace with a local build if desired.
- The memory game reloads the page when the danger box is clicked to reset.
- The guessing game logs your guesses to the message area when you press a number key.

Enjoy exploring the interactive examples!
