import React from 'react';
import styles from './Input.module.scss';

const Input = React.forwardRef((props, ref) => (
  <>
    <input ref={ref} {...props} className={styles.input} />
  </>
));

export default Input;
