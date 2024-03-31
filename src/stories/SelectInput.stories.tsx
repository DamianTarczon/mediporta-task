import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import SelectInput from "./SelectInput.tsx";
import './selectInput.css';
import { SelectChangeEvent } from '@mui/material/Select';

const meta: Meta<typeof SelectInput> = {
  title: 'SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rowsPerPage: {
      control: 'select',
      options: ['5', '10', '15', '25', '50', '75', '100']
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InUse: Story = {
  args: {
    rowsPerPage: 10,
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs();

    // Explicitly type the event parameter
    const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
      updateArgs({ rowsPerPage: event.target.value });
    };

    return <SelectInput {...args} handleChangeRowsPerPage={handleChangeRowsPerPage} />;
  },
};
