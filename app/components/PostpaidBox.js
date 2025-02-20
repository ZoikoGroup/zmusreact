"use client"
import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";
import PostpaidSave from "./PostpaidSave";

const PrepaidBox = () => {
    return (
        <>
        <Container className="my-5">
            <h2 className="txtred text-center pt-5">Best Postpaid Plans USA with Many Exciting Benefits</h2>
            <p className="body22 text-center">Monthly rolling postpaid SIM only plans without credit checks. No-Frills - 20% OFF on Family Plans.</p>
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
                        <p>Upto 20GB<br />Mobile hotspot</p>
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
            <h2 className="text-center pt-5">Browse Postpaid Phone Plans USA with Preloaded Add-Ons</h2>
            <div className="pinkboxwraper justify-content-center gap-4 mt-2">
                <div className="pinkboxLarge p-5">
                    <Image src="/img/boximg1.jpg" className="w-50 d-block mx-auto" alt="Box Image" />
                    <h5 className="pt-4">Postpaid plans you rely on</h5>
                    <p>If there&apos;s a network issue, we&apos;ll settle it done, quickly—guaranteed. Postpaid SIM only plans start at $15/mo, which is 50% cheaper form other providers.</p>
                </div>
                <div className="pinkboxLarge p-5">
                    <Image src="/img/boximg2.webp" className="w-50 d-block mx-auto" alt="Box Image" />
                    <h5 className="pt-4">Rely on us?</h5>
                    <p>Switch to any of our best postpaid plans USA and enjoy up to 24-month contract lengths, no credit check is needed.</p>
                </div>
            </div>
        </Container>
        <PostpaidSave />
        <Image src="/img/fullbanner-postpaid.webp" fluid alt="Banner" />
        
        </>
    );
}
export default PrepaidBox;