import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../components/ui/sheet";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],

  argTypes: {
    children: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Abrir</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Faça alterações nas suas informações aqui.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <p className="text-sm">Conteúdo do sheet...</p>
        </div>

        <SheetFooter>
          <Button>Salvar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};