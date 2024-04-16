
import Uploader from "../components/Uploader/Uploader";
import RecorderView from "../components/Recorder/RecorderView";
import { Divider } from "antd";

const Echo = () => {
  return (
    <div className="container">
      <div>
        <Uploader />
        <Divider>OR</Divider>
        <RecorderView />
      </div>
    </div>
  );
};

export default Echo;
