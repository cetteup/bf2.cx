import { FC } from 'react';
import { IconLink } from '@/components/IconLink';

export const Footer: FC = () => {
    return (
        <footer className={'pt-2 pb-4 text-center'}>
            <p>
                <i>Heavily</i> inspired by <a href={'https://cod.pm/'}>cod.pm</a> and <a
                href={'https://bf2.tv/'}>bf2.tv</a>.
            </p>
            <div className={'py-2 fs-4'}>
                <IconLink
                    icon={'bi-github'}
                    href={'https://github.com/sponsors/cetteup'}
                    title={'Become a sponsor'}
                />
                <IconLink
                    icon={'bi-mastodon'}
                    href={'https://hostux.social/@cetteup'}
                    title={'Reach out on Mastodon'}
                />
                <IconLink
                    icon={'bi-send-fill'}
                    href={'mailto:me@cetteup.com'}
                    title={'Reach out via email'}
                />
            </div>
        </footer>
    );
};
