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
        // Map specific API error messages to user-friendly text
        const rawError =
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error);

        const friendlyMessage = rawError.includes(
          "Couldn't find Delivery with"
        )
          ? "Invalid Delivery ID. Please check and try again."
          : "Invalid inputs. Please review your details and try again.";

        setModal({
          show: true,
          type: "error",
          message: friendlyMessage,
        });
      } else {
        // Success
        setModal({
          show: true,
          type: "success",
          message: "Your Zoiko SIM has been successfully activated! Welcome aboard.",
        });
        // Reset form on success
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
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, imei: val });
                        }}
                        pattern="\d+"
                        inputMode="numeric"
                        className="form-control rounded fancy-input form-with-fixed-feedback"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid IMEI number.
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
        onChange={(e) => {
    const val = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, iccid: val });
  }}
  pattern="\d{19}"
  inputMode="numeric"
  maxLength={19}
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
        Please enter SIM serial number.
      </Form.Control.Feedback>
    </InputGroup>
  </div>
</Form.Group>

                </Col>
              </Row>

              {/* Submit Button */}
              {/* Submit Button */}
              <div className="text-center">
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
{/* ── Success / Error Modal ── */}
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
