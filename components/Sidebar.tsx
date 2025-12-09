'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      <style jsx>{`
        .sidebar {
          width: 220px;
          background: #FBFAF8;
          border-right: 1px solid #E5E5E5;
          padding-top: 10px;
          flex-shrink: 0;
          transition: transform 0.3s ease-in-out;
        }

        .sidebar.closed {
          transform: translateX(-100%);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 50;
        }

        @media (min-width: 1024px) {
          .sidebar.closed {
            transform: translateX(-100%);
            position: absolute;
          }
        }

        .mode-toggle {
          display: flex;
          background: #F3F4F6;
          border-radius: 8px;
          margin: 0 20px 20px;
          overflow: hidden;
        }

        .mode-tab {
          flex: 1;
          text-align: center;
          padding: 10px 8px;
          font-size: 12px;
          cursor: pointer;
          color: #6B7280;
        }

        .mode-tab.active {
          background: #005A9C;
          color: white;
          font-weight: 500;
        }

        .nav-label {
          font-size: 12px;
          font-weight: 500;
          color: #9CA3AF;
          padding: 0 20px;
          margin: 12px 0 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #4B5563;
          font-size: 13px;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-item.active {
          background: rgba(0, 90, 156, 0.1);
          color: #005A9C;
          border-left: 3px solid #005A9C;
          padding-left: 17px;
        }

        .nav-icon {
          margin-right: 12px;
          width: 16px;
          text-align: center;
        }

        .nav-divider {
          height: 1px;
          background: #E6E9EF;
          margin: 15px 20px;
        }

        .status-badge {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 6px;
          background: #F3F4F6;
          color: #6B7280;
          white-space: nowrap;
        }

        .badge-new {
          background: #EEF7FF;
          color: #0070D1;
          font-weight: 500;
        }
      `}</style>
      <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
        <div className="mode-toggle">
          <div className="mode-tab">
            <p>自分で進める</p>
          </div>
          <div className="mode-tab active">
            <p>AIに戦略を任せる</p>
          </div>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#005A9C',
            color: 'white',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '13px',
            fontWeight: '700',
            margin: '0 20px 16px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <p>AIに戦略を任せる</p>
        </button>
        <div style={{ marginBottom: '20px' }}>
          <p className="nav-label">インサイト</p>
          <div style={{ marginBottom: '16px' }}>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-lightbulb"></i>
              </span>
              <p>AIインサイト（毎週更新）</p>
            </div>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-chart-bar"></i>
              </span>
              <p>KPIサマリー</p>
              <span className="status-badge badge-new">NEW</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-file-alt"></i>
              </span>
              <p>AIレポート生成</p>
              <span className="status-badge badge-new">NEW</span>
            </div>
          </div>
          <p className="nav-label">戦略フロー</p>
          <div style={{ marginBottom: '16px' }}>
            <Link href="/purpose-input" style={{ textDecoration: 'none' }}>
              <div className={`nav-item ${pathname === '/purpose-input' ? 'active' : ''}`}>
                <span className="nav-icon">
                  <i className="fas fa-bullseye"></i>
                </span>
                <p>目的・条件入力</p>
              </div>
            </Link>
            <Link href="/stp-strategy" style={{ textDecoration: 'none' }}>
              <div className={`nav-item ${pathname === '/stp-strategy' ? 'active' : ''}`}>
                <span className="nav-icon">
                  <i className="fas fa-chart-pie"></i>
                </span>
                <p>STP戦略自動生成</p>
              </div>
            </Link>
            <Link href="/ad-strategy-preview" style={{ textDecoration: 'none' }}>
              <div className={`nav-item ${pathname === '/ad-strategy-preview' ? 'active' : ''}`}>
                <span className="nav-icon">
                  <i className="fas fa-ad"></i>
                </span>
                <p>広告戦略プレビュー</p>
              </div>
            </Link>
            <Link href="/strategy-plan" style={{ textDecoration: 'none' }}>
              <div className={`nav-item ${pathname === '/strategy-plan' ? 'active' : ''}`}>
                <span className="nav-icon">
                  <i className="fas fa-clipboard-list"></i>
                </span>
                <p>施策プラン・広告設計</p>
              </div>
            </Link>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-chart-line"></i>
              </span>
              <p>LP改善インサイト</p>
            </div>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-user-group"></i>
              </span>
              <p>実行支援パートナー</p>
            </div>
          </div>
          <div className="nav-divider"></div>
          <p className="nav-label">実行支援機能</p>
          <div style={{ marginBottom: '16px' }}>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-link"></i>
              </span>
              <p>Data Link</p>
            </div>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-user-group"></i>
              </span>
              <p>AIパートナー検索</p>
            </div>
            <div className="nav-item">
              <span className="nav-icon">
                <i className="fas fa-book"></i>
              </span>
              <p>操作ガイド</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

