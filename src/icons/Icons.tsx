import type { SVGProps } from "react";
import { twMerge } from "tailwind-merge";

interface Icon extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const Icons = {
  Close: ({ className, ...props }: Icon) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={twMerge("size-6 fill-current", className)}
      {...props}
    >
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
    </svg>
  ),
  ForwardStep: ({ className, ...props }: Icon) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={twMerge("size-6 fill-current", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 6v12M8 6v12l8-6-8-6Z"
        className="stroke-current stroke-1"
      />
    </svg>
  ),
  NotificationError: ({ className, ...props }: Icon) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("size-6 fill-current", className)}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 10.15 4.63 8.45 5.69 7.1L16.9 18.31C15.55 19.37 13.85 20 12 20ZM18.31 16.9L7.1 5.69C8.45 4.63 10.15 4 12 4C16.42 4 20 7.58 20 12C20 13.85 19.37 15.55 18.31 16.9Z" />
    </svg>
  ),
  NotificationInfo: ({ className, ...props }: Icon) => (
    <svg
      viewBox="0 0 24 24"
      className={twMerge("size-6 fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
    </svg>
  ),
  NotificationSuccess: ({ className, ...props }: Icon) => (
    <svg
      viewBox="0 0 24 24"
      className={twMerge("size-6 fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.79508 15.8749L4.62508 11.7049L3.20508 13.1149L8.79508 18.7049L20.7951 6.70492L19.3851 5.29492L8.79508 15.8749Z" />
    </svg>
  ),
  NotificationWarning: ({ className, ...props }: Icon) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("size-6 fill-current", className)}
      {...props}
    >
      <path d="M12 6.49L19.53 19.5H4.47L12 6.49ZM12 2.5L1 21.5H23L12 2.5ZM13 16.5H11V18.5H13V16.5ZM13 10.5H11V14.5H13V10.5Z" />
    </svg>
  ),
  Play: ({ className, ...props }: Icon) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("size-6 fill-current", className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 18V6l8 6-8 6Z"
        className="stroke-current stroke-1"
      />
    </svg>
  ),
};
