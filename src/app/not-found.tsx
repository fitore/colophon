import CtaLink from "@/components/ui/CtaLink";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={editorial.section}>
      <p className="eyebrow">404 · Missing leaf</p>
      <h1>That page is not in the record.</h1>
      <div className={styles.action}>
        <CtaLink href="/">Return home</CtaLink>
      </div>
    </section>
  );
}
