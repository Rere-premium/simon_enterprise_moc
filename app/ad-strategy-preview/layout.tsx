import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '広告戦略プレビュー（AI自動生成）',
  description: 'AIが最適な広告配分・施策戦略を自動生成',
};

export default function AdStrategyPreviewLayout({
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

