'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function STPStrategyPage() {
  const router = useRouter();
  const [showAIMessage, setShowAIMessage] = useState(false);
  const [serviceDescription, setServiceDescription] = useState('');

  const handleRegenerate = () => {
    setShowAIMessage(true);
    setTimeout(() => {
      setShowAIMessage(false);
    }, 2000);
  };

  const handleContinue = () => {
    router.push('/ad-strategy-preview');
  };

  return (
    <>
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
          background-color: white;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .slide-container {
          width: 1280px;
          min-height: 720px;
          position: relative;
          overflow: hidden;
          background-color: white;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .slide-content {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #CBD5E0 white;
        }

        .slide-content::-webkit-scrollbar {
          width: 6px;
        }

        .slide-content::-webkit-scrollbar-track {
          background: white;
        }

        .slide-content::-webkit-scrollbar-thumb {
          background-color: #CBD5E0;
          border-radius: 3px;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          padding: 16px 20px;
          background-color: white;
          border-bottom: 1px solid #E5E7EB;
        }

        .header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .title-group {
          display: flex;
          align-items: center;
        }

        .card-title {
          font-size: 16px;
          font-weight: 700;
          color: #1F2937;
        }

        .english-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin-left: 8px;
          font-weight: normal;
        }

        .ai-insight {
          font-size: 13px;
          color: #6B7280;
          font-weight: 500;
        }

        .button-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ai-label {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #6B7280;
        }

        .button-group {
          display: flex;
          gap: 12px;
        }

        .strategy-card {
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          background-color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          min-height: 420px;
          margin-top: 16px;
        }

        .strategy-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }

        .card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .loading-placeholder {
          display: flex;
          align-items: center;
          padding: 10px;
          background-color: #EFF6FF;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .progress-bar {
          display: flex;
          margin-left: 10px;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          margin-right: 4px;
          border-radius: 50%;
          background-color: #0D6EFD;
        }

        @keyframes pulseAnimation {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        .pulse-1 { animation: pulseAnimation 1.8s infinite; }
        .pulse-2 { animation: pulseAnimation 1.8s infinite 0.6s; }
        .pulse-3 { animation: pulseAnimation 1.8s infinite 1.2s; }
        .pulse-4 { animation: pulseAnimation 1.8s infinite 1.8s; }

        .edit-button, .alt-button {
          background-color: #F5F5F5;
          color: #0D6EFD;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 13px;
          display: flex;
          align-items: center;
          height: 24px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .edit-button:hover, .alt-button:hover {
          background-color: #F9FAFB;
        }

        .primary-text {
          font-size: 15px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .secondary-text {
          font-size: 14px;
          color: #4B5563;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .tertiary-text {
          font-size: 12px;
          color: #6B7280;
        }

        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: #1F2937;
          margin-top: 16px;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .card-list {
          list-style-type: disc;
          padding-left: 24px;
          margin-bottom: 20px;
        }

        .card-list li {
          margin-bottom: 4px;
          color: #4B5563;
          font-size: 14px;
          padding-left: 4px;
        }

        .card-footer {
          padding-top: 16px;
          margin-top: auto;
          border-top: 1px solid #F3F4F6;
        }

        .main-title {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 15px;
          font-weight: 500;
          color: #4B5563;
          margin-bottom: 24px;
        }

        .action-button {
          background-color: #0D6EFD;
          color: white;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.2s ease;
          min-width: 280px;
          text-align: center;
          border: none;
          cursor: pointer;
        }

        .action-button:hover {
          background-color: #0B5ED7;
        }

        .service-label {
          font-size: 15px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 8px;
        }

        .service-input {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 12px 16px;
          background-color: #FAFAFA;
          min-height: 80px;
          width: 100%;
          font-family: ${notoSansJP.style.fontFamily}, sans-serif;
          font-size: 14px;
          resize: vertical;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .ai-message {
          position: fixed;
          right: 24px;
          bottom: 24px;
          background-color: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
          z-index: 50;
        }

        .regenerate-btn {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 13px;
          color: #4B5563;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .regenerate-btn:hover {
          background-color: #F9FAFB;
        }
      `}</style>
      <div className="slide-container">
        <div className="slide-content">
          <div style={{ padding: '32px' }}>
            <h1 className="main-title">AIが市場構造を理解し、最適なターゲットと価値提案を自動設計</h1>
            <p className="subtitle">あなたのビジネスに最適な「市場・顧客・価値ポジション」を自動で分析・提案します。</p>

            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#F0F9FF', borderLeft: '4px solid #0D6EFD', borderRadius: '4px' }}>
              <p style={{ fontSize: '14px', color: '#4B5563' }}>上部画面で入力した情報をもとに、AIがSTP戦略を自動生成しました。</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>AIが提案するSTP戦略</p>
              <button className="regenerate-btn" onClick={handleRegenerate}>
                <i className="fas fa-sync-alt" style={{ marginRight: '6px', fontSize: '12px' }}></i>
                <span>再生成</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {/* Card 1: Market Segmentation */}
              <div className="strategy-card">
                <div className="card-header">
                  <div className="header-row">
                    <div className="title-group">
                      <p className="card-title">市場セグメント分類</p>
                      <p className="english-subtitle">Segmentation</p>
                    </div>
                    <p className="ai-insight">AIの市場洞察</p>
                  </div>
                  <div className="button-row">
                    <div className="ai-label">
                      <i className="fas fa-robot" style={{ color: '#0D6EFD', marginRight: '4px', fontSize: '12px' }}></i>
                      <span>AI</span>
                    </div>
                    <div className="button-group">
                      <button className="edit-button">
                        <i className="fas fa-pen" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                        <span>編集</span>
                      </button>
                      <button className="alt-button">
                        <i className="fas fa-sync-alt" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                        <span>別候補</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div className="loading-placeholder">
                    <i className="fas fa-robot" style={{ color: '#0D6EFD', marginRight: '8px' }}></i>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginRight: '8px' }}>AIが分析中</p>
                    <div className="progress-bar">
                      <div className="progress-dot pulse-1"></div>
                      <div className="progress-dot pulse-2"></div>
                      <div className="progress-dot pulse-3"></div>
                    </div>
                  </div>
                  <p className="primary-text">あなたのビジネスに最適なセグメント分類を提案します。</p>
                  <p className="secondary-text">分析ロジック：類似業種データ × 市場傾向データ × 過去施策パターンをもとに自動判定。</p>
                  <p className="section-title">主な分類軸：</p>
                  <ul className="card-list">
                    <li>デモグラフィック（年齢、性別、収入）</li>
                    <li>サイコグラフィック（価値観、ライフスタイル）</li>
                    <li>行動特性（購買頻度、利用シーン）</li>
                  </ul>
                  <div className="card-footer">
                    <p className="tertiary-text">AIが市場の構造を分析し、最適なセグメントを提案しています。</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Target Selection */}
              <div className="strategy-card">
                <div className="card-header">
                  <div className="header-row">
                    <div className="title-group">
                      <p className="card-title">ターゲット選定</p>
                      <p className="english-subtitle">Targeting</p>
                    </div>
                    <p className="ai-insight">AIの顧客理解</p>
                  </div>
                  <div className="button-row">
                    <div className="ai-label">
                      <i className="fas fa-robot" style={{ color: '#0D6EFD', marginRight: '4px', fontSize: '12px' }}></i>
                      <span>AI</span>
                    </div>
                    <div className="button-group">
                      <button className="edit-button">
                        <i className="fas fa-pen" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                        <span>編集</span>
                      </button>
                      <button className="alt-button">
                        <i className="fas fa-sync-alt" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                        <span>別候補</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div className="loading-placeholder">
                    <i className="fas fa-robot" style={{ color: '#0D6EFD', marginRight: '8px' }}></i>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginRight: '8px' }}>AIが分析中</p>
                    <div className="progress-bar">
                      <div className="progress-dot pulse-1"></div>
                      <div className="progress-dot pulse-2"></div>
                      <div className="progress-dot pulse-3"></div>
                      <div className="progress-dot pulse-4"></div>
                    </div>
                  </div>
                  <p className="primary-text">最も魅力的な顧客セグメントを特定し、優先順位をつけます。</p>
                  <p className="secondary-text">優先度評価に基づき、ROIが最大化しやすいセグメントを特定します。</p>
                  <p className="section-title">主な評価基準：</p>
                  <ul className="card-list">
                    <li>市場規模と成長性</li>
                    <li>自社製品との適合性</li>
                    <li>競合状況と差別化可能性</li>
                  </ul>
                  <div className="card-footer">
                    <p className="tertiary-text">AIが顧客データを分析し、最適なターゲティングを提案しています。</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Positioning Design */}
              <div className="strategy-card">
                <div className="card-header">
                  <div className="header-row">
                    <div className="title-group">
                      <p className="card-title">ポジショニング設計</p>
                      <p className="english-subtitle">Positioning</p>
                    </div>
                    <p className="ai-insight">AIの価値提案</p>
                  </div>
                  <div className="button-row">
                    <div className="ai-label">
                      <i className="fas fa-robot" style={{ color: '#0D6EFD', marginRight: '4px', fontSize: '12px' }}></i>
                      <span>AI</span>
                    </div>
                    <div className="button-group">
                      <button className="edit-button">
                        <i className="fas fa-pen" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                        <span>編集</span>
                      </button>
                      <button className="alt-button">
                        <i className="fas fa-sync-alt" style={{ marginRight: '4px', fontSize: '10px' }}></i>
                        <span>別候補</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div className="loading-placeholder">
                    <i className="fas fa-robot" style={{ color: '#0D6EFD', marginRight: '8px' }}></i>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginRight: '8px' }}>AIが分析中</p>
                    <div className="progress-bar">
                      <div className="progress-dot pulse-1"></div>
                      <div className="progress-dot pulse-2"></div>
                      <div className="progress-dot pulse-3"></div>
                      <div className="progress-dot pulse-4"></div>
                    </div>
                  </div>
                  <p className="primary-text">ターゲット顧客の心に刻まれる独自の位置づけを提案します。</p>
                  <p className="secondary-text">競合の構成比を加味し、独自のポジションマップを生成します。</p>
                  <p className="section-title">主な要素：</p>
                  <ul className="card-list">
                    <li>価値提案（コア・ベネフィット）</li>
                    <li>競合との差別化ポイント</li>
                    <li>ブランドパーソナリティ</li>
                  </ul>
                  <div className="card-footer">
                    <p className="tertiary-text">AIが競合データを分析し、最適なポジショニングを設計しています。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div style={{ marginTop: '36px', marginBottom: '24px' }}>
              <p className="service-label">サービス説明（任意）</p>
              <textarea
                className="service-input"
                placeholder="サービスの特徴・価格帯・差別化ポイントを入力すると、AIの分析精度が向上します。"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
            </div>

            {/* Action Button */}
            <div className="button-container">
              <button className="action-button" onClick={handleContinue}>
                AI提案をもとに広告戦略を確認
              </button>
            </div>

            {/* AI Message Popup */}
            {showAIMessage && (
              <div className="ai-message">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                    <i className="fas fa-brain" style={{ color: '#0D6EFD', marginRight: '8px' }}></i>
                    AIがSTP構造を再計算しています...
                  </p>
                  <p style={{ fontSize: '14px' }}>
                    <i className="fas fa-lightbulb" style={{ color: '#0D6EFD', marginRight: '8px' }}></i>
                    新しい市場パターンを検出しました。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

