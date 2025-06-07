import * as React from "react"

const buttonVariants = {
  variant: {
    default: "bg-primary text-surface hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2",
    destructive: "bg-red-600 text-surface hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2",
    outline:
      "border border-primary bg-transparent hover:bg-primary-hover hover:text-surface text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2",
    secondary: "bg-secondary text-surface hover:bg-secondary/80 focus:ring-2 focus:ring-secondary focus:ring-offset-2",
    ghost:
      "hover:bg-primary/10 text-primary hover:text-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2",
    link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    const variantClasses = buttonVariants.variant[variant]
    const sizeClasses = buttonVariants.size[size]

    const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: combinedClasses,
        ref,
      })
    }

    return (
      <button className={combinedClasses} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
