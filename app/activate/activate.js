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
  Modal,
  Spinner,
} from "react-bootstrap";
import { InfoCircle, CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

export default function ActivateSim() {
  const [formData, setFormData] = useState({
    iccid: "",
    deliveriesID: "",
    trackingNumber: "",
    imei: "",
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modal, setModal] = useState({
    show: false,
    type: null, // "success" | "error"
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setModal({ show: false, type: null, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    try {
      const response = await activateSim(formData);

      if (response?.error) {
        const rawError =
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error);

        const friendlyMessage = rawError.includes("Couldn't find Delivery with")
          ? "Invalid Delivery ID. Please check and try again."
          : "Invalid inputs. Please review your details and try again.";

        setModal({
          show: true,
          type: "error",
          message: friendlyMessage,
        });
      } else {
        setModal({
          show: true,
          type: "success",
          message: "Your Zoiko SIM has been successfully activated! Welcome aboard.",
        });
        setFormData({ iccid: "", deliveriesID: "", trackingNumber: "", imei: "" });
        setValidated(false);
      }
    } catch (error) {
      setModal({
        show: true,
        type: "error",
        message:
          error?.message ||
          "Something went wrong while activating your SIM. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .fancy-input {
          height: 50px;
          border: 1px solid black;
          border-radius: 20px !important;
        }

        /* When inside InputGroup, only round left side */
        .input-group .fancy-input {
          border-radius: 20px 0 0 20px !important;
        }

        /* Round the right side of the info icon button */
        .input-group .input-group-text {
          border-radius: 0 20px 20px 0 !important;
          border: 1px solid black;
          background: #f8f9fa;
        }

        /* Each form group has natural bottom margin — NO absolute positioning */
        .sim-form-group {
          margin-bottom: 1.5rem;
        }

        /* Feedback text sits naturally below the input */
        .sim-form-group .invalid-feedback,
        .sim-feedback {
          display: none;
          font-size: 0.83rem;
          color: #dc3545;
          padding-left: 14px;
          margin-top: 5px;
        }

        /* Show feedback when form is validated */
        .was-validated .sim-form-group .invalid-feedback {
          display: block;
        }

        /* Manual feedback for ICCID outside InputGroup */
        .sim-feedback.show {
          display: block;
        }

        /* Modal icons */
        .modal-icon-success {
          font-size: 3.5rem;
          color: #28a745;
        }
        .modal-icon-error {
          font-size: 3.5rem;
          color: #dc3545;
        }
        .modal-title-success {
          color: #28a745;
          font-weight: 700;
        }
        .modal-title-error {
          color: #dc3545;
          font-weight: 700;
        }

        /* Responsive: ensure inputs don't overflow on small screens */
        @media (max-width: 576px) {
          .sim-form-wrapper {
            padding: 1rem !important;
            margin: 0.5rem !important;
          }
        }
      `}</style>

      <Header />
      <HeadBar text="Zoiko Mobile SIM Activation" />

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <h2 className="text-center fw-bold mb-4">
              Now Activate Your Zoiko SIM Card
            </h2>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="p-4 shadow rounded sim-form-wrapper"
            >
              {/* Row 1: Delivery ID + Tracking Number */}
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="deliveryId" className="sim-form-group px-2">
                    <Form.Label className="ms-1 mb-2 fw-semibold">
                      Delivery ID <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="deliveriesID"
                      placeholder="Enter Delivery ID"
                      value={formData.deliveriesID}
                      onChange={handleChange}
                      className="fancy-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Delivery ID.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="trackingNumber" className="sim-form-group px-2">
                    <Form.Label className="ms-1 mb-2 fw-semibold">
                      Tracking Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="trackingNumber"
                      placeholder="Enter Tracking Number"
                      value={formData.trackingNumber}
                      onChange={handleChange}
                      className="fancy-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Tracking Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Row 2: IMEI + ICCID */}
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="imei" className="sim-form-group px-2">
                    <Form.Label className="ms-1 mb-2 fw-semibold">
                      IMEI <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="imei"
                      placeholder="Enter IMEI Number"
                      value={formData.imei}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, imei: val });
                      }}
                      pattern="\d+"
                      inputMode="numeric"
                      className="fancy-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid IMEI number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="iccid" className="sim-form-group px-2">
                    <Form.Label className="ms-1 mb-2 fw-semibold">
                      ICCID/SIM Serial Number (as shown on your SIM Card)
                      <span className="text-danger">*</span>
                    </Form.Label>

                    {/* InputGroup for input + info icon side by side */}
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="iccid"
                        placeholder="Enter 19-digit SIM serial number"
                        value={formData.iccid}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, iccid: val });
                        }}
                        pattern="\d{19}"
                        inputMode="numeric"
                        maxLength={19}
                        className="fancy-input"
                      />
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip
                            id="sim-tooltip"
                            style={{ backgroundColor: "white", padding: "0" }}
                          >
                            <img
                              src="/img/sim_number1.png"
                              alt="SIM Example"
                              style={{ width: "120px", borderRadius: "10px" }}
                            />
                          </Tooltip>
                        }
                      >
                        <InputGroup.Text style={{ cursor: "pointer" }}>
                          <InfoCircle color="black" />
                        </InputGroup.Text>
                      </OverlayTrigger>
                    </InputGroup>

                    {/*
                      Bootstrap's .invalid-feedback only works as a direct sibling
                      of the invalid input. Because InputGroup wraps the input,
                      we use a manual div that reads the validated state instead.
                    */}
                    <div
                      className={`sim-feedback ${
                        validated &&
                        (!formData.iccid || !/^\d{19}$/.test(formData.iccid))
                          ? "show"
                          : ""
                      }`}
                    >
                      Please enter a valid 19-digit SIM serial number.
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit Button */}
              <div className="text-center mt-2">
                <Button
                  type="submit"
                  variant="danger"
                  size="lg"
                  className="px-5 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Activating...
                    </>
                  ) : (
                    "Activate Your SIM"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Success / Error Modal */}
      <Modal
        show={modal.show}
        onHide={handleCloseModal}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-0 pb-0" />
        <Modal.Body className="text-center px-5 pb-4">
          {modal.type === "success" ? (
            <>
              <CheckCircleFill className="modal-icon-success mb-3" />
              <h4 className="modal-title-success mb-3">Activation Successful!</h4>
              <p className="text-muted">{modal.message}</p>
            </>
          ) : (
            <>
              <XCircleFill className="modal-icon-error mb-3" />
              <h4 className="modal-title-error mb-3">Activation Failed</h4>
              <p className="text-muted">{modal.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center pt-0 pb-4">
          <Button
            variant={modal.type === "success" ? "success" : "danger"}
            onClick={handleCloseModal}
            className="px-5 fw-semibold rounded-pill"
          >
            {modal.type === "success" ? "Great, thanks!" : "Try Again"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}