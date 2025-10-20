import type React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5.5 14.5h13" />
      <path d="M18.5 14.5a2 2 0 0 1-2-2V7.5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2" />
      <path d="M12 18.5V14.5" />
      <path d="M7.5 18.5l-2 2.5" />
      <path d="M16.5 18.5l2 2.5" />
    </svg>
  );
}
