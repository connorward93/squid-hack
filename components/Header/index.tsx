import Profile from "./Profile";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.container}>
      <div>Logo</div>
      <div>Search</div>
      <Profile />
    </header>
  );
}
