import Image from "next/image";
import styles from "./FramedPlateImage.module.css";

interface FramedPlateImageProps {
  src?: string;
  alt: string;
  portrait?: boolean;
  priority?: boolean;
}

export default function FramedPlateImage({
  src,
  alt,
  portrait = false,
  priority = false,
}: FramedPlateImageProps) {
  return (
    <div className={`${styles.frame} ${portrait ? styles.portrait : ""}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 48rem) 90vw, 42vw" className={styles.image} />
      ) : (
        <span className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  );
}
