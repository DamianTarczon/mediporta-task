import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import './SelectInput.scss';

function SelectInput({
  rowsPerPage,
  handleChangeRowsPerPage
}: {
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
}) {
  const selectOptions: number[] = [5, 10, 15, 25, 50, 75, 100];
  return (
    <FormControl className="storybook-select-input">
      <InputLabel id="demo-simple-select-label">Rows per page</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={rowsPerPage.toString()}
        label="Rows per page"
        onChange={handleChangeRowsPerPage}
      >
        { selectOptions.map((option, idx) =>
          <MenuItem key={idx} value={option}>{option}</MenuItem>
        ) }
      </Select>
    </FormControl>
  );
}

export default SelectInput;