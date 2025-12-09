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
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGenerateStrategy = () => {
    setShowModal(true);
    setProgress(0);
    setTimeRemaining(5);
    setStep1Complete(false);
    setStep2Complete(false);
    setStep3Complete(false);
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

  useEffect(() => {
    if (!showModal) return;

    // ステップ1完了（0.9秒後）
    const timer1 = setTimeout(() => {
      setStep1Complete(true);
      setProgress(33);
    }, 900);

    // ステップ2完了（1.8秒後）
    const timer2 = setTimeout(() => {
      setStep2Complete(true);
      setProgress(66);
    }, 1800);

    // ステップ3完了（2.7秒後）
    const timer3 = setTimeout(() => {
      setStep3Complete(true);
      setProgress(75);
    }, 2700);

    // カウントダウン
    const countdown = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          // 5秒後にSTP戦略ページに遷移
          setTimeout(() => {
            router.push('/stp-strategy');
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(countdown);
    };
  }, [showModal, router]);

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
          color: #3E4650;
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

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-card {
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 48px 40px;
          animation: fadeInUp 0.8s ease-out forwards;
          position: relative;
        }

        .modal-brain-icon {
          font-size: 60px;
          color: #005A9C;
          text-align: center;
          margin-bottom: 24px;
          animation: pulseGlowRotate 3s infinite;
        }

        .modal-brain-icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          text-align: center;
          margin-bottom: 20px;
        }

        .modal-status-text {
          font-size: 16px;
          color: #374151;
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.7;
        }

        .modal-steps-container {
          margin-bottom: 32px;
        }

        .modal-step {
          font-size: 16px;
          color: #4B5563;
          line-height: 1.7;
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          opacity: 0.7;
          transform: translateY(10px);
        }

        .modal-step.active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s ease;
        }

        .modal-step-number {
          background-color: #EEF6FF;
          padding: 0 4px;
          border-radius: 4px;
          margin-right: 4px;
        }

        .modal-step-1 {
          animation: fadeStep 0.6s forwards 0.3s;
        }

        .modal-step-2 {
          animation: fadeStep 0.6s forwards 1.2s;
        }

        .modal-step-3 {
          animation: fadeStep 0.6s forwards 2.1s;
        }

        .modal-check-icon {
          margin-left: 8px;
          color: #10B981;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .modal-check-icon.visible {
          opacity: 1;
        }

        .modal-progress-container {
          width: 100%;
          height: 8px;
          background-color: #E5E7EB;
          border-radius: 4px;
          margin: 30px 0;
          overflow: hidden;
          position: relative;
        }

        .modal-progress-bar {
          height: 100%;
          background-color: #005A9C;
          border-radius: 4px;
          position: absolute;
          top: 0;
          left: 0;
          transition: width 0.3s ease-in-out;
        }

        .modal-time-estimate {
          font-size: 15px;
          color: #4B5563;
          text-align: center;
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 500;
        }

        .modal-cancel-button-container {
          text-align: center;
          margin-top: 20px;
        }

        .modal-cancel-button {
          display: inline-block;
          font-size: 14px;
          color: #6B7280;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 10px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          background: none;
          cursor: pointer;
        }

        .modal-cancel-button:hover {
          color: #005A9C;
          background-color: #F3F4F6;
          border-color: #005A9C;
        }

        @keyframes pulseGlowRotate {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: scale(1.05) rotate(5deg);
            opacity: 0.9;
          }
          50% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          75% {
            transform: scale(1.05) rotate(-5deg);
            opacity: 0.9;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeStep {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
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
              <div className="slide-content">
                <div className="main-content">
            <div className="content-wrapper">
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
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#005A9C', borderColor: '#005A9C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <p>3</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#111827', textAlign: 'center', fontWeight: '500', maxWidth: '80px' }}>ターゲット選定</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <p>4</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>価値提案・ポジション</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '11px' }}>
                    <p>5</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', maxWidth: '80px' }}>広告戦略</p>
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
            </div>
          </div>
        </div>
        </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-brain-icon-container">
              <div className="modal-brain-icon">
                <i className="fas fa-brain"></i>
              </div>
            </div>
            <h1 className="modal-title">AIがあなたの戦略を思考しています…</h1>
            <div className="modal-status-text">
              AIが過去施策データと市場トレンドを照合し、戦略仮説を生成しています。<br />
              約5〜10秒で結果が表示されます。
            </div>
            <div className="modal-steps-container">
              <div className={`modal-step modal-step-1 ${step1Complete ? 'active' : ''}`}>
                <p>
                  <span className="modal-step-number">1.</span> 市場カテゴリから競争軸と市場構造を解析しています
                </p>
                <i className={`fas fa-check-circle modal-check-icon ${step1Complete ? 'visible' : ''}`}></i>
              </div>
              <div className={`modal-step modal-step-2 ${step2Complete ? 'active' : ''}`}>
                <p>
                  <span className="modal-step-number">2.</span> 類似業界の成功要因を抽出しています
                </p>
                <i className={`fas fa-check-circle modal-check-icon ${step2Complete ? 'visible' : ''}`}></i>
              </div>
              <div className={`modal-step modal-step-3 ${step3Complete ? 'active' : ''}`}>
                <p>
                  <span className="modal-step-number">3.</span> 最適なセグメント・ターゲット・ポジション（STP）を設計しています
                </p>
                <i className={`fas fa-check-circle modal-check-icon ${step3Complete ? 'visible' : ''}`}></i>
              </div>
            </div>
            <div className="modal-progress-container">
              <div className="modal-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="modal-time-estimate">
              AI解析完了まで残り約{timeRemaining}秒
            </div>
            <div className="modal-cancel-button-container">
              <button 
                className="modal-cancel-button" 
                onClick={() => {
                  setShowModal(false);
                }}
              >
                中断して再入力へ戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

