import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import "./footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
      <div
        className="mt-5 w-full bg-info-subtle">
        <Stack className="text-center mt-5">
          <Container>
            <Row className="my-4">
              <Col xs={12} md={6}>
                <h4>Send me suggestions to improve the app</h4>
                <Container>
                  <Form className="suggestion-form">
                    {/* Text Area for Suggestions */}
                    <FloatingLabel
                      controlId="floatingTextarea"
                      label="Leave your suggestions here"
                      className="mb-3"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave your suggestions here"
                      />
                    </FloatingLabel>

                    {/* Input Group for Email and Button */}
                    <InputGroup className="mb-3">
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Your Email"
                      >
                        <Form.Control type="email" placeholder="Your email" />
                      </FloatingLabel>
                    </InputGroup>
                    <Button className="w-100 h-100 rounded-end-2">
                      Send Email
                    </Button>
                  </Form>
                </Container>
              </Col>

              <Col xs={12} md={6}>
                <h3>App orchestrated by</h3>
                <h4>Arun V. S</h4>
                <div className="c-icons">
                  <h3>Find me on : </h3>

                  <article>
                    <a
                      href="https://github.com/ArunDoesCode?tab=repositories"
                      target="_blank"
                    >
                      <FaGithub className=" " />
                    </a>
                  </article>
                  <article>
                    <a
                      href="https://www.linkedin.com/in/arun-v-s-329349196/"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </a>
                  </article>
                </div>
              </Col>
            </Row>
          </Container>
        </Stack>
      </div>
    );
};

export default Footer;
