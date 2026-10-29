import { STAGES } from "../config.js";

export default function StageButton({ stageKey, symbol, subtitle, onChoose }) {
  return (
    <button className="stage-card" type="button" onClick={() => onChoose(stageKey)}>
      <span className="stage-symbol">{symbol}</span>
      <strong>{STAGES[stageKey].name}</strong>
      <small>{subtitle}</small>
    </button>
  );
}
