import { forwardRef } from 'react';
import './ShinyText.css';

const ShinyText = forwardRef(({ text, disabled = false, speed = 5, className = '' }, ref) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      ref={ref}
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      <h1>{text}</h1>
    </div>
  );
});

ShinyText.displayName = 'ShinyText';
export default ShinyText;
