const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function FlagIcon({ className = 'h-5 w-auto' }) {
  return (
    <svg viewBox="0 0 33 22" className={className} aria-hidden="true">
      <rect width="33" height="22" fill="#ffffff" />
      <rect width="33" height="7.34" fill="#0c0c0c" />
      <rect y="14.66" width="33" height="7.34" fill="#149954" />
      <polygon points="0,0 9.2,11 0,22" fill="#e4312b" />
    </svg>
  )
}

export function SunIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export function MoonIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function SearchIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

export function ChevronDownIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ChevronLeftIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function ArrowLeftIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

export function ArrowRightIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function TargetIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </svg>
  )
}

export function ShieldIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M12 2.5 19 5.2v6.1c0 4.6-3 8-7 9.7-4-1.7-7-5.1-7-9.7V5.2l7-2.7Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  )
}

export function SproutIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M12 21v-8" />
      <path d="M12 13C12 8.6 14.5 6 19 6c0 4.4-2.5 7-7 7Z" />
      <path d="M12 13C12 8.6 9.5 6 5 6c0 4.4 2.5 7 7 7Z" />
    </svg>
  )
}

export function StoreIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M4 7.5 5.2 4h13.6L20 7.5" />
      <path d="M4 7.5A2.2 2.2 0 0 0 8.4 7.5M12 7.5A2.2 2.2 0 0 0 16.4 7.5" />
      <path d="M20 7.5A2.2 2.2 0 0 1 15.6 7.5M20 7.5V20H4V7.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  )
}

export function BanIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M4.6 4.6l14.8 14.8"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FileTextIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6M9 17h6M9 9h1" />
    </svg>
  )
}

export function ClapperboardIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M20.2 6 3 11l1.9-5.7a2 2 0 0 1 1.3-1.3L21 4.9a2 2 0 0 1 1.4 2.3l-.2 1.3Z" />
      <path d="m3 11 .5 3.8" />
      <path d="M21.4 5 14 12M3 14.8 4.2 22h15.6l1.2-7.2" />
    </svg>
  )
}

export function PlayIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
    </svg>
  )
}

export function StopIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
    </svg>
  )
}

export function RotateCwIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}

export function XIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function TagIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M20.6 13.4 12 22 2.8 12.8a2 2 0 0 1-.6-1.4V3.8A.8.8 0 0 1 3 3h7.6a2 2 0 0 1 1.4.6l8.6 8.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </svg>
  )
}

export function EditIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

export function TrashIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

export function LogoutIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </svg>
  )
}

export function GridIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

export function HomeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="m3 10.5 9-7.5 9 7.5" />
      <path d="M5 9.2V21h14V9.2" />
      <path d="M10 21v-6h4v6" />
    </svg>
  )
}

export function MoreIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <circle cx="5" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="19" cy="12" r="1.4" />
    </svg>
  )
}

export function SaveIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  )
}

export function EyeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function EyeOffIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M9.9 4.24A9.7 9.7 0 0 1 12 4c6.5 0 10 7 10 7a13 13 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24M9.9 4.24A9.7 9.7 0 0 1 12 4c6.5 0 10 7 10 7a13 13 0 0 1-1.67 2.68M2 2l20 20" />
    </svg>
  )
}

export function ImageIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

export function ScanIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10M7 9h7M7 15h8" />
    </svg>
  )
}

export function PackageIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2V8.2Z" />
      <path d="M3.3 8.4 12 13.5l8.7-5.1" />
      <path d="M12 13.5V21" />
    </svg>
  )
}

export function TriangleAlertIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  )
}

export function ClockIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function PackagePlusIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2V8.2Z" />
      <path d="M3.3 8.4 12 13.5l8.7-5.1" />
      <path d="M12 13.5V21" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  )
}

export function HeartIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export function LayersIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps} aria-hidden="true">
      <path d="m12 2 10 5.5L12 13 2 7.5 12 2Z" />
      <path d="m2 12 10 5.5 10-5.5" />
      <path d="m2 16.5 10 5.5 10-5.5" />
    </svg>
  )
}
