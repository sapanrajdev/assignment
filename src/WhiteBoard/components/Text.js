import React from 'react'

import text from '../images/text.PNG';
import { OpenText } from '.';

export const Text = ({ activeCursor, changeActive, openModal, ...props }) => (
  <>
    <button
      title="text"
      onClick={() => changeActive('text', 3)}
      className={`${activeCursor === 'text' && 'active'}`}
    >
      <img src={text} alt="text" />
    </button>
    {openModal && <OpenText {...props} />}
  </>
);
