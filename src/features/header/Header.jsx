import React from 'react';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <a href="https://wizardrylabs.io">
      <img src="/logo.svg" alt="Wizardry Labs logo" />
      <h1>Wizardry Labs</h1>
    </a>
  </header>
);

export default Header;
