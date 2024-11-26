import React from "react";
import { type ResponseProps } from "./ResponseSection.types";

function ResponseSection(props: ResponseProps) {
  if (props.showTable) {
    return (
      <div>
        <h3>Requested Gifts:</h3>
        <table>
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>Category</th>
              <th>Est. Price</th>
              <th>Potential Links</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h3>Letter:</h3>
      <p> Extended version written out</p>
    </div>
  );
}

export default ResponseSection;
