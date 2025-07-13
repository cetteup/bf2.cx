import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './custom.css';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from 'react-bootstrap';
import Providers from '@/app/providers';
import Script from 'next/script';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang={'en'}>
        <body>
        <div className={'bg-dark text-white min-vh-100 d-flex flex-column'} data-bs-theme={'dark'}>
            <Header/>
            <main className={'flex-grow-1'}>
                <Container className={'p-2'}>
                    <Providers>
                        {children}
                    </Providers>
                </Container>
            </main>
            <Footer/>
        </div>
        <Script strategy={'afterInteractive'} data-website-id={'df68c4c9-e6c1-4bb8-848f-503ef2306f22'} src={'https://analytics.cetteup.com/script.js'} />
        </body>
        </html>
    );
}
