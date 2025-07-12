import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './custom.css';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from 'react-bootstrap';
import Providers from '@/app/providers';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang={'en'}>
        <body>
        <div className={'bg-dark text-white min-vh-100'} data-bs-theme={'dark'}>
            <Header/>
            <main>
                <Container className={'p-2'}>
                    <Providers>
                        {children}
                    </Providers>
                </Container>
            </main>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
