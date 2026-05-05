import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MessageConfirm from '@/components/shared/message-confirm';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof MessageConfirm> = {
  title: 'Shared/MessageConfirm',
  component: MessageConfirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MessageConfirm>;

function MessageConfirmDefaultDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Confirmação</Button>
      <MessageConfirm
        isOpen={open}
        title="Confirmar ação"
        description="Tem certeza que deseja realizar esta ação?"
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={() => {
          alert('Confirmado!');
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}

function MessageConfirmDestructiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="destructive" onClick={() => setOpen(true)}>Deletar</Button>
      <MessageConfirm
        isOpen={open}
        title="Deletar item?"
        description="Esta ação não pode ser desfeita. Tem certeza que deseja deletar este item?"
        confirmText="Deletar"
        cancelText="Cancelar"
        isDestructive={true}
        onConfirm={() => {
          alert('Item deletado!');
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <MessageConfirmDefaultDemo />,
};

export const Destructive: Story = {
  render: () => <MessageConfirmDestructiveDemo />,
};
