'use client';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';

type HoverPrefetchLinkProps = {
    href: string
    className: string
    children: ReactNode
}

// https://nextjs.org/docs/app/guides/prefetching#hover-triggered-prefetch
export const HoverPrefetchLink: FC<HoverPrefetchLinkProps> = ({ href, className, children }) => {
    const [ active, setActive ] = useState(false);

    return (
        <Link
            href={href}
            prefetch={active ? null : false}
            onMouseEnter={() => setActive(true)}
            className={className}
        >
            {children}
        </Link>
    );
};
