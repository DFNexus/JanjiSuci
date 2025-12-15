import type { SVGProps } from 'react';

export const Icons = {
  JanjiSuciLogo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 25"
      fill="none"
      {...props}
    >
      <path
        d="M12.5 2C6.15 2 1 7.15 1 13.5S6.15 25 12.5 25C18.85 25 24 19.85 24 13.5V12h-5v1.5c0 3.59-2.91 6.5-6.5 6.5S6 17.09 6 13.5 8.91 7 12.5 7c1.95 0 3.7.86 4.95 2.22l3.55-3.54C18.6 3.29 15.75 2 12.5 2z"
        fill="currentColor"
      />
      <text
        x="28"
        y="20"
        fontFamily="Alegreya, serif"
        fontSize="19"
        fill="currentColor"
      >
        Janji Suci
      </text>
    </svg>
  ),
};
