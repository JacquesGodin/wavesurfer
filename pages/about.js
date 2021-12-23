import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#c203fc",
  progressColor: "#cad9d9",
  cursorColor: "OrangeRed",
  barWidth: 1,
  barRadius: 1,
  responsive: true,
  height: 300,
  normalize: true,
  maxCanvasWidth: 1000,
  partialRender: false
});

export default function AboutPage() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);

  const url =
    "https://gateway.pinata.cloud/ipfs/Qmdx1Wg8Kp49GV6LcwTRKaEFJNZdVMVgbDAht3PCXvwZ7f";

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    
  };

  const download = () => {
    
    console.log(wavesurfer.current.exportImage('image/png',1))
    console.log("Saved")
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
    console.log("Play");
  };
  return (
    <div>
      <Link href="/some">About us</Link>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <div onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</div>
        <div onClick={download}>{"Download"}</div>
      </div>
    </div>
  );
}
