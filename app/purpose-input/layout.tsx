import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI戦略条件の設定',
  description: 'AI戦略の方向性と施策条件を設定します',
};

export default function PurposeInputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

