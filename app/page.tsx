import PopularCollections from "@/components/PopularCollections";
import classes from "./page.module.css";

export default function Home() {
  return (
    // @ts-expect-error Server Component
    <PopularCollections />
  );
}
