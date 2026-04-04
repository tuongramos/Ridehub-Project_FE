import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color }) => {
  return (
    <div className={`${styles.spinnerWrapper} ${styles[size]}`}>
      <div 
        className={styles.spinner} 
        style={color ? { borderTopColor: color } : undefined}
      ></div>
    </div>
  );
};
