import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],

  argTypes: {
    className: {
      control: false,
      description: "Permite customização de estilos via Tailwind",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>
          Descrição curta explicando o conteúdo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>Conteúdo principal do card.</p>
      </CardContent>

      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};