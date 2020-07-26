import React from 'react'

import rectangle from '../images/rectangle.PNG';
import circle from '../images/circle.PNG';
import rectangleFill from '../images/rectangle-fill.PNG';
import circleFill from '../images/circle-fill.PNG';

const getSelectedShape = (activeCursor) => {
  switch (activeCursor) {
    case 'rect':
      return rectangle;
    case 'circle':
      return circle;
    case 'rect-fill':
      return rectangleFill;
    case 'circle-fill':
      return circleFill;
    default:
      return rectangle;
  }
}


export const Shape = ({ activeCursor, changeActive, togglePopup }) => (
  <div
    className="popup"
    onClick={() => togglePopup('popup-1')}
  >
    <button
      title="straight-line"
      className={`${(activeCursor === 'circle' || activeCursor === 'rect' || activeCursor === 'circle-fill' || activeCursor === 'rect-fill')
        && 'active'}`}
    >
      <img src={getSelectedShape(activeCursor)} alt="pencil" />
    </button>
    <span style={{ width: '250px' }} className="popupcontent" id="popup-1">
      <button
        title="Rectangle"
        className={`${activeCursor === 'rect' && 'active'} button`}
        onClick={() => changeActive('rect', 3)}>
        <img src={rectangle} alt="rectangle" />
      </button>
      <button
        title="Rectangle Fill"
        className={`${activeCursor === 'rect-fill' && 'active'} button`}
        onClick={() => changeActive('rect-fill', 3)}>
        <img src={rectangleFill} alt="rectangle-fill" />
      </button>
      <button
        title="Circle Fill"
        className={`${activeCursor === 'circle' && 'active'} button`}
        onClick={() => changeActive('circle', 3)}>
        <img src={circle} alt="circle" />
      </button>
      <button
        title="Circle"
        className={`${activeCursor === 'circle-fill' && 'active'} button`}
        onClick={() => changeActive('circle-fill', 3)}>
        <img src={circleFill} alt="circle-fill" />
      </button>
    </span>
  </div>
);
