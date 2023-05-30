import type { Meta, StoryObj } from '@storybook/react';
import { CardDate } from './card-date';
import { CardDateProps } from './card-date.interface';

const defaultArgs: CardDateProps = {
  formattedDate: '05.06.2022',
  sizeVariant: 'large',
  text: 'latest mix',
  link: 'https://radiolocal.online',
  type: 'show',
};

const meta = {
  title: 'ui/CardDate',
  component: CardDate,
  tags: ['autodocs'],
} satisfies Meta<typeof CardDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    ...defaultArgs,
    type: 'mix',
    text: 'Студия',
  },
};
export const Secondary: Story = {
  args: {
    ...defaultArgs,
  },
};

export const SmallDate: Story = {
  args: {
    formattedDate: defaultArgs.formattedDate,
    sizeVariant: 'small',
    type: 'mix',
  },
  parameters: {
    description: {
      story: 'Another description on the story, overriding the comments',
    },
  },
};
