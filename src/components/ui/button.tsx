import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.35rem] text-sm font-semibold tracking-[0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground shadow-none hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--navy)_90%,var(--foreground))] hover:shadow-[0_12px_28px_-22px_color-mix(in_oklab,var(--navy)_58%,transparent)]",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground shadow-none hover:-translate-y-0.5 hover:bg-destructive/92",
        outline:
          "border border-input bg-background/88 shadow-none hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card hover:text-foreground",
        secondary:
          "border border-border bg-secondary text-secondary-foreground shadow-none hover:-translate-y-0.5 hover:bg-secondary/80",
        ghost: "text-foreground/78 hover:-translate-y-0.5 hover:bg-accent/16 hover:text-foreground",
        link: "rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-11 px-6 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
