import React from 'react'
import { Header, Nav, Section } from '.';

export const Container = React.forwardRef((props, ref) => (
  <div id="paint">
    <Header {...props} />
    <Nav {...props} />
    <Section ref={ref} {...props} />
  </div>
));