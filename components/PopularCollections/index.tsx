import { fetchCollections } from "@/lib/fetchCollections";
import Table from "./Table";
import classes from "./popular-collections.module.css";

export default async function PopularCollections() {
  const collections = await fetchCollections();
  console.log(collections);
  return (
    <div>
      <Table defaultCollections={collections} />
    </div>
  );
}
