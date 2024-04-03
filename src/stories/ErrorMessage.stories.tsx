import type { Meta, StoryObj } from '@storybook/react';
import  ErrorMessage  from './ErrorMessage.tsx';

const meta = {
  title: 'ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InUse: Story = {
  args: {
    message: 'Sorry, we couldn\'t find tags.',
  },
};

