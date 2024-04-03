import { useEffect, useState } from "react";
import { Tag } from '../types/types.ts';
import fetchTags from "../utils/FetchTags.tsx";
import { SelectChangeEvent } from '@mui/material/Select';
import ErrorMessage from "../components/errorMessage/ErrorMessage.tsx";
import TagsTable from "../components/tagsTable/TagsTable.tsx";
import SelectInput from "../components/selectInput/SelectInput.tsx";
import { useQueryParams, NumberParam, StringParam, withDefault } from 'use-query-params';

function Home() {
  const defaultFirstPage: number = 1;
  const defaultRowsPerPage: number = 10;
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalTags, setTotalTags] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [query, setQuery] = useQueryParams({
    pagesize: withDefault(NumberParam, defaultRowsPerPage),
    page: withDefault(NumberParam, defaultFirstPage),
    sort: withDefault(StringParam, 'popular'),
    order: withDefault(StringParam, 'desc'),
  });
  const { pagesize, page, sort, order } = query;
  const isPageInRange: boolean = page >= 0 && page < Math.ceil(totalTags / pagesize);

  useEffect(() => {
    ( async () => {
      setIsLoading(true);
      const {
        data,
        errorMessage
      } = await fetchTags(pagesize, page, sort, order);
      setMessage(errorMessage);
      setTags(data.items);
      setTotalTags(data.total);
      setIsLoading(false);
    })()
  }, [pagesize, page, sort, order]);

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setQuery({ ...query, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setQuery({ ...query, pagesize: parseInt(event.target.value, 10), page: defaultFirstPage });
  };

  const handleSortChange = (value: string) => {
    if(value !== sort!) {
      setQuery({...query, sort: value, order: 'desc', page: defaultFirstPage });
    } else {
      setQuery({...query, order: order === 'desc' ? 'asc' : 'desc', page: defaultFirstPage });
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
          rowsPerPage={pagesize}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></SelectInput>
        { message && <ErrorMessage message={message} /> }
        <TagsTable
          sortValue={sort}
          orderValue={order}
          handleSortChange={handleSortChange}
          tags={tags}
          totalTags={totalTags}
          rowsPerPage={pagesize}
          page={page}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          isPageInRange={isPageInRange}
        ></TagsTable>
      </div>
    </div>
  );
}

export default Home;
