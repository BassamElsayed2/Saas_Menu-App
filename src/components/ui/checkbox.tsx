"use client";

import * as React from "react";
import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onChange, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (value: boolean) => {
      if (!isControlled) {
        setInternalChecked(value);
      }
      onChange?.(value);
    };

    return (
      <HeadlessCheckbox
        ref={ref}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[checked]:bg-primary data-[checked]:text-primary-foreground",
          "flex items-center justify-center cursor-pointer",
          className
        )}
        {...props}
      >
        {isChecked && (
          <span className="material-symbols-rounded text-[14px] text-current">check</span>
        )}
      </HeadlessCheckbox>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
