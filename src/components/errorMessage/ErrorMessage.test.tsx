import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('displays the error message provided as a prop', () => {
    const testErrorMessage = "This is an error!";
    render(<ErrorMessage message={testErrorMessage} />);

    const displayedError = screen.getByText(testErrorMessage);
    expect(displayedError).toBeInTheDocument();
  });
});
