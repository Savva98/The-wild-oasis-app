import React from "react";

type EmptyType = {
  resource: [];
};

function Empty({ resource }: EmptyType) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
