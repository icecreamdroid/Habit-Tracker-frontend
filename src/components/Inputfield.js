import React from "react";
import { TextField } from "@mui/material";
import { css, jsx } from "@emotion/react";
import styles from "./Inputfield.module.css";
function Inputfield(props) {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.input} htmlFor={props.name}>
          {props.text}
        </label>
        <TextField
          variant="filled"
          name={props.name}
          onChange={props.handleChange}
          type={props.type || "text"}
          className={styles.textField}
        />
      </div>
    </>
  );
}

export default Inputfield;
