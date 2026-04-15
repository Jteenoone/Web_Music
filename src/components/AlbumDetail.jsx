import { albums } from '../data/Albums';
import { TrackItem } from './TrackItem';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause } from "react-icons/fa";
import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function AlbumDetail() {
    const { id } = useParams();
    const [hoveredStt, setHoveredStt] = useState(null);
    const { playSong, currentSong, isPlaying } = usePlayer();

    const album = albums.find(item => item.id === Number(id));

    if (!album) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-white text-lg">
                Không tìm thấy album
            </div>
        );
    }

    // Convert album song to player-compatible format
    const toPlayerSong = (song) => ({
        id: `album-${album.id}-${song.stt}`,
        name: song.name,
        singer: song.singer,
        src_img: song.image,
        url: song.url,
    });

    const albumQueue = album.songs.map(toPlayerSong);

    const handlePlayAlbum = () => {
        if (album.songs.length > 0) {
            playSong(albumQueue[0], albumQueue);
        }
    };

    const handlePlaySong = (song) => {
        playSong(toPlayerSong(song), albumQueue);
    };

    return (
        <div className="bg-[#121212] min-h-screen text-white pb-10">
            {/* Header */}
            <div className="flex flex-col gap-4 p-6 pb-4 bg-gradient-to-b from-[#00adb5] via-[#005f73] to-[#121212] sm:flex-row sm:items-end sm:px-6 sm:pt-10 sm:pb-6">
                <img
                    src={album.image}
                    alt={album.name}
                    className="w-[220px] h-[220px] object-cover rounded-[4px] shadow-[0_8px_32px_rgba(0,0,0,0.6)] shrink-0"
                />
                <div className="flex flex-col justify-end gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/80">Album</span>
                    <h2 className="m-0 text-[clamp(28px,5vw,72px)] font-black leading-[1.05] tracking-[-0.02em] text-white">
                        {album.name}
                    </h2>
                    <p className="text-sm text-white/70 m-0">
                        {album.singer} &bull; {album.songs.length} bài hát
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 px-6 pt-5 pb-2">
                <button
                    onClick={handlePlayAlbum}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1db954] border-none cursor-pointer transition-all duration-150 shadow-[0_4px_16px_rgba(29,185,84,0.4)] hover:bg-[#1ed760] hover:scale-[1.06] active:scale-[0.97]"
                >
                    <FaPlay color="#fff" fontSize="20px"/>
                </button>
            </div>

            {/* Track table */}
            <div className="px-6">
                <table className="w-full border-collapse table-fixed">
                    <colgroup>
                        <col style={{ width: '40px' }} />
                        <col />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '60px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="py-1.5 pr-4 text-[11px] font-medium tracking-[0.1em] uppercase text-[#a7a7a7] border-b border-white/10 text-center">#</th>
                            <th className="py-1.5 pr-4 text-[11px] font-medium tracking-[0.1em] uppercase text-[#a7a7a7] border-b border-white/10 text-left">Title</th>
                            <th className="py-1.5 pr-4 text-[11px] font-medium tracking-[0.1em] uppercase text-[#a7a7a7] border-b border-white/10 text-left">Album</th>
                            <th className="py-1.5 pr-2 text-[11px] font-medium tracking-[0.1em] uppercase text-[#a7a7a7] border-b border-white/10 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {album.songs.map(song => {
                            const songId = `album-${album.id}-${song.stt}`;
                            const isCurrent = currentSong?.id === songId;
                            return (
                                <tr
                                    key={song.stt}
                                    className="rounded-md transition-colors duration-150 cursor-pointer hover:bg-white/[0.07]"
                                    onClick={() => handlePlaySong(song)}
                                    onMouseEnter={() => setHoveredStt(song.stt)}
                                    onMouseLeave={() => setHoveredStt(null)}
                                >
                                    <td className="py-2.5 pr-0 text-[15px] text-[#a7a7a7] text-center">
                                        {isCurrent && isPlaying ? (
                                            <FaPause size={13} color="#1db954"/>
                                        ) : hoveredStt === song.stt ? (
                                            <FaPlay size={13}/>
                                        ) : (
                                            <span className={isCurrent ? 'text-[#1db954]' : ''}>{song.stt}</span>
                                        )}
                                    </td>
                                    <td className="py-2.5 pr-4 text-sm text-white whitespace-nowrap overflow-hidden text-ellipsis">
                                        <TrackItem srcImg={song.image} nameSinger={song.singer} nameSong={song.name}/>
                                    </td>
                                    <td className="py-2.5 pr-4 text-sm text-[#b3b3b3] whitespace-nowrap overflow-hidden text-ellipsis">
                                        {album.name}
                                    </td>
                                    <td className="py-2.5 pr-2 text-sm text-[#b3b3b3] text-right whitespace-nowrap">
                                        {song.duration}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
