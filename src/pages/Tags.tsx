import { useEffect, useState } from "react";
import { Tag } from '../types/types.ts';
import apiUrl from "../api/apiUrl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalTags, setTotalTags] = useState<number>(0);
  const [sortValue, setSortValue] = useState<string>('popular');
  const [orderValue, setOrderValue] = useState<string>('desc');

  useEffect(() => {
    const fetchTags = async () => {
      const queryString: string = `?site=stackoverflow&pagesize=${rowsPerPage}&page=${page + 1}&filter=!nNPvSNVZBz&sort=${sortValue}&order=${orderValue}`;
      try {
        const response = await fetch(`${apiUrl}/tags${queryString}`);
        const data = await response.json();
        if(data.items || data.items.length > 0) {
          setTags(data.items)
          setTotalTags(data.total);
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchTags();
  }, [page, rowsPerPage, sortValue, orderValue]);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (value: string) => {
    if(value !== sortValue) {
      setSortValue(value);
      setOrderValue('desc')
    } else {
      setOrderValue(orderValue === 'desc' ? 'asc' : 'desc');
    }
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2.5">
        <h1 className="text-3xl font-semibold">Tags</h1>
        <p className="text-lg">A tag is a keyword or label that categorizes your question with other, similar questions.<br/> Using the right tags makes it easier for others to find and answer your question.</p>
      </div>
      <div className="space-y-2.5">
        <FormControl className="max-w-48 w-full">
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="!font-bold w-1/2">
                  <TableSortLabel
                    active={sortValue === 'name'}
                    direction={orderValue === 'desc' ? 'desc' : 'asc'}
                    onClick={() => handleSortChange('name')}
                  >
                    Tag name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" className="!font-bold w-1/2">
                  <TableSortLabel
                    active={sortValue === 'popular'}
                    direction={orderValue === 'desc' ? 'desc' : 'asc'}
                    onClick={() => handleSortChange('popular')}
                  >
                    Number of posts with tag
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((product: Tag, index: number) => (
                <TableRow
                  key={index}
                >
                  <TableCell align="center">
                    {product.name}
                  </TableCell>
                  <TableCell align="center">
                    {product.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalTags}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default Tags;
