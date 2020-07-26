import React from 'react'

import eraser from '../images/eraser.PNG';
import clear from '../images/clear.PNG';

export const Erase = ({ togglePopup, activeCursor, changeActive, clearPaint }) => (
  <div
    className="popup"
    onClick={() => togglePopup('popup-2')}
  >
    <button
      title="erase"
      className={`${activeCursor === 'erase' && 'active'}`}
    >
      <img src={eraser} alt="eraser" />
    </button>
    <span style={{ width: '150px' }} className="popupcontent reduce-width" id="popup-2">
      <button
        title="Eraser"
        className={`${activeCursor === 'erase' && 'active'} button`}
        onClick={() => changeActive('erase', 15)}>
        <img src={eraser} alt="eraser" />
      </button>
      <button
        title="Clear"
        className="button"
        onClick={clearPaint}>
        <img src={clear} alt="clear" />
      </button>
    </span>
  </div>
);
