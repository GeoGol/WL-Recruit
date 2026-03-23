import { memo } from 'react';
import {RiCheckLine} from "@/components/IconComponent/Icons";
import {CheckboxComponentProps, InputSize} from "@/models";

const sizeClasses: Record<InputSize, { font: string; height: string; }> = {
    sm: { font: 'text-sm', height: 'h-8'  },
    md: { font: 'text-md', height: 'h-9'  },
    lg: { font: 'text-lg', height: 'h-10' },
};

const CheckboxComponent = memo(({
    label,
    checked,
    onChange,
    name,
    id,
    size = 'md',
    className,
    wrapperClass,
    disabled = false,
}: CheckboxComponentProps) => {
    const handleOnChange = () => {
        if (onChange && !disabled) {
            onChange(!checked, name);
        }
    };

  return (
      <div className={`inline-flex items-center gap-2 cursor-pointer hover:text-primary ${wrapperClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
          <label className="flex items-center gap-2 cursor-pointer">
              <input
                  rel={id}
                  type="checkbox"
                  checked={checked}
                  onChange={handleOnChange}
                  className="hidden"
                  disabled={disabled}
              />
              <div
                  className={`min-w-4 min-h-4 flex items-center justify-center border-2 ${checked ? "bg-quaternary border-link" : "border-gray-400 hover:border-gray-600 transition-colors"} rounded-sm
                  ${className ?? ''}
                  ${disabled ? "border-slate-200" : ""}
                  `}
              >
                  <RiCheckLine size={12} className={`text-white transition-opacity duration-200 ${checked ? "opacity-100" : "opacity-0"}`}/>
              </div>

              {label && <span className= {`text-primary font-medium ${sizeClasses[size].font}`}>{label}</span>}
          </label>
      </div>
  );
});

CheckboxComponent.displayName = 'CheckboxComponent';

export default CheckboxComponent;
