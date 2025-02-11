import React from "react";

interface LogoProps {
  className?: string;
  title?: string;
}

const Logo = ({ className, title = "Next.js Conf Logo" }: LogoProps) => (
  <svg
    className={className}
    viewBox="0 0 172 26"
    width="172"
    height="26"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-labelledby="logo-title"
  >
    <title id="logo-title">{title}</title>
    <path d="M108.262 25.9669C108.032 ... 108.262 24.3589Z" />
    <path d="M113.624 18.3689H115.016V23.654C115.014 ... 113.624 23.654V18.3689Z" />
    <path d="M120.744 20.4358C120.71 20.1155 ... 122.094 20.4358H120.744Z" />
    <path d="M85.1237 0.0107485H107.428V4.1275H98.5798V25.7852H94.1559V4.1275H85.1237V0.0107485Z" />
    <path d="M48.4419 0.0107485V4.1275H30.5637V10.7501H44.9415V14.8668H30.5637V21.6684H48.4419V25.7852H26.1397V4.1275H26.1379V0.0107485H48.4419Z" />
    <path d="M59.5792 0.0214983H53.7893L74.5265 25.7959H80.3329L69.9632 12.9176L80.3163 0.0411626L74.5265 0.0501099L67.0645 9.31767L59.5792 0.0214983Z" />
    <path d="M65.5201 18.4323L62.6206 14.8275L53.7727 25.8156H59.5791L65.5201 18.4323Z" />
    <path clipRule="evenodd" d="M26.2948 25.7852L5.52992 0H0V25.7744H4.42393V5.50928L20.7372 25.7852H26.2948Z" fillRule="evenodd" />
    <path d="M137.405 16.3464C137.8 16.3464 ... 137.405 16.3464Z" />
    <path d="M142.745 11.3232C142.745 9.9088 ... 169.056V13.5072H164.22V18H162.161V7.08Z" />
    <line strokeWidth="1.3" x1="132.6" x2="171.6" y1="25.35" y2="25.35" />
  </svg>
);

export default React.memo(Logo);
