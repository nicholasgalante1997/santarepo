import React from 'react'
import { type ControlProps } from './ControlButtons.types';

function ControlButtons(props: ControlProps) {
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", margin: "1rem 0" }}>
      <button
        className={props.showTable ? "button-primary" : "button-outline"}
        onClick={() => props.setShowTable(true)}
      >
        Itemize
      </button>
      <button
        className={props.showTable ? "button-outline" : "button-primary"}
        onClick={() => props.setShowTable(false)}
      >
        Translate
      </button>
    </div>
  )
}

export default ControlButtons;