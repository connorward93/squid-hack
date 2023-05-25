import { fetchCollections } from "@/lib/fetchCollections";
import Table from "./Table";
import classes from "./popular-collections.module.css";

export default async function PopularCollections() {
  const collections = await fetchCollections();

  return (
    <div className={classes.container}>
      <Table defaultCollections={collections} />
    </div>
  );
}
