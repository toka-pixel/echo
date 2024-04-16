import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { RecordStatus } from "../../enums/RecordStatus";

const { Title } = Typography;

interface ITimer {
  state: RecordStatus;
}

const Timer: React.FC<ITimer> = ({ state }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any = null;

    //counter for time of record
    if (state === RecordStatus.Recording) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, state]);

  //the formatTime function formats the minutes and seconds into a string in the format MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Title level={1}>{formatTime(time)}</Title>
    </div>
  );
};

export default Timer;
