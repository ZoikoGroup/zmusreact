"use client"
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";

const HomeSecA = () => {
    return (
        <Container className="mt-5">
            <h2 className="txtred text-center pt-5">Join Zoiko Mobile Today and Start Something New!</h2>
            <p className="body22 text-center">Reliable Network Coverage at Low Prices | Free International Calls | Free High Speed 5G Data</p>
            <div className="pinkboxwraper justify-content-center gap-4 mt-5">
                <div className="pinkbox align-items-center">
                    <Link href={"#"}>
                        <Image src={"/img/icons/icon1-home.png"} width={80} height={80} alt="Icon 1" className="mx-auto d-block" />
                        View Plans
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/icon2-home.png"} width={80} height={80} alt="Icon 2" className="mx-auto d-block" />
                        Activate SIM
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/icon3-home.png"} width={80} height={80} alt="Icon 3" className="mx-auto d-block" />
                        View Plans
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/icon4-home.png"} width={80} height={80} alt="Icon 4" className="mx-auto d-block" />
                        Activate SIM
                    </Link>
                </div>
                <div className="pinkbox">
                    <Link href={"#"}>
                        <Image src={"/img/icons/icon5-home.png"} width={80} height={80} alt="Icon 5" className="mx-auto d-block" />
                        View Plans
                    </Link>
                </div>
            </div>
        </Container>
    );
}
export default HomeSecA;