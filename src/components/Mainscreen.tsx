// components/Mainscreen.js
import React, { ReactNode } from 'react';
import styles from '../styles/components/Mainscreen.module.scss';
interface MainscreenProps {
  children: ReactNode;
}
class Mainscreen extends React.Component<MainscreenProps> {
  constructor(props: MainscreenProps) {
    super(props);
  }
  render() {
    return (
      <main className={styles.mainscreen}>
        <div className={styles.container}>
          {this.props.children}
        </div>
      </main>
    );
  }
}
export default Mainscreen;
