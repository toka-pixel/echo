import { AudioOutlined } from "@ant-design/icons";
import { Typography, Modal } from "antd";
import Recorder from "./Recorder";
import { useState } from "react";

const RecorderView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="recordView" onClick={showModal}>
        <AudioOutlined />

        <Typography>Record with your mic</Typography>
      </div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Recorder />
        </Modal>
      )}
    </>
  );
};

export default RecorderView;
