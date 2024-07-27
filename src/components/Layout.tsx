import React, { ReactNode } from 'react';
import Headbar from './Headbar';
import Mainscreen from './Mainscreen';

interface LayoutProp {
  children: ReactNode;
}

class Layout extends React.Component<LayoutProp> {
  constructor(props: LayoutProp) {
    super(props);
  }
  render() {
    return (
      <>
        <Headbar />
        <Mainscreen>
          {this.props.children}
        </Mainscreen>
      </>
    );
  }
}

export default Layout;
