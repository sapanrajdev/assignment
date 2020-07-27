import React from 'react'

export const Section = React.forwardRef((props, ref) => (
  <section>
    <canvas
      id="canvas"
      ref={ref}
      onKeyUp={props.drawText}
      onMouseDown={props.onMouseDown}
      onMouseLeave={props.onMouseLeave}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
    />
  </section>
));
