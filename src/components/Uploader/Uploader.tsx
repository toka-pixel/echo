import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Modal, Upload, Typography, Button, message } from "antd";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import useFetchEcho from "../../hooks/useFetchEcho";
import AudioWaveform from "../AudioWave/AudioWaveform";
import AudioWords from "../AudioWave/AudioWords";

const { Dragger } = Upload;
const { Paragraph } = Typography;

const Uploader = () => {
  const [file, setFile] = useState<Blob | null>(null);

  const { loading, words, error, response, fetchEcho, resetResponse } =
    useFetchEcho();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (response) {
      message.success("The resulting audio has been successfully fetched");
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      message.error("Failed to fetch output audio");
    }
  }, [error]);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    onChange(info: any) {
      const blob = new Blob([info.file], { type: "audio/mpeg" });
      setFile(blob);
      showModal();
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetResponse();
  };

  const handleEcho = () => {
    if (file) fetchEcho(file);
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <Paragraph>Click or drag audio file to this area to upload</Paragraph>
      </Dragger>

      {isModalOpen && file && (
        <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
          <div style={{ textAlign: "center" }}>
            {!response ? (
              <>
                <audio
                  controls
                  src={URL.createObjectURL(file)}
                  style={{ margin: "10px 0" }}
                />

                <Button
                  onClick={handleEcho}
                  style={{ width: "60%", borderRadius: "25px" }}
                  disabled={!file}
                  type="primary"
                >
                  Echo
                </Button>
              </>
            ) : (
              <>
                <AudioWaveform audio={response} />
                <AudioWords words={words} />
              </>
            )}
          </div>
        </Modal>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Uploader;
