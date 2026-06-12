import styles from "./RuleWithMark.module.css";

export default function RuleWithMark() {
  return (
    <div className={styles.rule} aria-hidden="true">
      <span className={styles.mark}>✦</span>
    </div>
  );
}
