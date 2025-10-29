"use client"
import { Container, Image } from "react-bootstrap" ;

const BusinessBottonLine = () => {
    return (
        <>
        <Container fluid className="redimgbg p-0">
            <Container className="p-5 text-white text-center">
            <h4>Climb your business&apos;s bottom line.</h4>
            <p>
                Pick among the best Unlimited Business Postpaid Plans and select the number of lines to see a
                big impact on your business&apos;s bottom line.
            </p>
            <h4>Reward your growing business with just one connection to climb to success.</h4>
            <p>
                Business phone plans are available with a pay monthly rolling easy agreement.
            </p>
            </Container>
        </Container>

        {/* IMAGE BANNER */}
        <Image src="/img/pinkbg-us.webp" fluid alt="Zoiko USA" />
        </>
    );
}
export default BusinessBottonLine;