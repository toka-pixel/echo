import { Typography, Divider } from "antd";

const { Title } = Typography;

const Home = () => {
  return (
    <div className="container">
      <Title level={2}>Home</Title>
      <Divider />
      <Title level={3} type="secondary">
        The service will allow the user to upload an arabic audio file, or
        record arabic audio from a mic. The service will then speak this audio
        but with an electronic voice, and it will also speak the last word 3
        times, creating an echo
        Providing two services that will change the face of AI
      </Title>
     
    </div>
  );
};

export default Home;
