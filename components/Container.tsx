import { cn } from "@/lib/utils";

/** Ancho máximo y márgenes laterales comunes a todo el sitio. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-6 lg:px-8", className)} {...props} />;
}
