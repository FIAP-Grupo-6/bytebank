import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],

  argTypes: {
    children: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Popover Title</p>
          <p className="text-sm text-muted-foreground">
            Conteúdo dentro do popover.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};