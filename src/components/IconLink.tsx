import type { FC } from 'react';


type IconLinkProps = {
    icon: string
    href: string
    title?: string
}

export const IconLink: FC<IconLinkProps> = ({ icon, href, title }) => {
    return (
        <span className="mx-3">
            <a href={href} title={title} rel="noreferrer">
                <i className={icon + ' text-white'}/>
            </a>
        </span>
    );
};
