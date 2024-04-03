import type { Meta, StoryObj } from '@storybook/react';
import TagsTable from './TagsTable';
import { Tag } from '../types/types';
import {useArgs} from "@storybook/preview-api";
import React, { useMemo } from 'react';

const mockTags: Tag[] = Array.from({ length: 10 }, (_, index) => ({
  name: `Tag ${index + 1}`,
  count: Math.floor(Math.random() * 100),
  hasSynonyms: false,
  isModeratorOnly: true,
  isRequired: false,
}));

function generateMockTags(rowsPerPage: number, page: number, sort: string, order: string){
  const sortedMockTags = mockTags.sort((a, b) => {
    let compareValue = 0;

    if (sort === 'popular') {
      compareValue = a.count - b.count;
    } else {
      const numA = parseInt(a.name.replace(/^\D+/g, ''), 10);
      const numB = parseInt(b.name.replace(/^\D+/g, ''), 10);
      compareValue = numA - numB;
    }

    if (order === 'desc') {
      return -compareValue;
    }
    return compareValue;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return sortedMockTags.slice(startIndex, endIndex);
}

const meta: Meta<typeof TagsTable> = {
  title: 'TagsTable',
  component: TagsTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sortValue: {
      control: 'select',
      options: ['popular', 'name'],
      defaultValue: 'popular'
    },
    orderValue: {
      control: 'select',
      options: ['desc', 'asc'],
      defaultValue: 'desc'
    },
    tags: {control: false},
    totalTags: {control: false},
    rowsPerPage: {
      control: 'number',
      defaultValue: 5
    },
    page: {
      control: 'number',
      defaultValue: 0
    },
    isLoading: { control: 'boolean' },
    isPageInRange: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sortValue: 'popular',
    orderValue: 'desc',
    tags: mockTags,
    totalTags: 10,
    rowsPerPage: 5,
    page: 0,
    isLoading: false,
    isPageInRange: true,
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs(); // eslint-disable-line @typescript-eslint/no-unused-vars
    const tags = useMemo(() => {
      return generateMockTags(args.rowsPerPage, args.page, args.sortValue, args.orderValue)
    }, [args.rowsPerPage, args.page, args.sortValue, args.orderValue])

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      updateArgs({ page: newPage });
    };

    const handleSortChange = (value: string) => {
      if(value !== args.sortValue) {
        updateArgs({sortValue: value, orderValue: 'desc'})
      } else {
        updateArgs({sortValue: value, orderValue: args.orderValue === 'desc' ? 'asc' : 'desc'})
      }
    }
    return <TagsTable {...args} handlePageChange={handlePageChange} handleSortChange={handleSortChange} tags={tags} />;
  },
};

const defaultHandlePageChange = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
  console.log("Change to page:", newPage);
};

const defaultHandleSortChange = (value: string) => {
  console.log(value)
}
export const LoadingState: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    handlePageChange: defaultHandlePageChange,
  },
};

export const PageNotInRangeState: Story = {
  args: {
    ...Default.args,
    isPageInRange: false,
    handleSortChange: defaultHandleSortChange
  },
};
