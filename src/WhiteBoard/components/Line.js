import React from 'react'

import pencil from '../images/pencil.PNG';
import straightLine from '../images/straight-line.PNG';
import arrow from '../images/arrow.PNG';


const getSelectedPencil = (activeCursor) => {
  switch (activeCursor) {
    case 'pencil':
      return pencil;
    case 'straight-line':
      return straightLine;
    case 'arrow':
      return arrow;
    default:
      return pencil;
  }
}

export const Line = ({ activeCursor, changeActive, togglePopup }) => (
  <div
    className="popup"
    onClick={() => togglePopup('popup')}
  >
    <button
      title="straight-line"
      className={`${(activeCursor === 'straight-line' || activeCursor === 'pencil' || activeCursor === 'arrow')
        && 'active'}`}
    >
      <img src={getSelectedPencil(activeCursor)} alt="pencil" />
    </button>
    <span className="popupcontent" id="popup">
      <button
        title="straight-line"
        className={`${activeCursor === 'straight-line' && 'active'} button`}
        onClick={() => changeActive('straight-line', 3)}>
        <img src={straightLine} alt="straight-line" />
      </button>
      <button
        title="Pencil"
        className={`${activeCursor === 'pencil' && 'active'} button`}
        onClick={() => changeActive('pencil', 3)}>
        <img src={pencil} alt="pencil" />
      </button>
      <button
        title="Arrow"
        className={`${activeCursor === 'arrow' && 'active'} button`}
        onClick={() => changeActive('arrow', 3)}>
        <img src={arrow} alt="arrow" />
      </button>
    </span>
  </div>
);
