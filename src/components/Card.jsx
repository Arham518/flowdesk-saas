import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  padding = 'xl',
  borderRadius = 'lg',
  style = {},
  ...props
}) => {
  const paddings = {
    none: '0px',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)'
  };

  const radii = {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)'
  };

  const cardPadding = paddings[padding] || paddings.xl;
  const cardRadius = radii[borderRadius] || radii.lg;

  const cardStyles = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-subtle)',
    transition: 'border-color 300ms ease, box-shadow 300ms ease',
    overflow: 'hidden',
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  return (
    <motion.div
      onClick={onClick}
      className={`card ${className}`}
      style={{
        ...cardStyles,
        borderRadius: cardRadius,
        padding: cardPadding
      }}
      whileHover={hoverEffect ? {
        y: -6,
        boxShadow: 'var(--shadow-medium)',
        borderColor: 'var(--accent)'
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
