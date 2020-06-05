import React from 'react';
import IosCall from 'react-ionicons/lib/IosCall';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      <IosCall color="#000" fontSize="11px" />
      +1 (833) 949-2733
    </p>
  </footer>
);

export default Footer;
