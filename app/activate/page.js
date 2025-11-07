"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { useState } from "react";
import { activateSim } from "../utils/beQuickApi";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

export default function ActivateSim() {
  const [formData, setFormData] = useState({
    iccid: "",
    deliveriesID: "",
    trackingNumber: "",
    imei: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      activateSim(formData);
      // console.log("Submitted:", formData);
    }

    setValidated(true);
  };

  return (
    <>
      <style>{`
        .fancy-input {
          height: 50px;
          border: 1px solid black;
          border-radius: 20px !important;
        }

        /* ✅ Keep error messages from shifting layout */
        .form-group-fixed {
          position: relative;
          margin-bottom: 1rem;
        }

        .form-group-fixed .invalid-feedback {
          position: absolute;
          bottom: -5px;
          left: 45px;
          font-size: 0.85rem;
          color: #dc3545;
        }

        /* Add padding so feedback fits inside layout */
        .input-group .invalid-feedback {
  // display: block;
  position: absolute;
  font-size: 0.85rem;
  color: #dc3545;
      bottom: -30px;
    left: 30px;
}
      `}</style>

      {/* <TopHeader /> */}
      <Header />
      <HeadBar text="Zoiko Mobile SIM Activation" />

      <Container className="my-12">
        <Row className="justify-content-center">
          <Col md={6} lg={12}>
            <h2 className="text-center fw-bold mb-8">
              Now Activate Your Zoiko SIM Card
            </h2>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="p-4 shadow rounded m-4"
            >
              {/* Delivery ID + Tracking Number */}
              <Row>
                <Col md={6}>
                  <Form.Group
                    controlId="deliveryId"
                    className="p-4 form-label fw-semibold form-group-fixed"
                  >
                    <Form.Label className="ms-3 mb-2">
                      Delivery ID <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="deliveriesID"
                      placeholder="Enter Delivery ID"
                      value={formData.deliveriesID}
                      onChange={handleChange}
                      className="form-control rounded fancy-input form-with-fixed-feedback"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Delivery ID.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group
                    controlId="trackingNumber"
                    className="p-4 form-label fw-semibold form-group-fixed"
                  >
                    <Form.Label className="ms-3 mb-2">
                      Tracking Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="trackingNumber"
                      placeholder="Enter Tracking Number"
                      value={formData.trackingNumber}
                      onChange={handleChange}
                      className="form-control rounded fancy-input form-with-fixed-feedback"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Tracking Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* IMEI + ICCID */}
              <Row>
                <Col md={6}>
                  <Form.Group
                    controlId="imei"
                    className="p-4 form-label fw-semibold form-group-fixed"
                  >
                    <Form.Label className="ms-3 mb-2">
                      IMEI <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="imei"
                      placeholder="Enter IMEI Number"
                      value={formData.imei}
                      onChange={handleChange}
                      className="form-control rounded fancy-input form-with-fixed-feedback"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your IMEI number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group
  controlId="iccid"
  className="p-4 form-label fw-semibold form-group-fixed"
>
  <Form.Label className="ms-3 mb-2">
    ICCID/SIM Serial Number (as shown on your SIM Card)
    <span className="text-danger">*</span>
  </Form.Label>

  <div>
    <InputGroup hasValidation>
      <Form.Control
        required
        type="text"
        name="iccid"
        placeholder="Enter 19-digit SIM serial number"
        value={formData.iccid}
        onChange={handleChange}
        className="form-control rounded fancy-input form-with-fixed-feedback"
      />
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip
            id="sim-tooltip"
            style={{
              backgroundColor: "white",
              padding: "0",
            }}
          >
            <img
              src="/img/sim_number.png"
              alt="SIM Example"
              style={{ width: "120px", borderRadius: "10px" }}
            />
          </Tooltip>
        }
      >
        <InputGroup.Text
          style={{
            cursor: "pointer",
            background: "#f8f9fa",
          }}
        >
          <InfoCircle color="black" />
        </InputGroup.Text>
      </OverlayTrigger>
      <Form.Control.Feedback type="invalid">
        Please enter your SIM serial number (ICCID).
      </Form.Control.Feedback>
    </InputGroup>
  </div>
</Form.Group>

                </Col>
              </Row>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  variant="danger"
                  size="lg"
                  className="px-5 py-2 fw-semibold"
                >
                  Activate Your SIM
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
