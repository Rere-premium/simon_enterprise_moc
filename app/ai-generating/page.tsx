'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function AIGeneratingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);

  useEffect(() => {
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
  }, [router]);

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
          background-color: #F9FAFB;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .slide-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          max-width: 600px;
          width: 100%;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 48px 40px;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .brain-icon {
          font-size: 60px;
          color: #005A9C;
          text-align: center;
          margin-bottom: 24px;
          animation: pulseGlowRotate 3s infinite;
        }

        .brain-icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          text-align: center;
          margin-bottom: 20px;
        }

        .status-text {
          font-size: 16px;
          color: #374151;
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.7;
        }

        .steps-container {
          margin-bottom: 32px;
        }

        .step {
          font-size: 16px;
          color: #4B5563;
          line-height: 1.7;
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          opacity: 0.7;
          transform: translateY(10px);
        }

        .step.active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s ease;
        }

        .step-number {
          background-color: #EEF6FF;
          padding: 0 4px;
          border-radius: 4px;
          margin-right: 4px;
        }

        .step-1 {
          animation: fadeStep 0.6s forwards 0.3s;
        }

        .step-2 {
          animation: fadeStep 0.6s forwards 1.2s;
        }

        .step-3 {
          animation: fadeStep 0.6s forwards 2.1s;
        }

        .check-icon {
          margin-left: 8px;
          color: #10B981;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .check-icon.visible {
          opacity: 1;
        }

        .modern-progress-container {
          width: 100%;
          height: 8px;
          background-color: #E5E7EB;
          border-radius: 4px;
          margin: 30px 0;
          overflow: hidden;
          position: relative;
        }

        .modern-progress-bar {
          height: 100%;
          width: ${progress}%;
          background-color: #005A9C;
          border-radius: 4px;
          position: absolute;
          top: 0;
          left: 0;
          transition: width 0.3s ease-in-out;
        }

        .time-estimate {
          font-size: 15px;
          color: #4B5563;
          text-align: center;
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 500;
        }

        .cancel-button-container {
          text-align: center;
          margin-top: 20px;
        }

        .cancel-button {
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
          border: 1px solid #D1D5DB;
        }

        .cancel-button:hover {
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
      <div className="slide-container">
        <div className="card">
          <div className="brain-icon-container">
            <div className="brain-icon">
              <i className="fas fa-brain"></i>
            </div>
          </div>
          <h1 className="title">AIがあなたの戦略を思考しています…</h1>
          <div className="status-text">
            AIが過去施策データと市場トレンドを照合し、戦略仮説を生成しています。<br />
            約5〜10秒で結果が表示されます。
          </div>
          <div className="steps-container">
            <div className={`step step-1 ${step1Complete ? 'active' : ''}`}>
              <p>
                <span className="step-number">1.</span> 市場カテゴリから競争軸と市場構造を解析しています
              </p>
              <i className={`fas fa-check-circle check-icon ${step1Complete ? 'visible' : ''}`}></i>
            </div>
            <div className={`step step-2 ${step2Complete ? 'active' : ''}`}>
              <p>
                <span className="step-number">2.</span> 類似業界の成功要因を抽出しています
              </p>
              <i className={`fas fa-check-circle check-icon ${step2Complete ? 'visible' : ''}`}></i>
            </div>
            <div className={`step step-3 ${step3Complete ? 'active' : ''}`}>
              <p>
                <span className="step-number">3.</span> 最適なセグメント・ターゲット・ポジション（STP）を設計しています
              </p>
              <i className={`fas fa-check-circle check-icon ${step3Complete ? 'visible' : ''}`}></i>
            </div>
          </div>
          <div className="modern-progress-container">
            <div className="modern-progress-bar"></div>
          </div>
          <div className="time-estimate">
            AI解析完了まで残り約{timeRemaining}秒
          </div>
          <div className="cancel-button-container">
            <button 
              className="cancel-button" 
              onClick={() => {
                router.push('/purpose-input');
              }}
            >
              中断して再入力へ戻る
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

