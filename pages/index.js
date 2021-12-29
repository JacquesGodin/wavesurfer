import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import React from 'react';
import { TwitterPicker } from 'react-color';
//import { imageToBase64, base64ToImage } from "base64-2-img";




// Create the component color picker
class Component extends React.Component {
  handleChangeComplete(color, event) {
  }

  render() {
    return <TwitterPicker onChange={ this.handleChangeComplete }/>;
  }
}

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#0178FF",
  cursorColor: "OrangeRed",
  barWidth: 1,
  barRadius: 2,
  responsive: true,
  height: 500,
  normalize: true,
  backgroundColor: 'white',
  partialRender: true
});

export default function IndexPage() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);

// predefined URL. The ideal is to only load the waveform once the user has input a link
  const url =
    "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";


// Upload the link to the song's location
const submitLink = async (event) => {
    event.preventDefault();
    const link = event.target.link.value;
    const radius = event.target.radius.value;
    const width = event.target.width.value;
    const color = event.target.color.value;

    const formWaveSurferOptions = (ref) => ({
      container: ref,
      waveColor: color,
      progressColor: "#0178FF",
      cursorColor: "OrangeRed",
      barWidth: width,
      barRadius: radius,
      responsive: true,
      height: 500,
      normalize: true,
      backgroundColor: 'white',
      partialRender: true
    });

    console.log(color)

    // make variable url to be equals to the provided link
    const url = link

    const WaveSurfer = (await import("wavesurfer.js")).default;

    // destroy the current displayed waveform
    wavesurfer.current.destroy();

    // get the options again
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url)
  };


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

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const display = () => {
  }

  const download = () => {
    
    console.log(wavesurfer.current.exportImage('image/png',1))
    console.log("Saved")


    var image = new Image();
    image.src = wavesurfer.current.exportImage('image/png',1);
    document.body.appendChild(image);
    //document.body.style = 'background: red;';

    return (<a href={image} download>Click to download</a>)
  
  }

  const MyButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        Next
      </a>
    )
  })

  return (
    
    <div>
      
    <div id="waveform" ref={waveformRef} />
    <form className='flex flex-col' onSubmit={submitLink}>
	    
      <label htmlFor='link' className='mb-2 italic'>Link</label>
	    <input className='mb-4 border-b-2' id='link' name='link' type='text' autoComplete='link' required />
      
      <label htmlFor='radius' className='mb-2 italic'>Radius</label>
	    <input className='mb-4 border-b-2' id='radius' name='radius' type='number' autoComplete='radius' required />
      
      <label htmlFor='width' className='mb-2 italic'>Witdh</label>
	    <input className='mb-4 border-b-2' id='width' name='width' type='number' autoComplete='width' required />
      
      {/* <TwitterPicker htmlFor='color' className='mb-2 italic'>Color </TwitterPicker> */}
      <input className='mb-5 border-b-2' id='color' name='color' type='color' autoComplete='color'/>
      
      <button type='submit' className='px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700'>Submit</button>
    </form>
      <div className="controls">
        <div onClick={handlePlayPause}>{!playing ? "Playing" : "Pause"}</div>
              </div>
      <div onClick={download}>{"Download"}</div>
      <Link href="/styletransfer" passHref>
        <MyButton />
      </Link>
      
    </div>
  );
}
