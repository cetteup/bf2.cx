import type { FC } from 'react';


type IconLinkProps = {
    icon: string
    href: string
    title?: string
    className?: string
}

export const IconLink: FC<IconLinkProps> = ({ icon, href, title, className }) => {
    return (
        <span className={className ?? 'mx-3'}>
            <a href={href} title={title} rel={'noreferrer'}>
                <i className={icon + ' text-white'}/>
            </a>
        </span>
    );
};
