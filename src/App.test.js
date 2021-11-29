import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Садоводы link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Садоводы/i);
  expect(linkElement).toBeInTheDocument();
});
