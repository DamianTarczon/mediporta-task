import {fireEvent, render, screen} from '@testing-library/react';
import TagsTable from "./TagsTable.tsx";
describe('TagsTable component', () => {
  it('renders tags correctly', () => {
    const mockTags = [
      { name: 'JavaScript', count: 100, has_synonyms: false, is_moderator_only: false, is_required: false },
      { name: 'React', count: 200, has_synonyms: false, is_moderator_only: false, is_required: false },
    ];
    const rowsPerPage = 10;
    const firstPage = 1;
    render(
      <TagsTable
        sortValue=""
        orderValue=""
        handleSortChange={() => {}}
        tags={mockTags}
        totalTags={mockTags.length}
        rowsPerPage={rowsPerPage}
        page={firstPage}
        handlePageChange={() => {}}
        isLoading={false}
        isPageInRange={true}
      />
    );

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('calls handleSortChange with "name" when name sort label is clicked', () => {
    const handleSortChange = jest.fn();
    const totalTags = 0;
    const rowsPerPage = 10;
    const firstPage = 1;
    render(
      <TagsTable
        sortValue="name"
        orderValue="asc"
        handleSortChange={handleSortChange}
        tags={[]}
        totalTags={totalTags}
        rowsPerPage={rowsPerPage}
        page={firstPage}
        handlePageChange={() => {}}
        isLoading={false}
        isPageInRange={true}
      />
    );

    fireEvent.click(screen.getByText('Tag name'));
    expect(handleSortChange).toHaveBeenCalledWith('name');
  });

  it('calls handlePageChange with the correct page number when changing pages', async () => {
    const handlePageChange = jest.fn();
    const totalTags = 100;
    const rowsPerPage = 10;
    const firstPage = 1;
    const mockTags = [...Array(rowsPerPage).keys()].map(i => (
      { name: `Tag ${i + 1}`, count: i * 10, has_synonyms: false, is_moderator_only: false, is_required: false }
    ));

    render(
      <TagsTable
        sortValue="name"
        orderValue="asc"
        handleSortChange={() => {}}
        tags={mockTags}
        totalTags={totalTags}
        rowsPerPage={rowsPerPage}
        page={firstPage}
        handlePageChange={handlePageChange}
        isLoading={false}
        isPageInRange={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    expect(handlePageChange).toHaveBeenCalled();
    expect(handlePageChange.mock.calls[0][1]).toBe(1);
  });

  it('displays loading spinner when isLoading is true', () => {
    const totalTags = 0;
    const rowsPerPage = 10;
    const firstPage = 1;
    render(
      <TagsTable
        sortValue=""
        orderValue=""
        handleSortChange={() => {}}
        tags={[]}
        totalTags={totalTags}
        rowsPerPage={rowsPerPage}
        page={firstPage}
        handlePageChange={() => {}}
        isLoading={true}
        isPageInRange={true}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});