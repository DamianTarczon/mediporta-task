import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage'; // Adjust the import path as necessary

describe('ErrorMessage component', () => {
  test('displays the error message provided as a prop', () => {
    const testErrorMessage = "This is an error!";
    render(<ErrorMessage message={testErrorMessage} />);

    // Check if the message is in the document
    const displayedError = screen.getByText(testErrorMessage);
    expect(displayedError).toBeInTheDocument();
  });
});
