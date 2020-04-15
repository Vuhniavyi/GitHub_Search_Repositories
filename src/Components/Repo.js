import React from "react";

const Repo = (props) => (
  <p className="oneRepo">
    <a href={props.url} target="_BLANK" rel="noopener noreferrer">
      {props.name}
    </a>
  </p>
);

export default Repo;
