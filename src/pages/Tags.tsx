import { useEffect, useState } from "react";
import { Tag } from '../types/types.ts';
import fetchTags from "../utils/FetchTags.tsx";
import { SelectChangeEvent } from '@mui/material/Select';
import ErrorMessage from "../components/ErrorMessage";
import TagsTable from "../components/TagsTable.tsx";
import SelectInput from "../components/SelectInput.tsx";

function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalTags, setTotalTags] = useState<number>(0);
  const [sortValue, setSortValue] = useState<string>('popular');
  const [orderValue, setOrderValue] = useState<string>('desc');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    ( async () => {
      setIsLoading(true);
      const {
        data,
        errorMessage
      } = await fetchTags({rowsPerPage, page, sortValue, orderValue});
      setMessage(errorMessage);
      setTags(data.items);
      setTotalTags(data.total);
      setIsLoading(false);
    })()
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
        <SelectInput
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></SelectInput>
        { message && <ErrorMessage message={message} /> }
        <TagsTable
          sortValue={sortValue}
          orderValue={orderValue}
          handleSortChange={handleSortChange}
          tags={tags}
          totalTags={totalTags}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          isLoading={isLoading}
        ></TagsTable>
      </div>
    </div>
  );
}

export default Tags;
