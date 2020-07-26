import React from 'react'

export const Section = React.forwardRef((props, ref) => (
  <section>
    <canvas
      id="canvas"
      ref={ref}
      onMouseDown={props.onMouseDown}
      onMouseLeave={props.onMouseLeave}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
    />
  </section>
));
