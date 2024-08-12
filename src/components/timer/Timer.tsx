import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TotalTimer from "../totaltimer/TotalTimer";
import {
  Col,
  Container,
  FloatingLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import TimerModal from "../timermodal/TimerModal";

const Timer: React.FC = () => {
  const [inhale, setInhale] = useState<number>(0);
  const [hold, setHold] = useState<number>(0);
  const [exhale, setExhale] = useState<number>(0);
  const [cycle, setCycle] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  console.log(isPlaying);
  
  const handleClose = () => {
    setIsPlaying(false);
    setShow(false);
    console.log(setIsPlaying, setShow);

  };
  const handleShow = () => {
    setIsPlaying(true);
    setShow(true);
  };

  const handleInhale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInhale(Number(e.target.value));
  };

  const handleHold = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHold(Number(e.target.value));
  };

  const handleExhale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExhale(Number(e.target.value));
  };

  const handleCycle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCycle(Number(e.target.value));
  };

  const calculateTotalTime = (
    inhale: number,
    hold: number,
    exhale: number,
    cycle: number
  ) => {
    const total = (inhale + hold + exhale) * cycle;

    const minutes = Math.floor(total / 60);
    const seconds = total % 60;

    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds} second${
        seconds !== 1 ? "s" : ""
      }`;
    }

    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  };

  const totalTimeInSeconds = (inhale + hold + exhale) * cycle;
  const formattedTotalTime = calculateTotalTime(inhale, hold, exhale, cycle);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleShow(); // Show the modal when the form is submitted
  };

  useEffect(() => { },[isPlaying])

  return (
    <Container
      className="mt-5 shadow-lg rounded-5 c-bg-dark">
      <Row className="p-5">
        <Col xs={12} md={6}>
          <h1 className="p-2">Enter breath counts below</h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <FloatingLabel controlId="floatingInputGrid" label="Inhale Count">
                <Form.Control
                  type="text"
                  placeholder="Inhale"
                  onChange={handleInhale}
                />
              </FloatingLabel>
              <InputGroup.Text>seconds</InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <FloatingLabel controlId="floatingInputGrid" label="Hold Count">
                <Form.Control
                  type="text"
                  placeholder="Hold"
                  onChange={handleHold}
                />
              </FloatingLabel>
              <InputGroup.Text>seconds</InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <FloatingLabel controlId="floatingInputGrid" label="Exhale Count">
                <Form.Control
                  type="text"
                  placeholder="Exhale"
                  onChange={handleExhale}
                />
              </FloatingLabel>
              <InputGroup.Text >seconds</InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <FloatingLabel controlId="floatingInputGrid" label="Cycle Count">
                <Form.Control
                  type="text"
                  placeholder="Cycle"
                  onChange={handleCycle}
                />
              </FloatingLabel>
              <InputGroup.Text>times</InputGroup.Text>
            </InputGroup>

            <div className="d-flex justify-content-center">
              <Button size="lg" variant="primary" type="submit">
                Start
              </Button>
            </div>
          </Form>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center p-5"
        >
          <Row>
            <TotalTimer
              formattedTotalTime={formattedTotalTime} // Pass the formatted total time to TotalTimer
            />
          </Row>
          <Row>
            <TimerModal
              show={show}
              handleClose={handleClose}
              totalTime={totalTimeInSeconds}
              inhale={inhale}
              hold={hold}
              exhale={exhale}
              cycle={cycle} // Pass the total time in seconds to TimerModal
              isPlaying={isPlaying}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Timer;
