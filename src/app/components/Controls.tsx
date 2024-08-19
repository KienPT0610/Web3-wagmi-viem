import React, { useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";

interface AudioPlayProps {
  src: string;
}

const Controls: React.FC<AudioPlayProps> = ({ src }) => {
  const [isPlay, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePausePlayClick = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlay(!isPlay);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (isPlay) audioRef.current.play();
    }
  };

  const handleTimeSliderChange = ({ x }: { x: number }) => {
    if (audioRef.current) {
      audioRef.current.currentTime = x;
      setCurrentTime(x);

      if (!isPlay) {
        setPlay(true);
        audioRef.current.play();
      }
    }
  };

  return (
    <div style={styles.controls}>
      <div style={styles.play} onClick={handlePausePlayClick}>
        {isPlay ? <CiPause1 /> : <CiPlay1 />}
      </div>
      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        styles={styles.time}
      />
      <audio
        ref={audioRef}
        src={src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
};

const styles = {
  controls: {
    display: "flex",
    alignItems: "center",
    // justifyContent: 'center',
    marginBottom: "5px", 
  },
  time: {
    track: {
      backgroundColor: "#e3e3e3",
      height: "4px",
      borderRadius: "2px", 
    },
    active: {
      backgroundColor: "#333",
      height: "4px", 
      borderRadius: "2px", 
    },
    thumb: {
    //   marginTop: "0px", 
      marginLeft: "-4px", 
      width: "16px", 
      height: "16px", 
      backgroundColor: "#333",
      borderRadius: "50%", 
    },
  },
  play: {
    marginRight: "15px", 
    fontSize: "20px", 
  },
};

export default Controls;