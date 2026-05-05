import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTransactionButton } from "../components/shared/new-transaction-button";

const meta: Meta<typeof NewTransactionButton> = {
  title: "Shared/NewTransactionButton",
  component: NewTransactionButton,
  tags: ["autodocs"],

  args: {
    onClick: () => console.log("Nova transação"),
  },

  argTypes: {
    onClick: {
      action: "clicked",
      description: "Função chamada ao clicar no botão",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NewTransactionButton>;

export const Default: Story = {};

export const MobileHidden: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};