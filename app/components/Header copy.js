"use client"
import { Container, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';

const Header = () => {
    const [isMounted, setIsMounted] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <Container fluid>
                <Link className="navbar-brand" href="/">
                    <Image src='/img/zmuslogo.png' width={160} height={90} alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="#" role="button" aria-expanded="false">Prepaid Plans</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#" role="button" aria-expanded="false">Postpaid Plans</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#" role="button" aria-expanded="false">Business Deals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#" role="button" aria-expanded="false">Travel Plans</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/animal-music-channel">Animal &amp; Music</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle mainmenu" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Devices</Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" href="/product-category/refurbished">Refurbished Smartphones</Link></li>
                                <li><Link className="dropdown-item" href="#">Tablets</Link></li>
                                <li><Link className="dropdown-item" href="#">Accessories</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mainmenu" href="/about-us">About Us</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href={"#"} className="nav-link" onClick={handleShow}><i className="bi bi-search"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={"#"} className="nav-link px-3"><i className="bi bi-cart"></i></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">My Zoiko</button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" href="/login">Login</Link></li>
                                <li><Link className="dropdown-item" href="/register">Register</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>

        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Body>
                <div className="p-5">
                    <h2 className="mb-3">Search Zoiko Products</h2>
                    <label htmlFor="search">Enter keyword to search</label>
                    <input type="text" name="search" className="form-control" />
                    <Button variant="primary" onClick={handleClose} className="mt-4">Search</Button>&nbsp;
                    <Button variant="primary" onClick={handleClose} className="mt-4">Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default Header;