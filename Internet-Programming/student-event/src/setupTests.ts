// setupTests.ts
import '@testing-library/jest-dom';

if (!global.performance) {
  global.performance = {} as any;
}

if (!global.performance.clearMarks) {
  global.performance.clearMarks = () => {};
}

if (!global.performance.clearMeasures) {
  global.performance.clearMeasures = () => {};
}

// Polyfill for libraries that use a global "mgt" API as a wrapper for performance tracking
if (!(global as any).mgt) {
  (global as any).mgt = {};
}

if (!(global as any).mgt.clearMarks) {
  (global as any).mgt.clearMarks = () => {};
}

if (!(global as any).mgt.clearMeasures) {
  (global as any).mgt.clearMeasures = () => {};
}

if (!(global as any).mgt.mark) {
  (global as any).mgt.mark = () => {};
}

if (!(global as any).mgt.measure) {
  (global as any).mgt.measure = () => {};
}
