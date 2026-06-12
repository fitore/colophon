import styles from "./editorial.module.css";

export default function SectionHeading({ label, intro }: { label: string; intro?: string }) {
  return (
    <div className={styles.sectionHeading}>
      <p className="eyebrow">{label}</p>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}
