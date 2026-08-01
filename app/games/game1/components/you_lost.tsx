interface LocationPromptProps {
  onAllow: () => void;
  lf: boolean;
}

export default function LocationPrompt({ onAllow, lf }: LocationPromptProps) {
  const css = `
    .location-modal {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 1000;
    }

    .location-card {
      width: 420px;
      max-width: 90vw;
      padding: 30px;
      border-radius: 24px;
      background: rgba(248, 1, 1, 0.46);
      border: 1px solid rgba(255, 0, 0, 0.32);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 0 40px rgb(124, 0, 0), inset 0 0 30px rgba(255, 0, 0, 0.52);
      color: #00ff88;
      font-family: monospace;
    }

    .location-card h2 {
      margin: 0 0 15px;
      font-size: 34px;
      text-shadow: 0 0 18px #ff0000;
    }

    .location-card button {
      margin-top: 28px;
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 14px;
      background: linear-gradient(135deg, #00ff66, #00c853);
      color: #001a00;
      font-family: inherit;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
    }

    .location-card button:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 20px rgba(0, 255, 100, 0.45);
    }
  `;

  const headingText = lf ? "YOU LOST" : "YOU LOST";

  return (
    <div>
      <style>{css}</style>
      <div className="location-modal">
        <div className="location-card">
          <h2 style={{ color: "#ff0000" }}>{headingText}</h2>
          <button type="button" onClick={() => onAllow()}>
            Replay?
          </button>
        </div>
      </div>
    </div>
  );
}