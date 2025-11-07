"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Table, Container } from "react-bootstrap";

export default function ActivateSim() {
 

  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="Zoiko Mobile SIM Activation" />

     <Container className="my-4">
      <div className="p-3 bg-white rounded shadow-sm">
        <Table bordered hover responsive className="align-middle mb-0">
          <thead>
            <tr style={{ backgroundColor: "#e91e63", color: "#fff" }}>
              <th>Feature</th>
              <th>Cost</th>
              <th>Included</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calls to USA landlines</td>
              <td>$0.10/min</td>
              <td>YES*</td>
            </tr>
            <tr>
              <td>Calls to USA mobiles (any network)</td>
              <td>$0.12/min</td>
              <td>YES*</td>
            </tr>
            <tr>
              <td>Other (non-geographic, premium etc.)</td>
              <td>$0.15 + pass through any interconnect charges</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>Calls to Zoiko Mobile Numbers</td>
              <td>FREE</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>Customer Service 611</td>
              <td>FREE</td>
              <td>YES*</td>
            </tr>
            <tr>
              <td>Voicemail 123</td>
              <td>FREE</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>Toll-Free 0800, 855, 866, 877, 888</td>
              <td>FREE</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>USA SMS</td>
              <td>$0.05/SMS</td>
              <td>YES*</td>
            </tr>
            <tr>
              <td>USA MMS</td>
              <td>$0.15/MMS</td>
              <td>YES*</td>
            </tr>
            <tr>
              <td>USA DATA</td>
              <td>$0.05/MB</td>
              <td>YES*</td>
            </tr>
            <tr>
              <td>PAC Request (Porting Authorization Code) 65075</td>
              <td>FREE</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>STAC (Service Termination Authorization Code) Request 75075</td>
              <td>FREE</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>SPAM Report (7726)</td>
              <td>FREE</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>

      <Footer />
    </>
  );
}
