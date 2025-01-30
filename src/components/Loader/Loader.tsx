import React from "react";
import styles from "./loader.module.css";
const { loader } = styles;

const Loader: React.FC = () => {
  return <div className={loader}></div>;
};

export default Loader;
