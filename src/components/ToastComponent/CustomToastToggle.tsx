import {RiCloseLine} from "@/components/IconComponent/Icons";

interface CustomToastToggleProps {
  onDismiss: () => void;
  className?: string;
}

export default function CustomToastToggle({ onDismiss, className = '' }: CustomToastToggleProps) {
  return (
      <button
          type="button"
          onClick={onDismiss}
          className= {`ml-auto shrink-0 text-muted hover:text-primary rounded-lg transition-colors ${className}`}
          aria-label="Close"
      >
          <RiCloseLine size={16} />
      </button>
  );
}

