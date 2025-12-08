import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '施策プラン（AI自動生成）',
  description: '実行可能な施策プランをAIが自動生成します',
};

export default function StrategyPlanLayout({
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

