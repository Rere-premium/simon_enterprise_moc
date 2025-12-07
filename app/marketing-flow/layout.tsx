import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Lite AIマーケティングフロー',
  description: 'AIが戦略立案から広告設計までを一気通貫で支援します',
};

export default function MarketingFlowLayout({
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

