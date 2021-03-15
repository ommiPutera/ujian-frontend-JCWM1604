import React from "react";
import './style/button.css'

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      id='tombol'
      type={props.submit ? "submit" : "button"}
      className={props.className}
      style={{
        
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;