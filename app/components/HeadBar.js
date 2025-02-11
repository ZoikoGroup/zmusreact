"use client"
import { Container } from "react-bootstrap";

function HeadBar (props) {
    return (
        <Container fluid className="p-0">
            <div className="headbar">
                <Container className="py-2">
                    {props.text}
                </Container>
            </div>
        </Container>
    );
}
export default HeadBar;