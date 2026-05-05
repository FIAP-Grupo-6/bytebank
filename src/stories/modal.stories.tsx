import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Modal from '@/components/shared/modal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

function ModalWithForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Nova Conta">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Senha</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setOpen(false)} className="flex-1">Cancelar</Button>
            <Button onClick={() => setOpen(false)} className="flex-1">Criar Conta</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ModalWithLongContent() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Termos de Serviço">
        <div className="space-y-3 text-sm text-foreground">
          <p className="font-semibold">1. Introdução</p>
          <p className="text-muted-foreground">
            Bem-vindo aos nossos Termos de Serviço. Ao acessar e usar este aplicativo, você aceita estar vinculado pelos termos e condições descritos aqui.
          </p>

          <p className="font-semibold mt-4">2. Uso do Serviço</p>
          <p className="text-muted-foreground">
            Você concorda em usar este serviço apenas para fins legítimos e de uma forma que não viola os direitos de terceiros ou restringe seu uso e gozo.
          </p>

          <p className="font-semibold mt-4">3. Limitações de Responsabilidade</p>
          <p className="text-muted-foreground">
            A informação e os serviços inclusos neste website são fornecidos &quot;como estão&quot;, sem garantias de qualquer tipo.
          </p>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setOpen(false)} className="flex-1">Rejeitar</Button>
            <Button onClick={() => setOpen(false)} className="flex-1">Aceitar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ModalWithSuccessMessage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm text-blue-700">✓ Sua transação foi realizada com sucesso!</p>
          </div>
          <p className="text-foreground">Referência: <span className="font-mono text-sm font-semibold">#TRX-2024-05-04-001</span></p>
          <Button onClick={() => setOpen(false)} className="w-full">Fechar</Button>
        </div>
      </Modal>
    </div>
  );
}

export const WithForm: Story = {
  render: () => <ModalWithForm />,
};

export const WithLongContent: Story = {
  render: () => <ModalWithLongContent />,
};

export const SuccessMessage: Story = {
  render: () => <ModalWithSuccessMessage />,
};
