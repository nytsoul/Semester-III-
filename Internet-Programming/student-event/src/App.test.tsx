import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // App uses Router so it should render without errors
  expect(document.body).toBeInTheDocument();
});
