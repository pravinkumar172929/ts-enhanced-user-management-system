import React from "react";
import styles from "./error.module.css";

const { error } = styles;

interface ErrorProps {
  message: string | null;
}

const Error: React.FC<ErrorProps> = ({ message = `Something went wrong` }) => {
  return <div className={error}>{message}</div>;
};

export default Error;
