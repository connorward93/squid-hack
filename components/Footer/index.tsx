import classes from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.container}>
      <div>
        <a href="https://github.com/connorward93/squid-hack">
          Github repository↗
        </a>
      </div>
    </footer>
  );
}
