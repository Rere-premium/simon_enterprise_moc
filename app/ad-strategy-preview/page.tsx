'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function AdStrategyPreviewPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && chartRef.current && (window as any).Chart) {
      const Chart = (window as any).Chart;
      const ctx = chartRef.current.getContext('2d');

      if (ctx && !chartInstanceRef.current) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Instagram', 'YouTube', 'Google検索', 'TikTok', 'Display'],
            datasets: [{
              data: [35, 25, 20, 10, 10],
              backgroundColor: [
                '#E1306C', // Instagram pink
                '#FF0000', // YouTube red
                '#4285F4', // Google blue
                '#000000', // TikTok black
                '#9CA3AF'  // Display grey
              ],
              borderWidth: 0,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context: any) {
                    return context.label + ': ' + context.raw + '%';
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  const handleEdit = () => {
    // 編集ページへの遷移（必要に応じて実装）
    router.push('/strategy-plan');
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Chart.jsが読み込まれた後にチャートを初期化
          if (chartRef.current && (window as any).Chart) {
            const Chart = (window as any).Chart;
            const ctx = chartRef.current.getContext('2d');
            if (ctx && !chartInstanceRef.current) {
              chartInstanceRef.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                  labels: ['Instagram', 'YouTube', 'Google検索', 'TikTok', 'Display'],
                  datasets: [{
                    data: [35, 25, 20, 10, 10],
                    backgroundColor: [
                      '#E1306C',
                      '#FF0000',
                      '#4285F4',
                      '#000000',
                      '#9CA3AF'
                    ],
                    borderWidth: 0,
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '65%',
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return context.label + ': ' + context.raw + '%';
                        }
                      }
                    }
                  }
                }
              });
            }
          }
        }}
      />
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: ${notoSansJP.style.fontFamily}, sans-serif;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        @media (max-width: 1023px) {
          .sidebar-overlay.show {
            display: block;
          }
        }

        .slide-container {
          width: 1280px;
          min-height: 720px;
          background-color: #FAFAF9;
          overflow-y: auto;
          margin: 0 auto;
        }

        .main-content {
          padding: 30px;
        }

        h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #3E4650;
        }

        .description {
          font-size: 16px;
          color: #6B7280;
          margin-bottom: 24px;
        }

        .section {
          background-color: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #3E4650;
          margin: 0 0 16px 0;
        }

        .distribution {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .chart-container {
          position: relative;
          width: 270px;
          height: 270px;
          margin-right: 20px;
        }

        .badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #E6F1FA;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 11px;
          color: #3E4650;
          text-align: center;
          line-height: 1.2;
        }

        .badge i {
          font-size: 20px;
          color: #005A9C;
          margin-bottom: 4px;
        }

        .badge-text {
          font-size: 10px;
          font-weight: 500;
          color: #005A9C;
        }

        .badge-value {
          font-size: 14px;
          font-weight: 700;
          color: #005A9C;
        }

        .table-container {
          flex: 1;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #3E4650;
          background-color: #F9FAFB;
        }

        td {
          padding: 8px;
          font-size: 14px;
          color: #4B5563;
          border-bottom: 1px solid #E6E9EF;
          vertical-align: top;
        }

        .target-funnel {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .target-funnel-card {
          flex: 1;
          background-color: #FFFFFF;
          border: 1px solid #E6E9EF;
          border-radius: 8px;
          padding: 16px;
        }

        .target-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .tag {
          background-color: #F3F4F6;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 13px;
          color: #4B5563;
          display: inline-block;
        }

        .cards-container {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }

        .strategy-card {
          flex: 1;
          background-color: #FFFFFF;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 16px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #3E4650;
          margin: 0 0 12px 0;
        }

        .checklist {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .checklist li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 8px;
          font-size: 14px;
          color: #4B5563;
          line-height: 1.5;
        }

        .checklist li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #005A9C;
          font-weight: bold;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
        }

        .buttons-left {
          display: flex;
          justify-content: flex-start;
        }

        .buttons-center {
          display: flex;
          justify-content: center;
          flex: 1;
        }

        .primary-button {
          background-color: #005A9C;
          color: #FFFFFF;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .primary-button:hover {
          background-color: #004080;
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #E6E9EF;
        }

        .nav-link {
          color: #6B7280;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #005A9C;
        }

        .ai-icons {
          display: flex;
          margin-top: 12px;
          gap: 8px;
          font-size: 16px;
          color: #6B7280;
        }

        .ai-comment {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.5;
          margin-top: 8px;
        }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
        <Sidebar isOpen={isMenuOpen} />
        {isMenuOpen && (
          <div
            className="sidebar-overlay show"
            onClick={toggleMenu}
          ></div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '20px', overflow: 'auto' }}>
            <div className="slide-container">
              <div className="main-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, height: '2px', background: '#E5E7EB', zIndex: 1 }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D1FAE5', border: '2px solid #059669', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <i className="fas fa-check fa-xs"></i>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>目的入力</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D1FAE5', border: '2px solid #059669', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <i className="fas fa-check fa-xs"></i>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>市場セグメント</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D1FAE5', border: '2px solid #059669', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <i className="fas fa-check fa-xs"></i>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>ターゲット選定</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D1FAE5', border: '2px solid #059669', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <i className="fas fa-check fa-xs"></i>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>価値提案・ポジション</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#005A9C', borderColor: '#005A9C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <p>5</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#111827', textAlign: 'center', fontWeight: '500', maxWidth: '80px' }}>広告戦略</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <p>6</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>LP改善</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <p>7</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>施策・実行</p>
                </div>
              </div>
          <h1>広告戦略プレビュー（AI自動生成）</h1>
          <p className="description">上流のSTP戦略をもとに、AIが最適な広告配分・施策戦略を自動生成しました。後から編集も可能です。</p>

          <div className="section">
            <h2 className="section-title">広告媒体配分</h2>
            <div className="distribution">
              <div className="chart-container">
                <canvas ref={chartRef} id="mediaChart"></canvas>
                <div className="badge">
                  <i className="fas fa-brain"></i>
                  <p className="badge-text">AI最適化済</p>
                  <p className="badge-value">92%</p>
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>媒体</th>
                      <th>成果確率</th>
                      <th>ROI期待値</th>
                      <th>推奨予算配分</th>
                      <th>コメント</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Instagram</td>
                      <td>高</td>
                      <td>3.2倍</td>
                      <td>35%</td>
                      <td>メインターゲットと親和性が高く、視覚的訴求が効果的</td>
                    </tr>
                    <tr>
                      <td>YouTube</td>
                      <td>中〜高</td>
                      <td>2.8倍</td>
                      <td>25%</td>
                      <td>動画コンテンツで詳細な価値訴求が可能</td>
                    </tr>
                    <tr>
                      <td>Google検索</td>
                      <td>中</td>
                      <td>2.5倍</td>
                      <td>20%</td>
                      <td>検索意図の高いユーザーへのアプローチに最適</td>
                    </tr>
                    <tr>
                      <td>TikTok</td>
                      <td>低〜中</td>
                      <td>1.8倍</td>
                      <td>10%</td>
                      <td>若年層へのリーチとトレンド作りに有効</td>
                    </tr>
                    <tr>
                      <td>Display</td>
                      <td>低</td>
                      <td>1.5倍</td>
                      <td>10%</td>
                      <td>認知拡大と再訪問促進のサポートとして</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h2 className="section-title">📌 ターゲット / ファネルステージ</h2>
          <div className="target-funnel">
            <div className="target-funnel-card">
              <h3 className="card-title">ターゲット像</h3>
              <div className="target-tags">
                <span className="tag">20代女性</span>
                <span className="tag">美容関心高</span>
                <span className="tag">SNS活用層</span>
                <span className="tag">健康志向</span>
                <span className="tag">ミドルクラス</span>
              </div>
              <div className="ai-icons">
                <span>🔍</span>
                <span>👥</span>
                <span>⚙️</span>
              </div>
              <p className="ai-comment">STP分析に基づき、訪問頻度の高い属性層と文書読習度が高いユーザーが最優先ターゲットです。</p>
            </div>
            <div className="target-funnel-card">
              <h3 className="card-title">最適ファネルステージ</h3>
              <div className="target-tags">
                <span className="tag">認知</span>
                <span className="tag">興味・関心</span>
                <span className="tag">比較検討</span>
                <span className="tag">購入</span>
                <span className="tag">再購入</span>
              </div>
              <div className="ai-icons">
                <span>🔍</span>
                <span>➡️</span>
              </div>
              <p className="ai-comment">検索・検討施策でのアプローチが最も効果的です。</p>
            </div>
          </div>

          <h2 className="section-title">施策戦略メモ（AI自動生成）</h2>
          <div className="cards-container">
            <div className="strategy-card">
              <h3 className="card-title">クリエイティブ戦略</h3>
              <ul className="checklist">
                <li>ターゲットの日常シーンに寄り添う自然な訴求</li>
                <li>ビフォーアフター形式のビジュアル</li>
                <li>実際のユーザーによるUGCコンテンツ活用</li>
                <li>季節感を取り入れた訴求ポイント変更</li>
              </ul>
            </div>
            <div className="strategy-card">
              <h3 className="card-title">メッセージ方針</h3>
              <ul className="checklist">
                <li>悩みに共感するトーン＆マナー</li>
                <li>専門家の裏付けによる信頼性向上</li>
                <li>エビデンスを示した効果の可視化</li>
                <li>ユーザーストーリーを中心とした構成</li>
              </ul>
            </div>
            <div className="strategy-card">
              <h3 className="card-title">LP示唆</h3>
              <ul className="checklist">
                <li>メリット訴求型のヒーローセクション</li>
                <li>スクロールごとの複数CTAボタン設置</li>
                <li>レビュー・口コミセクションの強化</li>
                <li>専門性を示す成分解説の追加</li>
              </ul>
            </div>
          </div>

          <div className="buttons">
            <div className="buttons-left">
              <button className="primary-button">
                広告戦略を編集する
              </button>
            </div>
            <div className="buttons-center">
              <button className="primary-button" onClick={() => router.push('/strategy-plan')}>
                施策計画へ →
              </button>
            </div>
            <div style={{ width: '200px' }}></div>
          </div>

          <div className="navigation">
            <a className="nav-link" onClick={() => router.push('/stp-strategy')}>
              ← 戻る（条件設定へ）
            </a>
            <div></div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

