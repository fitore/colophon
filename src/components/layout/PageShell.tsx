import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./PageShell.module.css";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
