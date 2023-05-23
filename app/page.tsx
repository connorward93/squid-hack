import Image from "next/image";
import styles from "./page.module.css";
import PopularCollections from "@/components/PopularCollections";

export default function Home() {
  return (
    <main className={styles.main}>
      <PopularCollections />
    </main>
  );
}
