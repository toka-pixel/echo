const AudioWaveform = ({ audio }: { audio: any }) => {

  // to play wave returned from Natiq
  return (
    <div >
      <audio controls>
        <source src={audio} type="audio/wav" />
      </audio>
    </div>
  );
};

export default AudioWaveform;
