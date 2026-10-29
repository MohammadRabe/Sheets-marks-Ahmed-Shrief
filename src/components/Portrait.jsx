export default function Portrait({ className, danger = false, furious = false }) {
  return (
    <div className={`${className}${danger ? " portrait-danger" : ""}${furious ? " portrait-furious" : ""}`}>
      <img className="portrait-image" src={danger ? "/images/teacher-pharaoh-angry.png" : "/images/teacher-pharaoh.png"} alt="" />
      <span className="eye-glow eye-glow-left" aria-hidden="true" />
      <span className="eye-glow eye-glow-right" aria-hidden="true" />
    </div>
  );
}
