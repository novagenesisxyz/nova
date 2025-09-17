export function NovaLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <defs>
        <radialGradient id="novaGrad" cx="50%" cy="50%">
          <stop offset="0%" style={{ stopColor: "#E0C3FC", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#9BB5FF", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#646ECB", stopOpacity: 1 }} />
        </radialGradient>

        <filter id="smallGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="32" height="32" rx="6" fill="#0A0E27" />

      <g transform="translate(16, 16)">
        <path
          d="M 0,-11 L 1.5,-6 L 0,-2 L -1.5,-6 Z"
          fill="url(#novaGrad)"
          transform="rotate(0)"
        />
        <path
          d="M 0,-11 L 1.5,-6 L 0,-2 L -1.5,-6 Z"
          fill="url(#novaGrad)"
          transform="rotate(90)"
        />
        <path
          d="M 0,-11 L 1.5,-6 L 0,-2 L -1.5,-6 Z"
          fill="url(#novaGrad)"
          transform="rotate(180)"
        />
        <path
          d="M 0,-11 L 1.5,-6 L 0,-2 L -1.5,-6 Z"
          fill="url(#novaGrad)"
          transform="rotate(270)"
        />

        <path
          d="M 0,-10 L 1,-5.5 L 0,-2.5 L -1,-5.5 Z"
          fill="url(#novaGrad)"
          opacity="0.7"
          transform="rotate(45)"
        />
        <path
          d="M 0,-10 L 1,-5.5 L 0,-2.5 L -1,-5.5 Z"
          fill="url(#novaGrad)"
          opacity="0.7"
          transform="rotate(135)"
        />
        <path
          d="M 0,-10 L 1,-5.5 L 0,-2.5 L -1,-5.5 Z"
          fill="url(#novaGrad)"
          opacity="0.7"
          transform="rotate(225)"
        />
        <path
          d="M 0,-10 L 1,-5.5 L 0,-2.5 L -1,-5.5 Z"
          fill="url(#novaGrad)"
          opacity="0.7"
          transform="rotate(315)"
        />
      </g>

      <circle cx="16" cy="16" r="4" fill="url(#novaGrad)" filter="url(#smallGlow)" />
      <circle cx="16" cy="16" r="2" fill="#FFFFFF" opacity="0.95" />
    </svg>
  );
}