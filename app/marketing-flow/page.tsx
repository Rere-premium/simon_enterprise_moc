'use client';

import { useState } from 'react';
import { Noto_Sans_JP } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MarketingFlowPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          background: #F9FAFB;
        }

        .slide-container {
          width: 1280px;
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          background: white;
        }

        .slide-content {
          flex: 1;
          display: flex;
          position: relative;
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

        .main-content {
          flex: 1;
          padding: 24px 8%;
          overflow-y: auto;
        }

        .content-layout {
          display: flex;
          gap: 24px;
        }

        .campaign-section {
          flex: 7;
        }

        .ai-panel-section {
          flex: 3;
        }

        .ai-panel {
          background: #F9FAFB;
          border-radius: 12px;
          padding: 20px;
          margin-top: 10px;
        }

        .ai-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 16px;
          margin-bottom: 20px;
        }

        .ai-card-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #E6E9EF;
        }

        .ai-section {
          padding: 18px 0;
          border-bottom: 1px solid #F0F0F0;
        }

        .ai-section:last-child {
          border-bottom: none;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 8px;
        }

        .kpi-item-card {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 8px;
          text-align: center;
        }

        .kpi-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          background: #F9FAFB;
          padding: 16px;
          border-radius: 8px;
          margin: 20px 0;
          justify-content: center;
        }

        .kpi-item {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          width: calc(25% - 12px);
          min-width: 100px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .execution-steps-section {
          margin-top: 48px;
          padding-top: 48px;
          border-top: 1px solid #E6E9EF;
        }

        .step-cards-container {
          display: flex;
          overflow-x: auto;
          padding-bottom: 16px;
          scroll-padding: 0 24px;
          gap: 16px;
          margin-bottom: 16px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .step-cards-container::-webkit-scrollbar {
          display: none;
        }

        .step-card {
          flex: 0 0 auto;
          width: 166px;
          height: 180px;
          border: 1px solid #E6E9EF;
          border-radius: 12px;
          padding: 16px;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .step-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .step-title {
          font-size: 11px;
          font-weight: 500;
          color: #6B7280;
          margin-bottom: 8px;
        }

        .step-status-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }

        .step-status-completed {
          background-color: #DCFCE7;
          color: #059669;
        }

        .step-status-in-progress {
          background-color: #E0F2FE;
          color: #005A9C;
        }

        .step-status-not-started {
          background-color: #F3F4F6;
          color: #9CA3AF;
        }

        .step-main-title {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          margin-top: 16px;
          margin-bottom: 8px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-icon {
          color: #005A9C;
          margin-right: 8px;
          font-size: 13px;
        }

        .step-description {
          font-size: 12px;
          color: #374151;
          line-height: 1.4;
          text-align: center;
          height: 45px;
          overflow: hidden;
        }

        .step-button {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          padding: 8px 0;
          background-color: #005A9C;
          color: white;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          text-align: center;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .step-button:hover {
          background-color: #0074CC;
        }

        .step-button-icon {
          margin-left: 4px;
          font-size: 10px;
        }

        .step-badge-new {
          background-color: #EEF7FF;
          color: #0070D1;
          font-weight: 500;
          margin-left: 4px;
          padding: 1px 4px;
          border-radius: 4px;
          font-size: 9px;
        }
      `}</style>
      <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      {isMenuOpen && (
        <div
          className={`sidebar-overlay ${!isMenuOpen ? '' : 'show'}`}
          onClick={toggleMenu}
        ></div>
      )}
      <div className="slide-container">
        <div className="slide-content">
          <Sidebar isOpen={isMenuOpen} />
          <div className="main-content">
            <div>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '8px',
                }}
              >
                Enterprise Lite AIマーケティングフロー
              </h1>
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#005A9C',
                  marginBottom: '4px',
                }}
              >
                最短時間で理想の広告戦略へ
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  lineHeight: '1.5',
                  marginBottom: '24px',
                }}
              >
                AIが戦略立案から広告設計までを一気通貫で支援します。各ステップをクリックして進めてください。
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#E5E7EB',
                  zIndex: 1,
                }}
              ></div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#D1FAE5',
                    border: '2px solid #059669',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <i className="fas fa-check fa-xs"></i>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    textAlign: 'center',
                    maxWidth: '80px',
                  }}
                >
                  目的入力
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#D1FAE5',
                    border: '2px solid #059669',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <i className="fas fa-check fa-xs"></i>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    textAlign: 'center',
                    maxWidth: '80px',
                  }}
                >
                  市場セグメント
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#005A9C',
                    borderColor: '#005A9C',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <p>3</p>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#111827',
                    textAlign: 'center',
                    fontWeight: '500',
                    maxWidth: '80px',
                  }}
                >
                  ターゲット選定
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'white',
                    border: '2px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <p>4</p>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    textAlign: 'center',
                    maxWidth: '80px',
                  }}
                >
                  価値提案・ポジション
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'white',
                    border: '2px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <p>5</p>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    textAlign: 'center',
                    maxWidth: '80px',
                  }}
                >
                  広告戦略
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'white',
                    border: '2px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <p>6</p>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    textAlign: 'center',
                    maxWidth: '80px',
                  }}
                >
                  LP改善
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'white',
                    border: '2px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px',
                    fontSize: '11px',
                  }}
                >
                  <p>7</p>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: '#6B7280',
                    textAlign: 'center',
                    maxWidth: '80px',
                  }}
                >
                  施策・実行
                </p>
              </div>
            </div>
            <div className="content-layout">
              <div className="campaign-section">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <p>マーケティングキャンペーン</p>
                  </h3>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 14px',
                      border: '1px solid #005A9C',
                      color: '#005A9C',
                      background: 'white',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                    <p>新規キャンペーン</p>
                  </button>
                </div>
                <div
                  style={{
                    position: 'relative',
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: '#005A9C',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                    }}
                  ></div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: '700',
                        color: '#111827',
                        fontSize: '16px',
                        marginLeft: '10px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <i
                        className="fas fa-calendar-alt"
                        style={{ color: '#005A9C', marginRight: '10px' }}
                      ></i>
                      <p>夏季プロモーション2025</p>
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>
                      最終更新: 2025/10/28
                    </p>
                  </div>
                  <div style={{ marginBottom: '20px', marginLeft: '10px' }}>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>
                      進行度: 75%
                    </p>
                    <div
                      style={{
                        width: '100%',
                        height: '4px',
                        background: '#E5E7EB',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          background: '#005A9C',
                          width: '75%',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '20px',
                      margin: '20px 0 20px 10px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                        CPA
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                        ¥1,200
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                        CTR
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                        2.4%
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                        CVR
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                        3.1%
                      </p>
                    </div>
                  </div>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 16px',
                      background: '#005A9C',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      width: 'fit-content',
                      marginLeft: 'auto',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <p>続きから再開</p>
                    <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                  </button>
                </div>
              </div>
              <div className="ai-panel-section">
                <div className="ai-card">
                  <div className="ai-card-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i
                        className="fas fa-lightbulb"
                        style={{ color: '#005A9C', marginRight: '8px', fontSize: '15px' }}
                      ></i>
                      <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                        AIインサイト
                      </p>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: '500', color: '#6B7280' }}>
                      （毎週自動更新）
                    </p>
                  </div>
                  <div className="ai-section">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i
                          className="fas fa-chart-bar"
                          style={{ color: '#005A9C', marginRight: '8px', fontSize: '14px' }}
                        ></i>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          KPIサマリー
                        </p>
                      </div>
                      <span className="status-badge badge-new">NEW</span>
                    </div>
                    <div className="kpi-grid">
                      <div className="kpi-item-card">
                        <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>
                          CPA
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                          ¥1,250
                        </p>
                      </div>
                      <div className="kpi-item-card">
                        <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>
                          CTR
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                          2.8%
                        </p>
                      </div>
                      <div className="kpi-item-card">
                        <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>
                          CVR
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                          3.5%
                        </p>
                      </div>
                      <div className="kpi-item-card">
                        <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>
                          ROAS
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                          320%
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#9CA3AF',
                        textAlign: 'right',
                        fontStyle: 'italic',
                        marginTop: '4px',
                      }}
                    >
                      ※ データリンク連携済みの場合のみ表示
                    </p>
                  </div>
                  <div className="ai-section">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i
                          className="fas fa-chart-line"
                          style={{ color: '#005A9C', marginRight: '8px', fontSize: '14px' }}
                        ></i>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          AIおすすめ施策
                        </p>
                      </div>
                      <p style={{ fontSize: '13px', fontWeight: '500', color: '#6B7280' }}>
                        （毎週更新）
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#374151',
                        lineHeight: '1.5',
                        margin: '8px 0',
                      }}
                    >
                      新規顧客獲得のCVR改善・予算増加を推奨します。
                    </p>
                    <button
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#005A9C',
                        color: 'white',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        width: '100%',
                        marginTop: '8px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <p>詳細を見る</p>
                      <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i>
                    </button>
                  </div>
                  <div className="ai-section">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i
                          className="fas fa-lightbulb"
                          style={{ color: '#005A9C', marginRight: '8px', fontSize: '14px' }}
                        ></i>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          LP改善インサイト
                        </p>
                      </div>
                      <p style={{ fontSize: '13px', fontWeight: '500', color: '#6B7280' }}>
                        （自動更新・NEW）
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#374151',
                        lineHeight: '1.5',
                        margin: '8px 0',
                      }}
                    >
                      最新LP評価の改善ポイントを表示します。AIが3つの改善ポイントを提示します。
                    </p>
                    <button
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#005A9C',
                        color: 'white',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        width: '100%',
                        marginTop: '8px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <p>改善提案を見る</p>
                      <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i>
                    </button>
                  </div>
                </div>
                <div className="ai-card">
                  <div className="ai-card-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i
                        className="fas fa-file-alt"
                        style={{ color: '#005A9C', marginRight: '8px', fontSize: '15px' }}
                      ></i>
                      <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                        AIレポート生成
                      </p>
                    </div>
                    <span className="status-badge badge-new">NEW</span>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#374151',
                      lineHeight: '1.5',
                      marginBottom: '12px',
                    }}
                  >
                    1クリックで最新の状況をまとめた自動レポートを生成します。
                  </p>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#005A9C',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: '700',
                      width: '100%',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <p>AIレポートを生成する</p>
                    <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                  </button>
                </div>
                <div className="ai-card" style={{ marginBottom: 0, padding: '12px 16px' }}>
                  <div className="ai-card-title" style={{ marginBottom: '10px', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i
                        className="fas fa-link"
                        style={{ color: '#005A9C', marginRight: '8px', fontSize: '15px' }}
                      ></i>
                      <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                        データリンク連携ステータス
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#374151',
                      lineHeight: '1.5',
                      marginBottom: '12px',
                    }}
                  >
                    🟢 GA4：接続済み ｜ ⚪ Meta Ads：未接続
                  </p>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#005A9C',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      width: '100%',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <p>連携を管理する</p>
                    <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="execution-steps-section">
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '12px',
                }}
              >
                Enterprise Lite AIマーケティングフロー - 実行ステップ
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  lineHeight: '1.5',
                  maxWidth: '900px',
                  marginBottom: '32px',
                }}
              >
                AIが戦略立案から広告設計までを一気通貫で支援します。各ステップをクリックして進めてください。
              </p>
              <div className="step-cards-container">
                <div className="step-card">
                  <p className="step-title">STEP 1</p>
                  <div className="step-status-badge step-status-completed">
                    <i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i>
                    <p>完了</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-bullseye step-icon"></i>
                    <p>目的・条件入力</p>
                  </h3>
                  <p className="step-description">ビジネスの目的と条件を設定します</p>
                  <button className="step-button">
                    <p>設定する</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
                <div className="step-card">
                  <p className="step-title">STEP 2</p>
                  <div className="step-status-badge step-status-completed">
                    <i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i>
                    <p>完了</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-chart-pie step-icon"></i>
                    <p>STP戦略自動生成</p>
                  </h3>
                  <p className="step-description">AIが最適なSTP戦略を自動生成します</p>
                  <button className="step-button">
                    <p>結果を見る</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
                <div className="step-card">
                  <p className="step-title">STEP 3</p>
                  <div className="step-status-badge step-status-in-progress">
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '4px' }}></i>
                    <p>作成中</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-ad step-icon"></i>
                    <p>広告戦略プレビュー</p>
                  </h3>
                  <p className="step-description">媒体別の広告戦略を自動でプレビューします</p>
                  <button className="step-button">
                    <p>戦略を見る</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
                <div className="step-card">
                  <p className="step-title">STEP 4</p>
                  <div className="step-status-badge step-status-not-started">
                    <i className="fas fa-circle" style={{ marginRight: '4px' }}></i>
                    <p>未開始</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-clipboard-list step-icon"></i>
                    <p>施策プラン自動生成</p>
                  </h3>
                  <p className="step-description">実行可能な施策プランをAIが提案します</p>
                  <button className="step-button">
                    <p>プランを見る</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
                <div className="step-card">
                  <p className="step-title">STEP 5</p>
                  <div className="step-status-badge step-status-not-started">
                    <i className="fas fa-circle" style={{ marginRight: '4px' }}></i>
                    <p>未開始</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-brain step-icon"></i>
                    <p>LP改善AI</p>
                  </h3>
                  <p className="step-description">AIがLPの構成・コピー・CTAを解析し改善提案します</p>
                  <button className="step-button">
                    <p>改善提案を見る</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
                <div className="step-card">
                  <p className="step-title">STEP 6</p>
                  <div className="step-status-badge step-status-not-started">
                    <i className="fas fa-circle" style={{ marginRight: '4px' }}></i>
                    <p>未開始</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-calendar-alt step-icon"></i>
                    <p>実行管理</p>
                  </h3>
                  <p className="step-description">実行ステータスと進捗を管理します</p>
                  <button className="step-button">
                    <p>管理画面へ</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
                <div className="step-card">
                  <p className="step-title">STEP 7</p>
                  <div className="step-status-badge step-status-not-started">
                    <i className="fas fa-circle" style={{ marginRight: '4px' }}></i>
                    <p>未開始</p>
                  </div>
                  <h3 className="step-main-title">
                    <i className="fas fa-file-alt step-icon"></i>
                    <p>AIレポート生成</p>
                    <span className="step-badge-new">NEW</span>
                  </h3>
                  <p className="step-description">AIが自動的にレポートを生成します</p>
                  <button className="step-button">
                    <p>レポートを見る</p>
                    <i className="fas fa-arrow-right step-button-icon"></i>
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#005A9C',
                    borderRadius: '50%',
                    margin: '0 4px',
                  }}
                ></div>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#E6E9EF',
                    borderRadius: '50%',
                    margin: '0 4px',
                  }}
                ></div>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#E6E9EF',
                    borderRadius: '50%',
                    margin: '0 4px',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

