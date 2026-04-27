import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchInput from "../components/ui/search-input";
import { useState } from "react";

const meta: Meta<typeof SearchInput> = {
  title: "UI/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],

  args: {
    value: "",
    placeholder: "Buscar...",
  },

  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};