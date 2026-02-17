// "use client"
// import { Container } from "react-bootstrap";

// function HeadBar (props) {
//     return (
//         <Container fluid className="p-0">
//             <div className="headbar">
//                 <Container className="py-2">
//                     {props.text}
//                 </Container>
//             </div>
//         </Container>
//     );
// }
// export default HeadBar;

"use client";
import { Container } from "react-bootstrap";

const tickerItems = [
  { text: "AFFORDABLE PLANS STARTING AT $15", icon: "/img/icons/Frame-4.svg" },
  { text: "NO CREDIT CHECK REQUIRED", icon: "/img/icons/Frame-3.svg" },
  {
    text: "TRANSPARENT PRICING · ZERO HIDDEN FEES",
    icon: "/img/icons/Frame-2.svg",
  },
  { text: "UNLIMITED TALK · TEXT · DATA", icon: "/img/icons/Frame-1.svg" },
  { text: "NATIONWIDE 5G COVERAGE", icon: "/img/icons/Frame.svg" },
];

function HeadBar() {
  return (
    <div className="ticker-wrapper">
      <Container fluid className="p-0">
        <div className="ticker">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div className="ticker-item" key={index}>
              <img src={item.icon} alt="" className="ticker-icon" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HeadBar;
