"use client"
import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";

const PrepaidBox = () => {
    return (
        <>
        <Container className="my-5">
            <h2 className="txtred text-center pt-5">Best Prepaid Mobile Plans with Many Exciting Benefits</h2>
            <p className="body22 text-center">No contract prepaid phone plans without credit checks. No-Frills - 20% OFF on Family Plans</p>
            <div className="pinkboxwraper justify-content-center gap-4 mt-2">
                <div className="pinkbox align-items-center">
                    <Link href={"#"}>
                        <Image src={"/img/icons/5G.png"} width={80} height={80} alt="Icon 1" className="mx-auto d-block" />
                        <p>Nationwide<br />FREE 5G Network</p>
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/hotspot.png"} width={80} height={80} alt="Icon 2" className="mx-auto d-block" />
                        <p>Upto 10GB<br />Mobile hotspot</p>
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/intl-calls.png"} width={80} height={80} alt="Icon 3" className="mx-auto d-block" />
                        <p>Free<br />International Calls</p>
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/perks.png"} width={80} height={80} alt="Icon 4" className="mx-auto d-block" />
                        <p>Exclusive perks</p>
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/roam-plans.png"} width={80} height={80} alt="Icon 5" className="mx-auto d-block" />
                        <p>Canada &amp; Mexico Roam Free Plans</p>
                    </Link>
                </div>
            </div>
        </Container>
        <Container fluid className="my-5">
            <h2 className="text-center pt-5">Browse Prepaid Phone Plans USA with Preloaded Add-Ons</h2>
            <div className="pinkboxwraper justify-content-center gap-4 mt-2">
                <div className="pinkboxLarge p-5">
                    <Image src="/img/boximg1.jpg" className="w-50 d-block mx-auto" alt="Box Image" />
                    <p>ONLY +$36/MO</p>
                    <h5>Free Roaming Mexico &amp; Canada Preloaded Prepaid Phone Plans</h5>
                    <p>Enjoy calling, texts, and 5G data coverage in Mexico and Canada to your current plan for only $36/mo. No need to buy any costly additional roaming plan.</p>
                </div>
                <div className="pinkboxLarge p-5">
                    <Image src="/img/boximg2.webp" className="w-50 d-block mx-auto" alt="Box Image" />
                    <p>ONLY +$15/MO</p>
                    <h5>200+ Countries Free International Calls On All Preloaded Prepaid Phone Plans</h5>
                    <p>Make free calls from the USA, Mexico, or Canada to mobile lines and landlines in 200+ countries, and available data for mobile Hotspots on your current plan; be ALWAYS ON in Zoiko Mobile&apos;s networks.</p>
                </div>
            </div>
        </Container>
        <Image src="/img/fullbanner.webp" fluid alt="Banner" />
        </>
    );
}
export default PrepaidBox;