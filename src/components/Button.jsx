import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon = null,
  iconPosition = 'right',
  ...props
}) => {
  // Styles mapping to design tokens
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';
  
  const variants = {
    primary: {
      background: 'var(--primary-btn)',
      color: 'var(--primary-btn-text, #FAF7F2)',
      border: '1px solid var(--primary-btn)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 24px',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    secondary: {
      background: 'var(--surface)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 24px',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--text-primary)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 24px',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--text-primary)',
      border: '1px solid var(--accent)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 24px',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    text: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: 'none',
      borderRadius: '0px',
      padding: '4px 0px',
      fontSize: '0.95rem',
      fontWeight: '600'
    }
  };

  const currentStyles = variants[variant] || variants.primary;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-${variant} ${className}`}
      style={{
        ...currentStyles,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'var(--font-body)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'background-color 250ms, border-color 250ms, color 250ms'
      }}
      whileHover={disabled ? {} : { 
        y: variant === 'text' ? 0 : -2,
        boxShadow: variant === 'text' ? 'none' : '0 8px 20px rgba(0,0,0,0.06)'
      }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </motion.button>
  );
};

export default Button;
