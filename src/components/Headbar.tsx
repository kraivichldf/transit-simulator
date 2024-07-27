// components/Headbar.js
import React from 'react';
import styles from '../styles/components/Headbar.module.scss';
import Link from 'next/link';

class Headbar extends React.Component {
  render() {
    return (
      <header className={styles.headbar}>
        <div className={styles.logo}>MyLogo</div>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
        </nav>
      </header>
    );
  }
}
export default Headbar;
