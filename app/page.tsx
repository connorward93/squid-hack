import styles from "./page.module.css";
import PopularCollections from "@/components/PopularCollections";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* @ts-expect-error Server Component */}
      <PopularCollections />
    </main>
  );
}
