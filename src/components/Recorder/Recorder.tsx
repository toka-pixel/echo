import {
  AudioOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  BorderOutlined,
} from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { Button, Typography, message } from "antd";
import Timer from "./Timer";
import { RecordStatus } from "../../enums/RecordStatus";
import useFetchEcho from "../../hooks/useFetchEcho";
import Loading from "../UI/Loading";
import AudioWaveform from "../AudioWave/AudioWaveform";
import AudioWords from "../AudioWave/AudioWords";

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<any>(null);
  const audioChunks = useRef<any>([]);

  const state = mediaRecorderRef?.current?.state;

  const { loading, error, response, words, fetchEcho } = useFetchEcho();

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

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        (state === RecordStatus.Recording || state === RecordStatus.Paused)
      ) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    };
  }, []);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.addEventListener("dataavailable", (e: any) => {
      audioChunks.current.push(e.data);
    });

    mediaRecorderRef.current.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/mpeg" });
      setAudioURL(audioBlob);
    });
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && state === RecordStatus.Recording) {
      mediaRecorderRef.current.pause();
      setRecording(false);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleResumeRecording = () => {
    mediaRecorderRef.current.resume();

    if (mediaRecorderRef.current && state === RecordStatus.Paused) {
      mediaRecorderRef.current.resume();
      setRecording(true);
    }
  };

 

  const handleEcho = () => {
    if (audioURL) {
      fetchEcho(audioURL);
    }
  };

  return (
    <div className="recorder">
      <Timer state={state} />

      {!state || state === RecordStatus.Inactive ? (
        <>
          <Typography> Press the microphone to record</Typography>
          <Button
            icon={<AudioOutlined />}
            shape="circle"
            size="large"
            title="Start Recording"
            onClick={handleStartRecording}
            disabled={recording}
            style={{ margin: "10px 0" }}
          />
        </>
      ) : (
        <>
          {state === RecordStatus.Recording ? (
            <Button
              onClick={handlePauseRecording}
              disabled={!recording}
              icon={<PauseCircleOutlined />}
              shape="circle"
              size="large"
              title="Pause Recording"
            />
          ) : (
            <Button
              onClick={handleResumeRecording}
              icon={<PlayCircleOutlined />}
              shape="circle"
              size="large"
              disabled={recording}
              title="Resume Recording"
            />
          )}
          <Button
            onClick={handleStopRecording}
            icon={<BorderOutlined />}
            shape="circle"
            size="large"
            title="Stop Recording"
            danger
            style={{ marginLeft: "10px" }}
          />
        </>
      )}
      {audioURL && state === RecordStatus.Inactive && !response && (
        <div>
          <audio
            controls
            src={URL.createObjectURL(audioURL)}
            style={{ margin: "10px 0" }}
          />
          <Button
            type="primary"
            style={{ width: "60%", borderRadius: "25px" }}
            onClick={handleEcho}
          >
            Echo
          </Button>
        </div>
      )}
      {loading && <Loading />}
      {response && (
        <>
          <AudioWaveform audio={audioURL} />
          <AudioWords words={words} />
        </>
      )}
    </div>
  );
};

export default Recorder;
