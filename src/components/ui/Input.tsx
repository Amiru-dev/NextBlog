import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block font-semibold">{label}</label>}
      <input
        className={`w-full p-2 border rounded ${className}`}
        {...props}
      />
    </div>
  );
}
