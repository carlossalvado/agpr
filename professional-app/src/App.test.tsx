import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page initially', () => {
  render(<App />);
  const loginTitle = screen.getByText(/Login do Profissional/i);
  expect(loginTitle).toBeInTheDocument();
});

test('renders login form elements', () => {
  render(<App />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
});
