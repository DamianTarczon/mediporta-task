import {fireEvent, render, screen} from '@testing-library/react';
import SelectInput from './SelectInput';

describe('SelectInput component', () => {
  it('renders with the correct initial rowsPerPage', () => {
    const handleChangeRowsPerPage = jest.fn();
    render(<SelectInput rowsPerPage={10} handleChangeRowsPerPage={handleChangeRowsPerPage} />);

    const select = screen.getByRole('combobox', { name: /rows per page/i });
    expect(select).toHaveTextContent('10');
  });

  it('onChange event passes correct selected value', async () => {
    const handleChangeRowsPerPage = jest.fn();
    render(<SelectInput rowsPerPage={10} handleChangeRowsPerPage={handleChangeRowsPerPage} />);

    fireEvent.mouseDown(screen.getByLabelText('Rows per page'));

    fireEvent.click(screen.getByRole('option', {name: '25'}));

    const event = handleChangeRowsPerPage.mock.calls[0][0];
    expect(event.target.value).toBe(25);
  });
});
