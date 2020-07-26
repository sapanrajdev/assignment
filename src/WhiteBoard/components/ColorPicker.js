import React from 'react'

export const ColorPicker = ({ userStrokeStyle, handleChangeColor }) => (
  <input
    type="color"
    title="color"
    defaultValue={userStrokeStyle}
    onChange={handleChangeColor}
  />
)