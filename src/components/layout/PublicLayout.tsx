import { ReactNode } from 'react';
import { ButlerAI } from '@/components/butler/ButlerAI';
import { ButlerWidget } from '@/components/butler/ButlerWidget';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      {children}
      <ButlerAI />
      <ButlerWidget />
    </>
  );
};
