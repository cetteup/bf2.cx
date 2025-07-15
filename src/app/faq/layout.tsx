import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ - BF2.CX',
    description: 'Find answers to frequently asked questions around BF2.CX.',
};

export default function FAQLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>{children}</>
    );
}
