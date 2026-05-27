import { ReactNode } from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  icon?: ReactNode;
  label?: string;
}

export default function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  icon,
  label,
}: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm text-foreground/80">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 ${
            icon ? 'pl-12' : ''
          } bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all ${className}`}
        />
      </div>
    </div>
  );
}
