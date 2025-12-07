'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function LoginPage() {
  const router = useRouter();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const particleCount = 30;
    const particlesContainer = particlesRef.current;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      particlesContainer.appendChild(particle);
    }
  }, []);

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
          background-color: #1F5076;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
        }

        .login-container {
          width: 1280px;
          min-height: 720px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .content {
          z-index: 1;
          text-align: center;
          width: 100%;
          padding: 20px;
          position: relative;
        }

        .logo {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .beta-tag {
          display: inline-block;
          color: #D1E4FF;
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 4px;
          margin-top: 8px;
        }

        .message-box {
          background-color: rgba(62, 70, 80, 0.7);
          border-radius: 12px;
          border: 1px solid #FFFFFF;
          padding: 28px;
          max-width: 800px;
          margin: 30px auto;
          line-height: 1.6;
          font-size: 16px;
          font-weight: 500;
        }

        .input-area {
          max-width: 400px;
          margin: 0 auto;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid #E6E9EF;
          border-radius: 8px;
          font-family: ${notoSansJP.style.fontFamily}, sans-serif;
          background-color: white;
          color: black;
        }

        input::placeholder {
          color: #999;
        }

        .login-button {
          width: 100%;
          padding: 14px;
          background-color: #005A9C;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 24px;
        }

        .login-button:hover {
          background-color: #0074CC;
        }

        .contact-button {
          width: 100%;
          padding: 10px;
          background-color: white;
          color: #005A9C;
          border: 1px solid #005A9C;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 20px;
        }

        .contact-button:hover {
          background-color: #F0F7FF;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          z-index: 0;
        }
      `}</style>
      <div className="login-container">
        <div id="particles" ref={particlesRef}></div>
        <div className="content">
        <div className="logo">simon</div>
        <div className="beta-tag">Enterprise Lite β</div>
        <div className="message-box">
          <p>戦略の自動化から、意思決定の自律化へ。</p>
          <br />
          <p>
            simon Enterprise Liteは、マーケティング戦略設計から広告配信設計までをAIが一体で自動化。
          </p>
          <p>あなたの意思決定をより速く、より正確に。</p>
          <br />
          <p>すべてのマーケティング判断に、AIというもうひとつの頭脳を。</p>
        </div>
        <div className="input-area">
          <input placeholder="メールアドレス" type="email" />
          <input placeholder="パスワード" type="password" />
          <button
            className="login-button"
            onClick={() => router.push('/marketing-flow')}
          >
            ログイン
          </button>
          <button className="contact-button">法人お問い合わせはこちら</button>
        </div>
      </div>
      </div>
    </>
  );
}

