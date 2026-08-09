import { cn } from "@/lib/utils";

export default function CheckoutDefaultCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("p-5 bg-white rounded-lg w-full", className)}>
      {children}
    </div>
  )
}