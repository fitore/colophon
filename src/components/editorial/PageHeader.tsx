import FramedPlateImage from "@/components/ui/FramedPlateImage";
import styles from "./editorial.module.css";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro: string;
  note?: string;
  image?: string;
  imageAlt?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  intro,
  note,
  image,
  imageAlt = "",
}: PageHeaderProps) {
  return (
    <header className={`${styles.section} ${styles.pageHeader}`}>
      <div className={styles.headerCopy}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageIntro}>{intro}</p>
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
      {image ? <FramedPlateImage src={image} alt={imageAlt} priority /> : null}
    </header>
  );
}
