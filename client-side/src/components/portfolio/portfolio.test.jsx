import { render, screen } from '@testing-library/react';
import Portfolio from './portfolio';

describe('Portfolio component', () => {
  test('renders the section title', () => {
    render(<Portfolio />);
    const titleElement = screen.getByText(/Portfolio/);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the section subtitle', () => {
    render(<Portfolio />);
    const subtitleElement = screen.getByText(/My Cases/);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders the list component', () => {
    render(<Portfolio />);
    const listElement = screen.getByTestId('list-component');
    expect(listElement).toBeInTheDocument();
  });

  test('renders the items component', () => {
    render(<Portfolio />);
    const itemsElement = screen.getByTestId('items-component');
    expect(itemsElement).toBeInTheDocument();
  });

  // Add more tests for other elements and functionality as needed
});