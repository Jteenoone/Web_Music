import { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());
    const playSong = (song) => {
        if(currentSong?.id === song.id) {
            if(audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            console.log(isPlaying);
            return;
        }
        audioRef.current.src = song.url;
        audioRef.current.load();
        audioRef.current.addEventListener('canplay' , () => {
            audioRef.current.play();
        }, {once: true});
        setCurrentSong(song);
        setIsPlaying(true);
    };

    return (
        <PlayerContext.Provider value={{currentSong, isPlaying, playSong, audioRef }}>
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);
