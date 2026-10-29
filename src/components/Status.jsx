export default function Status({ message, kind }) {
  if (!message) return null;
  return <div className={`status ${kind || ""}`.trim()}>{message}</div>;
}
