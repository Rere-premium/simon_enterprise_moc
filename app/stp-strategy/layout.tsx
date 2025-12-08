import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AIが提案するSTP戦略',
  description: 'AIが市場構造を理解し、最適なターゲットと価値提案を自動設計',
};

export default function STPStrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      {children}
    </>
  );
}

