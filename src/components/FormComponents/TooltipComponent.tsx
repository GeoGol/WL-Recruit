import { memo, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {TooltipComponentProps} from "@/models";

const TooltipComponent = memo(({
  content,
  children,
  placement = 'top',
  className = '',
  delay = 100,
}: TooltipComponentProps) => {

  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const timeoutRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const calculateStyle = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;

    const positions: Record<string, React.CSSProperties> = {
      top:    { top: rect.top - gap,    left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' },
      bottom: { top: rect.bottom + gap, left: rect.left + rect.width / 2, transform: 'translate(-50%, 0)' },
      left:   { top: rect.top + rect.height / 2, left: rect.left - gap,   transform: 'translate(-100%, -50%)' },
      right:  { top: rect.top + rect.height / 2, left: rect.right + gap,  transform: 'translate(0, -50%)' },
    };

    setStyle({ position: 'fixed', zIndex: 9999, ...positions[placement] });
  }, [placement]);

  const showTooltip = () => {
    calculateStyle();
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const arrowClass: Record<string, string> = {
    top:    'absolute w-2 h-2 bg-surface rotate-45 left-1/2 -translate-x-1/2 -bottom-0.5',
    bottom: 'absolute w-2 h-2 bg-surface rotate-45 left-1/2 -translate-x-1/2 -top-0.5',
    left:   'absolute w-2 h-2 bg-surface rotate-45 top-1/2 -translate-y-1/2 -right-0.5',
    right:  'absolute w-2 h-2 bg-surface rotate-45 top-1/2 -translate-y-1/2 -left-0.5',
  };

  return (
    <div
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {visible && ReactDOM.createPortal(
        <span
          style={style}
          className={`pointer-events-none whitespace-nowrap p-1.5 text-sm font-medium text-primary bg-surface rounded-lg shadow-lg max-w-60 w-auto
            transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}
            ${className}`}
          role="tooltip"
        >
          {content}
          <span className={arrowClass[placement]} />
        </span>,
        document.body
      )}
    </div>
  );
});

TooltipComponent.displayName = 'TooltipComponent';

export default TooltipComponent;
