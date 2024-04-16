import { Typography, Divider } from "antd";

const { Title } = Typography;

const About = () => {
  return (
    <div className="container">
      <Title level={2}>About</Title>
      <Divider />
      <Title level={4} type="secondary">
        Providing two services that will change the face of AI
      </Title>
      <Title level={3} type="success">
        1. Kateb
      </Title>
      <Title level={4}>
        This service will take your Arabic audio data and convert it to text. To
        use the service you send requests to the kateb API, here are the details
        of the kateb api
      </Title>

      <Title level={3} type="success">
        2. Natiq
      </Title>
      <Title level={4}>
        This service will take text and speak it. To use the service you send
        requests to the Natiq API, here are the details of the Natiq api
      </Title>
    </div>
  );
};

export default About;
