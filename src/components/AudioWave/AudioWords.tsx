import React from "react";
import { Iwords } from "../../interfaces/Iwords";
import Typography from "antd/es/typography/Typography";


type AudioWords = {
  words: Array<Iwords>;
};

// to display words returned from Kateb
const AudioWords: React.FC<AudioWords> = ({ words }) => {
  return (
    <div className="audioWords">
      {words.map(({ text }) => (
        <Typography className="word">{text}</Typography>
      ))}
    </div>
  );
};

export default AudioWords;
