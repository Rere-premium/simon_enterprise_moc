'use client';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  return (
    <>
      <style jsx>{`
        .header {
          width: 100%;
          background: white;
          border-bottom: 1px solid #E6E9EF;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-toggle-button {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #F9FAFB;
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .menu-toggle-button:hover {
          background-color: #F3F4F6;
          color: #005A9C;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          color: #005A9C;
          cursor: pointer;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-link {
          font-size: 14px;
          color: #4B5563;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .nav-link:hover {
          background-color: #F9FAFB;
          color: #005A9C;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon-button {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          background: #F9FAFB;
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .header-icon-button:hover {
          background-color: #F3F4F6;
          color: #005A9C;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          background: #F9FAFB;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .user-menu:hover {
          background-color: #F3F4F6;
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #005A9C;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .user-name {
          font-size: 14px;
          color: #111827;
          font-weight: 500;
        }
      `}</style>
      <header className="header">
        <div className="header-left">
          <button className="menu-toggle-button" onClick={onMenuToggle} title="メニュー">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className="logo">simon</div>
          <nav className="header-nav">
            <a href="/marketing-flow" className="nav-link">
              ダッシュボード
            </a>
            <a href="#" className="nav-link">
              キャンペーン
            </a>
            <a href="#" className="nav-link">
              レポート
            </a>
            <a href="#" className="nav-link">
              設定
            </a>
          </nav>
        </div>
        <div className="header-right">
          <button className="header-icon-button" title="通知">
            <i className="fas fa-bell"></i>
          </button>
          <button className="header-icon-button" title="ヘルプ">
            <i className="fas fa-question-circle"></i>
          </button>
          <div className="user-menu">
            <div className="user-avatar">U</div>
            <span className="user-name">ユーザー</span>
            <i className="fas fa-chevron-down" style={{ fontSize: '12px', color: '#6B7280' }}></i>
          </div>
        </div>
      </header>
    </>
  );
}

