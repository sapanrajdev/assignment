import React from 'react'
import downloadImg from '../images/download.PNG';

export const Download = ({ download }) => (
  <button
    title="recommended to not use black color if you want to download canvas."
    className="button"
    onClick={() => download()}>
    <img src={downloadImg} alt="download" />
  </button>
);
