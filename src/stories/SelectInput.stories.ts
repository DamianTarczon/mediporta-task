import type { Meta, StoryObj } from '@storybook/react';
import SelectInput from "./SelectInput.tsx";
import {fn,} from '@storybook/test';
import './selectInput.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SelectInput',
  component: SelectInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    rowsPerPage: {
      control: 'select',
      options: ['5', '10', '15', '25', '50', '75', '100']
    },
    handleChangeRowsPerPage: { onChange: fn()}
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InUse: Story = {
  args: {
    rowsPerPage: 10,
    handleChangeRowsPerPage: (event) => {
      console.log(event.target.value)
    }
  },
};

