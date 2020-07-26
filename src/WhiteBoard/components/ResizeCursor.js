import React from 'react'

export const ResizeCursor = ({ size, increment, decrement }) => (
  <div className="size">
    <button
      title="decrease size"
      className="button"
      onClick={decrement}> - </button>
    <span id="number">{size}</span>
    <button
      className="button"
      title="increase size"
      onClick={increment}> + </button>
  </div>
);
