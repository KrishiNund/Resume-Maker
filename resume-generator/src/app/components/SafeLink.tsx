import Link from "next/link";
import React from "react";
// SafeLink for internal and external links
const SafeLink = ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => {
    if (to.startsWith('http')) {
      return (
        <a href={to} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={to} className={className}>
        {children}
      </Link>
    );
  };

export default SafeLink;

