'use client';

import { useState } from 'react';
import { Noto_Sans_JP } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function StrategyPlanPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('instagram');
  const [aiAutoInherit, setAiAutoInherit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleRegenerate = () => {
    showToastNotification('3つの新しい施策を再生成しました');
  };

  const handleAiToggle = (checked: boolean) => {
    setAiAutoInherit(checked);
    if (checked) {
      showToastNotification('AI自動継承がオンになりました');
    }
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
        }

        .slide-container {
          width: 1280px;
          min-height: 720px;
          position: relative;
          overflow: hidden;
          background-color: white;
        }

        .slide-content {
          padding: 40px 80px;
          overflow-y: auto;
        }

        .header-section {
          margin-bottom: 24px;
        }

        .info-message {
          display: flex;
          align-items: center;
          background-color: #F0F9FF;
          border-left: 4px solid #0EA5E9;
          padding: 12px 16px;
          border-radius: 4px;
          margin-top: 12px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card {
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          transition: all 0.2s ease;
        }

        .card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 16px;
          overflow-x: auto;
        }

        .tab {
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #6B7280;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: #0EA5E9;
          border-bottom-color: #0EA5E9;
          border-bottom-width: 3px;
          font-weight: 600;
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
        }

        .strategy-card {
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          position: relative;
          min-height: 160px;
        }

        .strategy-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .strategy-list li {
          display: flex;
          align-items: flex-start;
          padding: 6px 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .strategy-list li:last-child {
          border-bottom: none;
        }

        .list-icon {
          color: #0EA5E9;
          margin-right: 8px;
          margin-top: 3px;
        }

        .ai-btn {
          background-color: #F0F9FF;
          color: #0EA5E9;
          border: 1px solid #E0F2FE;
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .ai-btn:hover {
          background-color: #E0F2FE;
        }

        .primary-button {
          background-color: #0EA5E9;
          color: white;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.2s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
        }

        .primary-button:hover {
          background-color: #0284C7;
        }

        .secondary-button {
          color: #374151;
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 12px 20px;
          font-weight: 500;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
        }

        .secondary-button:hover {
          background-color: #F9FAFB;
        }

        .footer-buttons {
          display: flex;
          justify-content: flex-start;
          margin-top: 30px;
          padding-bottom: 10px;
        }

        .toggle-switch {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .toggle-slider {
          position: relative;
          width: 44px;
          height: 22px;
          background-color: #E5E7EB;
          border-radius: 20px;
          margin: 0 8px;
          transition: background-color .3s;
        }

        .toggle-slider:before {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: white;
          top: 2px;
          left: 2px;
          transition: transform .3s;
        }

        .toggle-input:checked + .toggle-slider {
          background-color: #005A9C;
        }

        .toggle-input:checked + .toggle-slider:before {
          transform: translateX(22px);
        }

        .toggle-input {
          display: none;
        }

        .ai-badge {
          display: inline-flex;
          align-items: center;
          background-color: #EEF6FF;
          color: #005A9C;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          margin-left: 6px;
        }

        .lp-diagnostic-info {
          background-color: #F3F4F6;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          margin-bottom: 24px;
        }

        .media-guide-link {
          display: block;
          color: #005A9C;
          font-size: 14px;
          margin-bottom: 12px;
          text-decoration: none;
        }

        .media-guide-link:hover {
          text-decoration: underline;
        }

        .toast-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 20px;
          background-color: rgba(55,65,81,0.9);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          opacity: 0;
          transition: opacity .3s;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1000;
        }

        .toast-notification.show {
          opacity: 1;
        }

        .section-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #F3F8FF;
          border: 1px solid #C7DEFF;
          border-radius: 8px;
          padding: 10px 14px;
          margin: 16px 0;
        }

        .section-banner i {
          color: #005A9C;
        }

        .highlight-section {
          background-color: #F8FAFF;
          border: 1px solid #C7DEFF;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.06);
        }

        .assist-badge {
          display: inline-flex;
          align-items: center;
          background-color: #EEF6FF;
          color: #005A9C;
          border: 1px solid #E0F2FE;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
        }

        .idea-wrap-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-subtitle {
          font-size: 14px;
          color: #4B5563;
          margin-top: 6px;
        }

        .reason-text {
          font-size: 13px;
          color: #4B5563;
          margin-top: 10px;
        }

        .thin-divider {
          height: 1px;
          background-color: #E5E7EB;
          margin: 16px 0;
        }

        .title-divider {
          border-top: 1px solid #E5E7EB;
          width: 100%;
        }

        .title-spacing {
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .idea-card-lg {
          position: relative;
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 16px;
          min-height: 220px;
        }

        .new-flag {
          position: absolute;
          top: 10px;
          left: 10px;
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          color: #005A9C;
          background-color: #EEF6FF;
          border: 1px solid #E0F2FE;
        }

        .category-label {
          position: absolute;
          top: 10px;
          right: 10px;
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          color: #005A9C;
          background-color: #E8F2FF;
          border: 1px solid #C7DEFF;
        }

        .idea-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin-top: 28px;
          margin-bottom: 6px;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mini-link {
          font-size: 13px;
          color: #005A9C;
          text-decoration: underline;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
        }

        .priority-badge {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 1px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .priority-high {
          background-color: #FEE2E2;
          color: #B91C1C;
          border: 1px solid #FCA5A5;
        }

        .priority-medium {
          background-color: #FEF3C7;
          color: #B45309;
          border: 1px solid #FCD34D;
        }

        .priority-low {
          background-color: #E5E7EB;
          color: #374151;
          border: 1px solid #D1D5DB;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn .5s ease;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal-content {
          background-color: white;
          width: 100%;
          max-width: 640px;
          border-radius: 8px;
          padding: 24px;
          border: 1px solid #E5E7EB;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .form-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 14px;
        }

        .form-textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 14px;
          resize: vertical;
        }

        @media (max-height: 720px) {
          .slide-content {
            overflow-y: auto;
          }
        }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB' }}>
        <Sidebar isOpen={isMenuOpen} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '20px', overflow: 'auto' }}>
            <div className="slide-container">
              <div className="slide-content">
                <div className="header-section">
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                    施策プラン（AI自動生成）
                  </h1>
                  <div className="info-message">
                    <i className="fas fa-info-circle" style={{ color: '#0EA5E9', marginRight: '12px' }}></i>
                    <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                      入力した目標と広告設計案をもとに、実行可能な施策プランをAIが自動生成します。
                    </p>
                  </div>
                </div>

                {/* KPI・目的設定 */}
                <div className="card">
                  <h2 className="section-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-bullseye" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                      <span>KPI・目的設定（AI自動継承）</span>
                    </div>
                    <label className="toggle-switch">
                      <span style={{ fontSize: '14px' }}>🔁 AI自動継承：</span>
                      <input
                        type="checkbox"
                        className="toggle-input"
                        id="aiAutoInherit"
                        checked={aiAutoInherit}
                        onChange={(e) => handleAiToggle(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                      <span style={{ fontSize: '14px', marginLeft: '4px' }}>{aiAutoInherit ? 'ON' : 'OFF'}</span>
                    </label>
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        目的/KPI
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                          className="form-input"
                          id="kpiSelect"
                          readOnly
                          style={{ backgroundColor: '#F9FAFB' }}
                        >
                          <option value="cpa">CPA最適化</option>
                          <option value="conversion">コンバージョン数</option>
                          <option value="awareness">認知度</option>
                          <option value="engagement">エンゲージメント率</option>
                          <option value="roas">ROAS</option>
                        </select>
                        <span className="ai-badge">
                          <i className="fas fa-brain" style={{ marginRight: '4px' }}></i>
                          AI推奨
                        </span>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        対象期間
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="text"
                          className="form-input"
                          id="periodInput"
                          readOnly
                          value="2025/11/03〜12/03"
                          style={{ backgroundColor: '#F9FAFB' }}
                        />
                        <span className="ai-badge">
                          <i className="fas fa-brain" style={{ marginRight: '4px' }}></i>
                          AI推奨
                        </span>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        優先指標
                      </label>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <input type="radio" name="priority" value="cpa" disabled style={{ marginRight: '8px' }} />
                          <span style={{ fontSize: '14px' }}>CPA最適</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <input type="radio" name="priority" value="cv" disabled style={{ marginRight: '8px' }} />
                          <span style={{ fontSize: '14px' }}>CV最大化</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <input type="radio" name="priority" value="roi" defaultChecked disabled style={{ marginRight: '8px' }} />
                          <span style={{ fontSize: '14px' }}>ROI最大化</span>
                          <span className="ai-badge" style={{ marginLeft: '8px' }}>
                            <i className="fas fa-brain" style={{ marginRight: '4px' }}></i>
                            AI推奨
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '16px', margin: 0 }}>
                    ※ 上記KPI・目的値はAIが前フェーズの戦略結果をもとに自動設定しています。必要に応じて手動で上書き可能です。
                  </p>
                </div>

                {/* 媒体別施策タスクリスト */}
                <div className="card">
                  <h2 className="section-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-tasks" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                      <span>媒体別施策タスクリスト</span>
                    </div>
                  </h2>
                  <div className="tabs">
                    <div
                      className={`tab ${activeTab === 'instagram' ? 'active' : ''}`}
                      onClick={() => setActiveTab('instagram')}
                    >
                      <i className="fab fa-instagram" style={{ marginRight: '8px' }}></i>
                      Instagram
                    </div>
                    <div
                      className={`tab ${activeTab === 'youtube' ? 'active' : ''}`}
                      onClick={() => setActiveTab('youtube')}
                    >
                      <i className="fab fa-youtube" style={{ marginRight: '8px' }}></i>
                      YouTube
                    </div>
                    <div
                      className={`tab ${activeTab === 'google' ? 'active' : ''}`}
                      onClick={() => setActiveTab('google')}
                    >
                      <i className="fab fa-google" style={{ marginRight: '8px' }}></i>
                      Google広告
                    </div>
                  </div>

                  {/* Instagram Tab */}
                  <div className={`tab-content ${activeTab === 'instagram' ? 'active' : ''}`}>
                    <a
                      className="media-guide-link"
                      href="https://business.instagram.com/advertising"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt" style={{ marginRight: '4px' }}></i>
                      🔗 媒体の公式広告ガイドを見る
                    </a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                      <div className="strategy-card">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-bullhorn" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                          📣 メッセージ方針
                        </h3>
                        <ul className="strategy-list">
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>悩み解決型の"Before/After"ストーリー展開</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>共感性の高い日常シーンでの商品活用</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>1回の使用で実感できる効果をハイライト</span>
                          </li>
                        </ul>
                        <button className="ai-btn">
                          <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
                          AIに再生成
                        </button>
                      </div>
                      <div className="strategy-card">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-image" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                          🖼️ クリエイティブ指示
                        </h3>
                        <ul className="strategy-list">
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>Instagram Reelsで実際の使用シーン（15秒×3バリエーション）</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>UGCスタイルのレビュー画像/動画</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>カルーセルでBefore/After比較（3-5枚組）</span>
                          </li>
                        </ul>
                        <button className="ai-btn">
                          <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
                          AIに再生成
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* YouTube Tab */}
                  <div className={`tab-content ${activeTab === 'youtube' ? 'active' : ''}`}>
                    <a
                      className="media-guide-link"
                      href="https://www.youtube.com/intl/ja/ads/resources/creation-center/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt" style={{ marginRight: '4px' }}></i>
                      🔗 媒体の公式広告ガイドを見る
                    </a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                      <div className="strategy-card">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-bullhorn" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                          📣 メッセージ方針
                        </h3>
                        <ul className="strategy-list">
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>視聴者の興味を5秒でキャッチする導入部</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>製品の特長と使用効果を視覚的に説明</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>明確なCTAと次のアクションを促す締め</span>
                          </li>
                        </ul>
                        <button className="ai-btn">
                          <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
                          AIに再生成
                        </button>
                      </div>
                      <div className="strategy-card">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-image" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                          🖼️ クリエイティブ指示
                        </h3>
                        <ul className="strategy-list">
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>スキップ可能広告（15秒/30秒）のバージョン複数制作</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>インフルエンサーによる製品レビュー動画（60秒）</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>製品使用の詳細解説（ハウツー形式/2分）</span>
                          </li>
                        </ul>
                        <button className="ai-btn">
                          <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
                          AIに再生成
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Google Tab */}
                  <div className={`tab-content ${activeTab === 'google' ? 'active' : ''}`}>
                    <a
                      className="media-guide-link"
                      href="https://support.google.com/google-ads"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt" style={{ marginRight: '4px' }}></i>
                      🔗 媒体の公式広告ガイドを見る
                    </a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                      <div className="strategy-card">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-bullhorn" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                          📣 メッセージ方針
                        </h3>
                        <ul className="strategy-list">
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>ユーザーの検索意図に合わせたキーワード設計</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>明確な数値・特長を含むヘッドライン</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>差別化ポイントを含む説明文（90文字以内）</span>
                          </li>
                        </ul>
                        <button className="ai-btn">
                          <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
                          AIに再生成
                        </button>
                      </div>
                      <div className="strategy-card">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-image" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                          🖼️ クリエイティブ指示
                        </h3>
                        <ul className="strategy-list">
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>レスポンシブ検索広告用テキストバリエーション（15種）</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>ディスプレイ広告用バナー（6サイズ×3パターン）</span>
                          </li>
                          <li>
                            <i className="fas fa-check list-icon"></i>
                            <span style={{ fontSize: '14px', color: '#374151' }}>サイトリンク/プロモーション用テキスト（各4種）</span>
                          </li>
                        </ul>
                        <button className="ai-btn">
                          <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
                          AIに再生成
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LP改善指示 */}
                <div className="card">
                  <h2 className="section-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-file-alt" style={{ color: '#0EA5E9', marginRight: '8px' }}></i>
                      <span>LP改善指示</span>
                    </div>
                  </h2>
                  <div className="lp-diagnostic-info">
                    <p style={{ color: '#374151', marginBottom: '16px' }}>
                      LP改善指示を表示するには、先にLP診断を実施してください。<br />
                      (LP改善の自動提案は、LP URLの入力後に生成されます)
                    </p>
                    <button className="primary-button">
                      <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
                      LP診断を行う
                    </button>
                  </div>
                </div>

                {/* 区切り帯（セクションバナー） */}
                <div className="section-banner">
                  <i className="fas fa-rocket"></i>
                  <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
                    <span style={{ fontWeight: 700, color: '#005A9C' }}>AI Growth Assist（β）</span>
                    <span> ｜ AIが戦略条件・業種・市場トレンドを分析し、広告では捉えきれない成長アイデアを提案します</span>
                  </p>
                </div>

                {/* 特別枠：AIが発見する広告外の成長チャンス */}
                <div className="highlight-section fade-in">
                  <div className="idea-wrap-title">
                    <div style={{ width: '100%' }}>
                      <div className="title-divider"></div>
                      <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginTop: '16px', marginBottom: '16px' }}>
                        AIが発見する "広告を超える成長チャンス"
                      </h3>
                      <p className="section-subtitle">
                        戦略条件・市場データ・業種傾向から、担当者が気づきにくい外部成長施策をAIが自動生成します。
                      </p>
                    </div>
                    <span className="assist-badge">AI Growth Assist｜NEW</span>
                  </div>
                  <p className="reason-text">
                    AIが、あなたの「業種」「戦略条件」「過去施策傾向」「市場トレンド」を解析し、広告以外の成長施策を3つ自動生成します。（担当者では思いつきにくい「隠れた成長施策」を提案します）
                  </p>
                  <div className="thin-divider"></div>

                  {/* 3つの施策カード */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {/* 1: CRM / コミュニティ */}
                    <div className="idea-card-lg">
                      <span className="new-flag">NEW（AI生成）</span>
                      <span className="category-label">カテゴリ：CRM / コミュニティ</span>
                      <div>
                        <h4 className="idea-title">顧客体験の発展型プログラム</h4>
                        <p style={{ fontSize: '14px', color: '#374151' }} className="line-clamp-2">
                          既存顧客の継続利用率を高める体験型施策。段階特典やイベントを通じてUGC創出とLTV向上に寄与。
                        </p>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>AI推奨度：</p>
                        <div>
                          <span className="priority-badge priority-high">高</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <a className="mini-link" href="#">
                          <i className="fas fa-search" style={{ marginRight: '4px' }}></i>
                          詳細を見る
                        </a>
                      </div>
                    </div>

                    {/* 2: PR / 外部アプローチ */}
                    <div className="idea-card-lg">
                      <span className="new-flag">NEW（AI生成）</span>
                      <span className="category-label">カテゴリ：PR / 外部アプローチ</span>
                      <div>
                        <h4 className="idea-title">比較記事タイアップ（第三者評価）</h4>
                        <p style={{ fontSize: '14px', color: '#374151' }} className="line-clamp-2">
                          業界メディアと連携し比較記事で信頼を獲得。検討層の想起率向上とブランド検索増に貢献。
                        </p>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>AI推奨度：</p>
                        <div>
                          <span className="priority-badge priority-medium">中</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <a className="mini-link" href="#">
                          <i className="fas fa-search" style={{ marginRight: '4px' }}></i>
                          詳細を見る
                        </a>
                      </div>
                    </div>

                    {/* 3: UGC / ブランド */}
                    <div className="idea-card-lg">
                      <span className="new-flag">NEW（AI生成）</span>
                      <span className="category-label">カテゴリ：UGC / ブランド</span>
                      <div>
                        <h4 className="idea-title">#体験シェア UGCキャンペーン</h4>
                        <p style={{ fontSize: '14px', color: '#374151' }} className="line-clamp-2">
                          ハッシュタグ投稿を促進し、社会的証明を継続的に形成。参加動機を高めるインセンティブを設計。
                        </p>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>AI推奨度：</p>
                        <div>
                          <span className="priority-badge priority-low">低</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <a className="mini-link" href="#">
                          <i className="fas fa-search" style={{ marginRight: '4px' }}></i>
                          詳細を見る
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                    <button className="primary-button" onClick={handleRegenerate}>
                      <i className="fas fa-magic" style={{ marginRight: '8px' }}></i>
                      AIに再生成（3つの新しい施策を出す）
                    </button>
                    <button className="secondary-button" onClick={() => setShowModal(true)}>
                      <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                      手動で施策を追加
                    </button>
                  </div>
                </div>

                {/* フッター */}
                <div className="footer-buttons">
                  <a className="secondary-button" href="/marketing-flow" style={{ textDecoration: 'none' }}>
                    <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
                    戻る（広告戦略へ）
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 施策追加モーダル */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>施策を追加</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '20px' }}
                aria-label="close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                  タイトル
                </label>
                <input className="form-input" placeholder="施策名を入力" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                  概要（100文字以内）
                </label>
                <textarea className="form-textarea" placeholder="概要を入力" rows={2}></textarea>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                  目的
                </label>
                <input className="form-input" placeholder="例：LTV向上" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                  期待効果
                </label>
                <input className="form-input" placeholder="例：継続率+10% など" />
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="secondary-button" onClick={() => setShowModal(false)}>
                キャンセル
              </button>
              <button className="primary-button">
                <i className="fas fa-save" style={{ marginRight: '8px' }}></i>
                追加する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* トースト通知 */}
      {showToast && (
        <div className={`toast-notification ${showToast ? 'show' : ''}`}>
          <i className="fas fa-check-circle"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

