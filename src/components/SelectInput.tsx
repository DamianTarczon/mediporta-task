import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function SelectInput({
  rowsPerPage,
  handleChangeRowsPerPage
}: {
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
}) {
  const selectOptions: number[] = [5, 10, 15, 25, 50, 75, 100];

  return (
    <FormControl className="max-w-48 w-full">
      <InputLabel id="select-label">Rows per page</InputLabel>
      <Select
        labelId="select-label"
        id="simple-select"
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