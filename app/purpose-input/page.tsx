'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Noto_Sans_JP } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function PurposeInputPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGenerateStrategy = () => {
    router.push('/ai-generating');
  };

  const selectChip = (chipText: string) => {
    setSelectedChips((prev) =>
      prev.includes(chipText)
        ? prev.filter((c) => c !== chipText)
        : [...prev, chipText]
    );
  };

  useEffect(() => {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach((slider) => {
      const input = slider as HTMLInputElement;
      input.value = '5';
      const activeTrack = input.parentElement?.querySelector('.slider-active') as HTMLElement;
      if (activeTrack) {
        activeTrack.style.width = '50%';
      }

      input.addEventListener('input', function () {
        const value = parseInt(this.value);
        const max = parseInt(this.max);
        const widthPercentage = (value / max) * 100;
        const activeTrack = this.parentElement?.querySelector('.slider-active') as HTMLElement;
        if (activeTrack) {
          activeTrack.style.width = widthPercentage + '%';
        }
      });
    });
  }, [activeTab]);

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
          background: #FAFAF9;
          color: #3E4650;
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

        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .tab {
          cursor: pointer;
          padding: 12px 24px;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .tab.active {
          color: #0D6EFD;
          border-bottom: 3px solid #0D6EFD;
          font-weight: 600;
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
        }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-field {
          border: 1px solid #E6E9EF;
          border-radius: 6px;
          padding: 10px 14px;
          width: 100%;
          background-color: white;
          transition: border-color 0.3s;
          font-family: ${notoSansJP.style.fontFamily}, sans-serif;
        }

        .input-field:focus {
          border-color: #0D6EFD;
          outline: none;
        }

        .slider-container {
          position: relative;
          margin-top: 10px;
          margin-bottom: 24px;
        }

        .slider-track {
          height: 5px;
          background-color: #E5E7EB;
          border-radius: 3px;
          position: relative;
        }

        .slider-tick {
          position: absolute;
          top: -4px;
          width: 2px;
          height: 12px;
          background-color: #9CA3AF;
        }

        .slider-tick.left {
          left: 0;
        }

        .slider-tick.middle {
          left: 50%;
          transform: translateX(-50%);
        }

        .slider-tick.right {
          right: 0;
        }

        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 3px;
          background: transparent;
          outline: none;
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #0D6EFD;
          cursor: pointer;
          position: relative;
          z-index: 2;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #0D6EFD;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .slider-active {
          position: absolute;
          height: 5px;
          background-color: rgba(13, 110, 253, 0.5);
          border-radius: 3px;
          top: 0;
          left: 0;
        }

        .ai-hint {
          color: #6B7280;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
        }

        .ai-icon {
          color: #A7C5E3;
          font-size: 14px;
          margin-right: 4px;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-top: 8px;
        }

        .slider-label {
          color: #606060;
          font-size: 12px;
        }

        .slider-label.middle {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: #9CA3AF;
          font-size: 11px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-family: ${notoSansJP.style.fontFamily}, sans-serif;
        }

        .btn-primary {
          background-color: #0D6EFD;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0b5ed7;
        }

        .target-chip {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          background-color: #F4F6F8;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .target-chip:hover {
          background-color: #E6E9EF;
        }

        .target-chip.selected {
          background-color: #0D6EFD;
          color: white;
        }

        .target-chip.selected::after {
          content: '✓';
          font-size: 12px;
          margin-left: 4px;
        }

        .ai-tooltip {
          position: absolute;
          bottom: -40px;
          left: 0;
          background-color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 12px;
          display: none;
          width: 220px;
          z-index: 10;
        }

        .target-chip:hover .ai-tooltip {
          display: block;
        }

        .target-chip.selected .ai-tooltip {
          display: block;
        }

        .ai-assistant {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
          border-radius: 20px;
          padding: 18px;
          max-width: 300px;
        }

        .ai-message {
          margin-bottom: 8px;
          font-size: 13px;
        }

        .radio-group {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .radio-input {
          margin-right: 6px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .action-area {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #E6E9EF;
        }

        .tab-container {
          flex: 1;
          min-height: 0;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .ai-progress {
          display: inline-flex;
          align-items: center;
          margin-left: 6px;
        }

        .ai-progress-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #0D6EFD;
          margin-right: 2px;
          animation: pulseDot 2s infinite;
        }

        .ai-progress-dot:nth-child(2) {
          animation-delay: 0.5s;
        }

        .ai-progress-dot:nth-child(3) {
          animation-delay: 1s;
        }

        @keyframes pulseDot {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
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
            <div className="content-wrapper">
              <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
                AI戦略条件の設定
              </h1>
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #E5E7EB',
                  marginBottom: '24px',
                }}
              >
                <div
                  className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tab1')}
                >
                  AI戦略の方向性（市場 × ポジションの自動分析）
                </div>
                <div
                  className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tab2')}
                >
                  AI施策条件の最適化
                </div>
              </div>
              <div className="tab-container">
                {activeTab === 'tab1' && (
                  <div className="tab-content active">
                    <div className="input-group">
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                        市場カテゴリ
                      </label>
                      <div className="radio-group">
                        <label className="radio-label">
                          <input
                            className="radio-input"
                            name="market-category"
                            type="radio"
                            value="b2c"
                            defaultChecked
                          />
                          <p>B2C</p>
                        </label>
                        <label className="radio-label">
                          <input
                            className="radio-input"
                            name="market-category"
                            type="radio"
                            value="b2b"
                          />
                          <p>B2B</p>
                        </label>
                      </div>
                    </div>
                    <div className="input-grid">
                      <div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            業種カテゴリ
                          </label>
                          <select className="input-field">
                            <option value="">選択してください</option>
                            <option value="beauty">美容</option>
                            <option value="education">教育</option>
                            <option value="saas">SaaS</option>
                            <option value="retail">小売</option>
                            <option value="finance">金融</option>
                          </select>
                          <p className="ai-hint">例：美容／SaaS など</p>
                        </div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            商品カテゴリ
                          </label>
                          <input
                            className="input-field"
                            placeholder="例：オンライン英会話サービス／スキンケア"
                            type="text"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            ブランドトーン
                          </label>
                          <select className="input-field">
                            <option value="">選択してください</option>
                            <option value="luxury">高級・プレミアム</option>
                            <option value="casual">カジュアル・親しみやすい</option>
                            <option value="trustworthy">信頼型・専門的</option>
                            <option value="innovative">革新的・先進的</option>
                          </select>
                          <p className="ai-hint">例：高級／カジュアル／信頼型など</p>
                        </div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            訴求目的
                          </label>
                          <select className="input-field">
                            <option value="">選択してください</option>
                            <option value="awareness">認知拡大</option>
                            <option value="conversion">コンバージョン獲得</option>
                            <option value="retention">顧客維持・再来促進</option>
                          </select>
                          <p className="ai-hint">例：認知拡大・CV獲得・再来促進 など</p>
                        </div>
                      </div>
                    </div>
                    <div className="input-group full-width">
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                        ポジショニング方向性
                      </label>
                      <div className="slider-container" style={{ marginBottom: '20px' }}>
                        <p style={{ fontSize: '14px', marginBottom: '4px' }}>価格軸</p>
                        <div className="slider-track">
                          <div className="slider-tick left"></div>
                          <div className="slider-tick middle"></div>
                          <div className="slider-tick right"></div>
                          <div className="slider-active" style={{ width: '50%' }}></div>
                        </div>
                        <input className="slider" max="10" min="0" type="range" defaultValue="5" />
                        <p className="ai-hint">
                          AIが最適ポジションを判断するために使用します
                          <span className="ai-progress">
                            <span className="ai-progress-dot"></span>
                            <span className="ai-progress-dot"></span>
                            <span className="ai-progress-dot"></span>
                          </span>
                        </p>
                        <div className="slider-labels">
                          <span className="slider-label">低価格</span>
                          <span className="slider-label middle">中価格</span>
                          <span className="slider-label">高価格</span>
                        </div>
                      </div>
                      <div className="slider-container" style={{ marginBottom: '20px' }}>
                        <p style={{ fontSize: '14px', marginBottom: '4px' }}>差別化軸</p>
                        <div className="slider-track">
                          <div className="slider-tick left"></div>
                          <div className="slider-tick middle"></div>
                          <div className="slider-tick right"></div>
                          <div className="slider-active" style={{ width: '50%' }}></div>
                        </div>
                        <input className="slider" max="10" min="0" type="range" defaultValue="5" />
                        <p className="ai-hint">
                          AIが最適ポジションを判断するために使用します
                          <span className="ai-progress">
                            <span className="ai-progress-dot"></span>
                            <span className="ai-progress-dot"></span>
                            <span className="ai-progress-dot"></span>
                          </span>
                        </p>
                        <div className="slider-labels">
                          <span className="slider-label">機能重視</span>
                          <span className="slider-label middle">バランス型</span>
                          <span className="slider-label">ブランド重視</span>
                        </div>
                      </div>
                      <div className="slider-container">
                        <p style={{ fontSize: '14px', marginBottom: '4px' }}>市場戦略軸</p>
                        <div className="slider-track">
                          <div className="slider-tick left"></div>
                          <div className="slider-tick middle"></div>
                          <div className="slider-tick right"></div>
                          <div className="slider-active" style={{ width: '50%' }}></div>
                        </div>
                        <input className="slider" max="10" min="0" type="range" defaultValue="5" />
                        <p className="ai-hint">
                          AIが最適ポジションを判断するために使用します
                          <span className="ai-progress">
                            <span className="ai-progress-dot"></span>
                            <span className="ai-progress-dot"></span>
                            <span className="ai-progress-dot"></span>
                          </span>
                        </p>
                        <div className="slider-labels">
                          <span className="slider-label">ニッチ市場</span>
                          <span className="slider-label middle">拡大型</span>
                          <span className="slider-label">メジャー市場</span>
                        </div>
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                        理想顧客像
                      </label>
                      <textarea
                        className="input-field"
                        placeholder="例：20〜30代女性／美容投資意識高い／都市部居住"
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                )}
                {activeTab === 'tab2' && (
                  <div className="tab-content active">
                    <div className="input-grid">
                      <div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            対象地域
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select className="input-field">
                              <option value="">地域を選択</option>
                              <option value="nationwide">全国</option>
                              <option value="tokyo">東京都</option>
                              <option value="osaka">大阪府</option>
                              <option value="nagoya">愛知県</option>
                              <option value="other">その他地域</option>
                            </select>
                            <span
                              style={{
                                position: 'absolute',
                                right: '12px',
                                top: '12px',
                              }}
                              className="ai-icon"
                            >
                              ⚙️
                            </span>
                          </div>
                        </div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            期間
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select className="input-field">
                              <option value="">期間を選択</option>
                              <option value="1month">1ヶ月</option>
                              <option value="3months">3ヶ月</option>
                              <option value="6months">6ヶ月</option>
                              <option value="1year">1年</option>
                            </select>
                            <span
                              style={{
                                position: 'absolute',
                                right: '12px',
                                top: '12px',
                              }}
                              className="ai-icon"
                            >
                              ⚙️
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            月予算
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select className="input-field">
                              <option value="">予算を選択</option>
                              <option value="small">~50万円</option>
                              <option value="medium">50~200万円</option>
                              <option value="large">200~500万円</option>
                              <option value="enterprise">500万円~</option>
                            </select>
                            <span
                              style={{
                                position: 'absolute',
                                right: '12px',
                                top: '12px',
                              }}
                              className="ai-icon"
                            >
                              ⚙️
                            </span>
                          </div>
                        </div>
                        <div className="input-group">
                          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                            主要KPI
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select className="input-field">
                              <option value="">KPIを選択</option>
                              <option value="cpa">CPA（獲得単価）</option>
                              <option value="roas">ROAS（投資対効果）</option>
                              <option value="ctr">CTR（クリック率）</option>
                              <option value="cpm">CPM（露出単価）</option>
                              <option value="conversion">コンバージョン数</option>
                            </select>
                            <span
                              style={{
                                position: 'absolute',
                                right: '12px',
                                top: '12px',
                              }}
                              className="ai-icon"
                            >
                              ⚙️
                            </span>
                          </div>
                          <p className="ai-hint">例：CV数／ROAS／LTV</p>
                        </div>
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                        ターゲット状態（複数選択可）
                      </label>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                        購入ステージに合わせて複数選択できます
                      </p>
                      <div style={{ marginTop: '12px' }}>
                        {['認知前', '情報収集中', '比較中', '乗換検討中', 'ロイヤル顧客'].map(
                          (chip) => (
                            <div
                              key={chip}
                              className={`target-chip ${selectedChips.includes(chip) ? 'selected' : ''}`}
                              onClick={() => selectChip(chip)}
                            >
                              {chip}
                              <div className="ai-tooltip">
                                {chip === '認知前' && 'ブランド想起を高める施策を提案します'}
                                {chip === '情報収集中' && 'AIが情報提供型広告を提案します'}
                                {chip === '比較中' && 'CVR最適化重視の戦略を提示します'}
                                {chip === '乗換検討中' && 'AIが競合対策を含めた提案をします'}
                                {chip === 'ロイヤル顧客' && 'AIがリテンション施策を提案します'}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="action-area">
                <button className="btn btn-primary" onClick={handleGenerateStrategy}>
                  AI戦略を生成する
                </button>
                <p style={{ marginTop: '16px', color: '#6B7280' }}>
                  入力内容をもとに、AIが市場構造を解析し、最適な戦略を自動生成します。
                </p>
              </div>
              <div className="ai-assistant">
                <div className="ai-message">STP情報を分析しています…</div>
                <div className="ai-message">入力内容を基に戦略案を生成します</div>
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
                  <div className="step-status-badge step-status-in-progress">
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '4px' }}></i>
                    <p>作成中</p>
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
                  <div className="step-status-badge step-status-not-started">
                    <i className="fas fa-circle" style={{ marginRight: '4px' }}></i>
                    <p>未開始</p>
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
                  <div className="step-status-badge step-status-not-started">
                    <i className="fas fa-circle" style={{ marginRight: '4px' }}></i>
                    <p>未開始</p>
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

