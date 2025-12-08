import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI生成中ステータス画面',
  description: 'AIが戦略を生成中です',
};

export default function AIGeneratingLayout({
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

