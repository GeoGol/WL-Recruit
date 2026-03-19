import { memo, useRef, useState } from 'react';
import {TooltipComponentProps} from "@/models";

const TooltipComponent = memo(({
  content,
  children,
  className = '',
  delay = 100,
}: TooltipComponentProps) => {

  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <div className="inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onFocus={showTooltip} onBlur={hideTooltip}>
        <div className={'relative'}>
            {children}

            <span
                className={`absolute pointer-events-none whitespace-nowrap p-1.5 text-sm font-medium text-primary bg-surface rounded-lg shadow-lg opacity-0 transition-opacity duration-200 max-w-60 w-auto
                bottom-full left-1/2 -translate-x-1/2 mb-2
                ${visible ? ' opacity-100' : ''} 
                ${className}`}
                role="tooltip"
                aria-hidden={!visible}
                style={{zIndex: 50}}
            >
                {content}
                <span className={`absolute w-2 h-2 bg-surface rotate-45 left-1/2 -translate-x-1/2 -bottom-0.5`}/>
            </span>
        </div>

    </div>
  );
});

TooltipComponent.displayName = 'TooltipComponent';

export default TooltipComponent;
