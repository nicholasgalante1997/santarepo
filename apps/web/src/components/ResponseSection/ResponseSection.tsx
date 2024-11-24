import React from 'react'
import { type ResponseProps } from './ResponseSection.types';

function ResponseSection(props: ResponseProps) {
  if (props.showTable) {
    return (
      <div>
        <h3>Requested Gifts:</h3>
        <table>
          <th>
            <tr>
              <td>Num</td>
              <td>Name</td>
              <td>Category</td>
              <td>Est. Price</td>
              <td>Potential Links</td>
            </tr>
          </th>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h3>Letter:</h3>
      <p> Extended version written out</p>
    </div>
  )
}

export default ResponseSection;