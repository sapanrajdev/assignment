import React, { useRef, useEffect } from 'react'

export const OpenText = ({ startX, startY, setText, handleCloseModal }) => {
  let { input } = useRef();

  useEffect(() => {
    if (input) input.focus();
  });
  return (
    <div style={{ left: startX - 20, top: startY - 100, position: 'absolute', width: '209px', border: '2px dashed #D6D6D6' }}>
      <input className="text" ref={ref => input = ref} placeholder="Type Here" onKeyUp={setText} type="text" />
      <span className="close" onClick={handleCloseModal}>X</span>
    </div>
  )
}