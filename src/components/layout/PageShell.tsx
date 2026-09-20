import { cn } from '@/lib/cn';

interface PageShellProps {
  children: React.ReactNode;
  variant?: 'content' | 'header';
  as?: 'div' | 'section' | 'nav';
  className?: string;
  id?: string;
  label?: string;
}

export function PageShell({ children, variant = 'content', as: Tag = 'div', className, id, label }: PageShellProps) {
  return (
    <Tag id={id} aria-label={label} className={cn(variant === 'header' ? 'shell--header' : 'shell', className)}>
      {children}
    </Tag>
  );
}
