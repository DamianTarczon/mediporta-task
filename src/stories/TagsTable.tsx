import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Tag } from "../types/types.ts";
import './TagsTable.scss';

function TagsTable({
  sortValue,
  orderValue,
  handleSortChange,
  tags,
  totalTags,
  rowsPerPage,
  page,
  handlePageChange,
  isLoading,
  isPageInRange
}: {
  sortValue: string;
  orderValue: string;
  handleSortChange: (value: string) => void;
  tags: Tag[];
  totalTags: number;
  rowsPerPage: number;
  page: number;
  handlePageChange: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
  isLoading: boolean;
  isPageInRange: boolean;
}) {
  return (
    <div className="storybook-tags-table-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className="storybook-table-cell"
              >
                <TableSortLabel
                  active={sortValue === "name"}
                  direction={orderValue === "desc" ? "desc" : "asc"}
                  onClick={() => handleSortChange("name")}
                >
                  Tag name
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="storybook-table-cell"
              >
                <TableSortLabel
                  active={sortValue === "popular"}
                  direction={orderValue === "desc" ? "desc" : "asc"}
                  onClick={() => handleSortChange("popular")}
                >
                  Number of posts with tag
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((product: Tag, index: number) => (
              <TableRow key={index}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isPageInRange && (
          <TablePagination
            component="div"
            count={totalTags}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPageOptions={[]}
          />
        )}
      </TableContainer>
      {isLoading && (
        <div className="storybook-loading">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default TagsTable;
