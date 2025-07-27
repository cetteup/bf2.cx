import { AnchorHTMLAttributes, DetailedHTMLProps, FC, MouseEvent, useState } from 'react';
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import { redirect, RedirectType } from 'next/navigation';

type ExternalLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    href: string;
}

export const ExternalLink: FC<ExternalLinkProps> = ({ href, children, ...props }) => {
    const [ modalShow, setModalShow ] = useState(false);

    const url = new URL(href);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Don't show modal for trusted/well-known hostnames
        if (isTrustedHostname(url.hostname)) {
            redirect(url.href, RedirectType.push);
        }
        setModalShow(true);
    };
    const handleClose = () => setModalShow(false);

    return (
        <>
            <a href={href} onClick={handleClick} {...props}>
                {children}
            </a>
            <Modal size={'lg'} show={modalShow} onHide={handleClose} data-bs-theme={'dark'} centered>
                <ModalHeader closeButton>
                    <ModalTitle>
                        Untrusted external URL <i className={'bi-link-45deg'}/>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    You are about to leave BF2.CX and visit <a
                    href={href} rel={props.rel}>{url.hostname}</a>.
                    We do not control, moderate or are otherwise responsible for the site&lsquo;s content.
                    Proceed at your own discretion.
                </ModalBody>
                <ModalFooter>
                    <Container className={'p-0 d-lg-flex justify-content-end'}>
                        <Row lg={2} md={1} xs={1} className={'gx-2'}>
                            <Col lg={'auto'} md={12} className={'mb-2 mb-lg-0'}>
                                <Button
                                    variant={'primary'}
                                    href={href}
                                    rel={props.rel}
                                    className={'d-block w-100'}
                                >
                                    Visit {url.hostname}
                                </Button>
                            </Col>
                            <Col lg={'auto'} md={12}>
                                <Button
                                    variant={'secondary'}
                                    onClick={handleClose}
                                    className={'d-block w-100'}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalFooter>
            </Modal>
        </>
    );
};

const trustedHosts = [
    '2f4y.com',
    'bf2hub.com',
    'bf2l.de',
    'breiker.net',
    'comunidadebf2.com.br',
    'discord.gg',
    'dogclan.net',
    'lost-soldiers.org',
    'nihlen.net',
    'openspy.net',
    'playbf2.ru',
    'superinfantryclan.com',
    'tgamer.ru',
];

const isTrustedHostname = (hostname: string): boolean => {
    for (const host of trustedHosts) {
        // Allow host itself as well as subdomains
        if (hostname == host || hostname.endsWith('.' + host)) {
            return true;
        }
    }

    return false;
};