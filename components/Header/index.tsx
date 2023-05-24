import Profile from "./Profile";
import Link from "next/link";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.container}>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <div>Search</div>
      <Profile />
    </header>
  );
}
