import { render, screen } from '@testing-library/react';
import Home from './home';

describe('Home component', () => {
  test('renders the correct name', () => {
    render(<Home />);
    const nameElement = screen.getByText(/Baho/);
    expect(nameElement).toBeInTheDocument();
  });

  test('renders the correct job title', () => {
    render(<Home />);
    const jobElement = screen.getByText(/Fullstack Developer/);
    expect(jobElement).toBeInTheDocument();
  });

  test('renders the correct number of years of experience', () => {
    render(<Home />);
    const experienceElement = screen.getByText(/4 \+/);
    expect(experienceElement).toBeInTheDocument();
  });

  test('renders the correct number of completed projects', () => {
    render(<Home />);
    const projectsElement = screen.getByText(/50 \+/);
    expect(projectsElement).toBeInTheDocument();
  });

  // Add more tests for other elements and functionality as needed
});