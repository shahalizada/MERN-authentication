import React from "react";

export default function errorNotice(props) {
  return (
    <div className="errors">
      <span>{props.errorMsg}</span>
      <button onClick={props.clearError}>X</button>
    </div>
  );
}
