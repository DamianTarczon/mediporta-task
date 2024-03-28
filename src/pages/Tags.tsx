import { useEffect, useState } from "react";
import { useLocation, NavigateFunction, useNavigate } from "react-router-dom";
import { Tag } from '../types/types.ts';
import fetchTags from "../utils/FetchTags.tsx";
import { SelectChangeEvent } from '@mui/material/Select';
import ErrorMessage from "../components/ErrorMessage";
import TagsTable from "../components/TagsTable.tsx";
import SelectInput from "../components/SelectInput.tsx";

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
}

function Tags() {
  const navigate: NavigateFunction = useNavigate();
  const query: URLSearchParams = useQuery();
  const location = useLocation();
  const [tags, setTags] = useState<Tag[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalTags, setTotalTags] = useState<number>(0);
  const [sortValue, setSortValue] = useState<string>('popular');
  const [orderValue, setOrderValue] = useState<string>('desc');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const isPageInRange: boolean = page >= 0 && page < Math.ceil(totalTags / rowsPerPage);

  const getQueryParams = () => {
    const rowsPerPageParam: string | null = query.get('pagesize');
    const pageParam: string | null = query.get('page');
    const sortParam: string | null = query.get('sort');
    const orderParam: string | null = query.get('order');

    const rowsPerPageQuery: number = rowsPerPageParam ? parseInt(rowsPerPageParam, 10) : rowsPerPage;
    const pageQuery: number = pageParam ? parseInt(pageParam, 10) - 1 : page;
    const sortQuery: string = sortParam ? sortParam : sortValue;
    const orderQuery: string = orderParam ? orderParam : orderValue;

    setPage(pageQuery);
    setRowsPerPage(rowsPerPageQuery);
    setSortValue(sortQuery);
    setOrderValue(orderQuery);

    return {
      rowsPerPageQuery,
      pageQuery,
      sortQuery,
      orderQuery
    }
  }

  useEffect(() => {
    const {
      rowsPerPageQuery,
      pageQuery,
      sortQuery,
      orderQuery
    }: {
      rowsPerPageQuery: number;
      pageQuery: number;
      sortQuery: string;
      orderQuery: string;
    } = getQueryParams();

    ( async () => {
      setIsLoading(true);
      const {
        data,
        errorMessage
      } = await fetchTags(rowsPerPageQuery, pageQuery, sortQuery, orderQuery);
      setMessage(errorMessage);
      setTags(data.items);
      setTotalTags(data.total);
      setIsLoading(false);
    })()
  }, [location.search]);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    navigate(`?pagesize=${rowsPerPage}&page=${newPage + 1}&sort=${sortValue}&order=${orderValue}`);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    navigate(`?pagesize=${event.target.value}&page=1&sort=${sortValue}&order=${orderValue}`);
  };

  const handleSortChange = (value: string) => {
    if(value !== sortValue) {
      navigate(`?pagesize=${rowsPerPage}&page=${page + 1}&sort=${value}&order=desc`);
    } else {
      navigate(`?pagesize=${rowsPerPage}&page=${page + 1}&sort=${sortValue}&order=${orderValue === 'desc' ? 'asc' : 'desc'}`);
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
          isPageInRange={isPageInRange}
        ></TagsTable>
      </div>
    </div>
  );
}

export default Tags;
