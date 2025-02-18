"use client"
import Link from "next/link";
import { Container, Image } from "react-bootstrap";

const PrepaidBox = () => {
    return (
        <Container className="my-5">
            <h2 className="txtred text-center pt-5">Best Prepaid Mobile Plans with Many Exciting Benefits</h2>
            <p className="body22 text-center">No contract prepaid phone plans without credit checks. No-Frills - 20% OFF on Family Plans</p>
            <div className="pinkboxwraper justify-content-center gap-4 mt-2">
                <div className="pinkbox align-items-center">
                    <Link href={"#"}>
                        <Image src={"/img/icons/5G.png"} width={80} height={80} alt="Icon 1" className="mx-auto d-block" />
                        Nationwide<br />FREE 5G Network
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/hotspot.png"} width={80} height={80} alt="Icon 2" className="mx-auto d-block" />
                        Upto 10GB<br />Mobile hotspot
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/intl-calls.png"} width={80} height={80} alt="Icon 3" className="mx-auto d-block" />
                        Free International<br />Calls
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/perks.png"} width={80} height={80} alt="Icon 4" className="mx-auto d-block" />
                        Exclusive perks
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/roam-plans.png"} width={80} height={80} alt="Icon 5" className="mx-auto d-block" />
                        Canada &amp; Mexico Roam Free Plans
                    </Link>
                </div>
            </div>
        </Container>
    );
}
export default PrepaidBox;