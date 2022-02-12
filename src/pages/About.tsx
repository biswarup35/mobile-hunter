import { Container } from "../components";
import { Markdown } from "../views";

const About = () => {
  return (
    <Container className="my-2" maxWidth="md">
      <Markdown>
        {`## About
Mobile Hunter is an independent publication dedicated to the world of Smartphone consumers and the Smartphone tech enthusiasts.
        
At Mobile Hunter we aim to connect you to the world of Smartphones with occasional analysis, opinions and anything related to the world of smartphones.
          `}
      </Markdown>
    </Container>
  );
};

export default About;
