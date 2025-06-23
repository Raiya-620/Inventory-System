

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "destructive";
  className?: string;
}

export function Button({ variant, className = "", ...props }: ButtonProps) {
  let base = "px-4 py-4 rounded ";
  if (variant === "outline")
    base += "border border-gray-400 bg-white text-gray-800 ";
  else if (variant === "destructive") base += "bg-red-500 text-white ";
  else base += "bg-blue-500 text-white ";
  return <button className={base + className} {...props} />;
}
