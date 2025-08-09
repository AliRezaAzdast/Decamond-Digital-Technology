import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input ref={ref} className={styles.input} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
