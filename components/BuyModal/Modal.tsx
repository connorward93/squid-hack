import { ReactNode } from "react";
import classes from "./buy-modal.module.css";

type ModalProps = {
  heading: string;
  children: ReactNode;
};

export default function Modal({ heading, children }: ModalProps) {
  return (
    <div className={classes.modal}>
      <div className={classes.header}>{heading}</div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
