"use client"
import { Container } from "react-bootstrap";

function HeadBarSmall (props) {
    return (
        <Container className="py-2 headbar" style={{borderRadius:'8px'}}>
            {props.text}
        </Container>
    );
}
export default HeadBarSmall;