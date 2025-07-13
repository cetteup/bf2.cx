import { FC } from 'react';

type SettingToggleProps = {
    enabled: boolean
    label: string
}

export const SettingToggle: FC<SettingToggleProps> = ({ enabled, label }) => {
    return (
        <span>
            <i className={`bi-toggle-${enabled ? 'on' : 'off'} align-middle`}
               title={enabled ? 'Enabled' : 'Disabled'}/> {label}
        </span>
    );
};
