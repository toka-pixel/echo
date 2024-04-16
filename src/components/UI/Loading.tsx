import { Spin, Typography } from "antd";

const { Title } = Typography;

const Loading = () => {
  return (
    <div className="backdrop">
      <div style={{ textAlign: "center"}}>
        <Spin  />
        <Title level={4} style={{ color: "white" , marginTop:'10px' }}>
          Loading....
        </Title>
      </div>
    </div>
  );
};

export default Loading;
