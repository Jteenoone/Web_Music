import {useEffect, useRef, useState} from 'react';

import { usePlayer } from '../context/PlayerContext';
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import {FaVolumeUp , FaVolumeMute, FaVolumeDown, FaPlay, FaPause  } from "react-icons/fa";

export default function ProgressBar() {
  const {currentSong,isPlaying,playSong ,audioRef} = usePlayer();
  if(!currentSong) return <div>Chưa có bài hát</div>

  const [isMuted, setIsMuted] = useState(false);
  const [isUp, setIsUp] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, []);

  useEffect(() => {
    if(!currentSong || !audioRef.current) return;
    audioRef.current.load();

    setCurrentTime(0);
  }, [currentSong]);
  const togglePlay = () => {
    playSong(currentSong);
  };

  const toggleUp = (e) => {
    const vol = parseFloat(e.target.value);
    setIsUp(vol >= 0.5);
    audioRef.current.volume = vol;
  }

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }
  const formatTime = (seconds) => {
    if(!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds/ 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  return (
  <div className="flex items-center justify-between bg-[#1a1f35] border-t border-[#2e3450] h-[90px] px-6 text-white gap-4">
    {/* INFO */}
    <div className="flex items-center gap-3 w-[260px] min-w-0">
      <img src={currentSong.src_img} alt='ảnh nhạc' className="w-14 h-14 object-cover rounded-lg shrink-0"/>
      <div className="flex flex-col gap-1 min-w-0">
        <p className="m-0 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{currentSong.name ? currentSong.name : 'loadding...'}</p>
        <small className="text-xs text-[#9ca3af]">{currentSong.singer ? currentSong.singer : 'loadding...'}</small>
      </div>
    </div>

    {/* PLAY CONTENT */}
    <div className="flex-1 flex flex-col items-center gap-2 max-w-[600px]">
      <div className="flex items-center gap-2">
        <button className="bg-transparent border-none cursor-pointer flex items-center justify-center p-1.5 rounded-full transition-all duration-200 hover:bg-white/10"><MdSkipPrevious size={30} color='white'/></button>
        <button
          onClick={togglePlay}
          className="bg-white! rounded-full! w-10 h-10 p-0! flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:bg-[#e5e7eb]! hover:scale-105"
        >
          {!isPlaying ? <FaPlay size={18} color='#1a1f35'/> : <FaPause size={18} color='#1a1f35'/>}
        </button>
        <button className="bg-transparent border-none cursor-pointer flex items-center justify-center p-1.5 rounded-full transition-all duration-200 hover:bg-white/10"><MdSkipNext size={30} color='white'/></button>
      </div>
      {/* Seek row */}
      <div className="flex items-center gap-2.5 w-full">
        <span className="text-xs text-[#9ca3af] whitespace-nowrap min-w-[36px] text-center">{formatTime(currentTime)}</span>
        <input type='range' max={duration} min={0} value={currentTime} onChange={handleSeek} className="flex-1"/>
        <span className="text-xs text-[#9ca3af] whitespace-nowrap min-w-[36px] text-center">{formatTime(duration)}</span>
      </div>
    </div>

    {/* VOLUME */}
    <div className="flex items-center gap-2.5 w-[180px] justify-end">
      <button
        onClick={toggleMute}
        className="bg-transparent border-none cursor-pointer flex items-center p-1 rounded-full transition-all duration-200 hover:bg-white/10"
      >
        {isMuted ? <FaVolumeMute size={30} color='white'/> : isUp ? <FaVolumeUp size={30} color='white'/> : <FaVolumeDown size={30} color='white'/>}
      </button>
      <input type='range' min='0' max='1' step='0.01' value={0.5} onChange={toggleUp} className="w-[100px]"/>
    </div>
  </div>
  );
}
