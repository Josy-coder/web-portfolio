import { render, screen } from '@testing-library/react';
import Pricing from './pricing';

describe('Pricing component', () => {
  test('renders the section title', () => {
    render(<Pricing />);
    const titleElement = screen.getByText(/Pricing/);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the section subtitle', () => {
    render(<Pricing />);
    const subtitleElement = screen.getByText(/My Pricing Board/);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders the pricing items', () => {
    render(<Pricing />);
    const pricingItems = screen.getAllByTestId('pricing-item');
    expect(pricingItems.length).toBe(3);
  });

  test('renders the pricing item labels', () => {
    render(<Pricing />);
    const pricingLabels = screen.getAllByText(/Hourly Basis|Freelancing|Full Time/);
    expect(pricingLabels.length).toBe(3);
  });

  // Add more tests for other elements and functionality as needed
});