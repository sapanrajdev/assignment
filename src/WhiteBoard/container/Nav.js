import React, { useRef } from 'react';
import { ColorPicker, Line, Shape, Text, Erase, ResizeCursor } from '../components';
import fullscreenImg from '../images/fullscreen.PNG';
import closescreen from '../images/closescreen.PNG';
import { paintUtils } from '../utils/paint.utils';

export const Nav = props => {

  const img = useRef();

  const fullscreen = () => {
    const element = document.getElementById('paint');
    if (paintUtils.isFullScreenCurrently()) {
      paintUtils.closeFullscreen();
      img.current.src = fullscreenImg;
    }
    else {
      paintUtils.openFullscreen(element);
      img.current.src = closescreen;
    }
  };

  return (
    <nav>
      <ul className="all-buttons tab-inline p-0">
        <li className="tab-inline-item">
          <ColorPicker {...props} />
        </li>

        <li className="tab-inline-item">
          <Line {...props} />
        </li>

        <li className="tab-inline-item">
          <Shape {...props} />
        </li>

        <li className="tab-inline-item">
          <Text {...props} />
        </li>

        <li className="tab-inline-item">
          <Erase {...props} />
        </li>

        <li className="tab-inline-item">
          <ResizeCursor {...props} />
        </li>

        <li className="tab-inline-item">
          <button
            title="Full screen"
            onClick={fullscreen}>
            <img
              ref={img}
              alt="fullscreen"
              src={fullscreenImg} />
          </button>
        </li>

      </ul>
    </nav>
  )
}