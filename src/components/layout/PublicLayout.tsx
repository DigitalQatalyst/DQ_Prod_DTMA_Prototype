import { ReactNode } from 'react';
import { ButlerAI } from '@/components/butler/ButlerAI';
import { ButlerWidget } from '@/components/butler/ButlerWidget';
import { WhatsAppFloatingButton } from '@/components/contact/WhatsAppFloatingButton';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      {children}
      <ButlerAI />
      <ButlerWidget />
      <WhatsAppFloatingButton />
    </>
  );
};
