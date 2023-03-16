import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyAppShell } from './App';

test('renders learn react link', () => {
  render(<MyAppShell />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
