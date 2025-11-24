import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function PowerOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18.36 6.64A9 9 0 1 1 5.64 6.64" />
      <path d="M12 2v10" />
    </svg>
  );
}
