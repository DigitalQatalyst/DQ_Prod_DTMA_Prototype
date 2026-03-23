import { ReactNode } from 'react';
import { ButlerAI } from '@/components/butler/ButlerAI';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      {children}
      <ButlerAI />
    </>
  );
};
