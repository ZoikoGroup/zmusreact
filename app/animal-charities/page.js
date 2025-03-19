"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import Testimonials from "../components/Testimonials";
import AnimalFaqs from "../components/AnimalFaqs";

const AnimalCharities = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Zoiko Mobile - Animal Charities Discount Program</>} />
        <Container fluid className="animalcharities"></Container>
        <Container fluid className="bglite">
            <Container className="py-5">
                <h2 className="text-center pb-4">Exclusive Discounts for Charity Workers</h2>
                <div className="pinkboxwraper justify-content-center gap-5">
                    <div className="d-flex flex-row animalchbox">
                        <div>
                            <Image src="/img/animal-charity1.webp" fluid alt="Animal Charity" />
                            <p>Animal charity employees receive a 20% discount on our plans for as long as they are employed in the sector.</p>
                            <Button variant="outline-danger" size="sm" href="/animal-charity-worker-registration">Register Now <i className="bi bi-chevron-right"></i></Button>
                        </div>
                    </div>
                    <div className="d-flex flex-row animalchbox">
                        <div>
                            <Image src="/img/animal-charity2.webp" fluid alt="Animal Charity" />
                            <p>Up to 5 family members of eligible workers are entitled to the same discount, ensuring the whole family stays connected affordably.</p>
                            <Button variant="outline-danger" size="sm" href="/animal-charity-worker-registration">Register Now <i className="bi bi-chevron-right"></i></Button>
                        </div>
                    </div>
                </div>
            </Container>
        </Container>
        <Container fluid className="puppybanner d-flex align-items-center">
            <Container>
                <h2 className="bigblack w-50 w-sm-100">Making Every Call Count</h2>
                <p className="w-50 w-sm-100 body22">Up to 2% of our annual profits are donated to animal welfare causes. From rescuing pets to supporting shelters, your partnership helps us make a difference.</p>
                <Button variant="danger" href="/zoiko-mobile-animal-welfare-partnership">Partner With Us Today</Button>
            </Container>
        </Container>
        <Container fluid className="bglite py-4">
            <Container className="d-flex flex-row align-items-center gap-5">
                <Image src="/img/kitten.webp" fluid alt="Kitten" className="w-50" />
                <div>
                    <h2 className="bigblack">Be Part of the Network That Cares</h2>
                    <p className="body22">Together, we can make a bigger impact for animals in need.</p>
                    <Button variant="danger" href="/zoiko-mobile-animal-welfare-partnership">Partner With Us Today</Button>
                </div>
            </Container>
        </Container>
        <AnimalFaqs />
        <Testimonials />
        <Footer />
        </>
    );
}
export default AnimalCharities;