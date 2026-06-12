import Container from "./Container";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>Ontario, Canada</p>
        <p>© Colophon Press</p>
        <p>
          <a href="https://instagram.com/expressed">Instagram</a>
          <span aria-hidden="true"> | </span>
          <a href="https://expressed.substack.com">Substack</a>
        </p>
      </Container>
    </footer>
  );
}
