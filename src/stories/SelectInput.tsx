import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import './SelectInput.css';

function SelectInput({
  rowsPerPage,
  handleChangeRowsPerPage
}: {
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
}) {
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
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={75}>75</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectInput;