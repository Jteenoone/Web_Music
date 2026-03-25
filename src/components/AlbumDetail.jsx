import jack from '../assets/images/j97.jpg';
import sontung from '../assets/images/sontung-mtp.jpg';
import { Item } from './Item';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause } from "react-icons/fa";
import { useState } from 'react';


export default function AlbumDetail({content}) {
    const {id} = useParams();
    const [activeId, setActiveId] = useState(null);
    const albums = [
  {
    id: 1,
    name: "Đóm",
    singer: "Jack",
    image: jack,
    songs: [
      {
        stt: 1,
        image:jack,
        name: "Đom Đóm",
        singer: "Jack",
        duration: "5:11"
      },
      {
        stt: 2,
        image:jack,
        name: "Hoa Hải Đường",
        singer: "Jack",
        duration: "4:20"
      }
    ]
  },
  {
    id: 2,
    name: "Sky",
    singer: "Sơn Tùng",
    image: sontung,
    songs: [
      {
        stt: 1,
        image:sontung,
        singer: "SonTung",
        name: "Em Của Ngày Hôm Qua",
        duration: "3:15"
      },
      {
        stt: 2,
        image:sontung,
        singer: "SonTung",
        name: "Âm Thầm Bên Em",
        duration: "3:11"
      },
      {
        stt: 3,
        image:sontung,
        singer: "SonTung",
        name: "Chạy Ngay Đi",
        duration: "4:05"
        }
      ]
    }
  ];

    const album = albums.find(item => item.id === Number(id));
    return (
        <div className="bg-[#121212] min-h-screen text-white pb-10">
            {/* Header */}
            <div className="flex flex-col gap-4 p-6 pb-4 bg-gradient-to-b from-[#00FFF9] via-[#00FFF9] to-[#121212] sm:flex-row sm:items-end sm:px-6 sm:pt-10 sm:pb-6">
                <img
                    src={album.image}
                    alt={album.name}
                    className="w-[220px] h-[220px] object-cover rounded-[4px] shadow-[0_8px_32px_rgba(0,0,0,0.6)] shrink-0"
                />
                <div className="flex flex-col justify-end gap-1.5">
                    <h4 className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-white/80">Public Playlist</h4>
                    <h2 className="m-0 text-[clamp(28px,5vw,72px)] font-black leading-[1.05] tracking-[-0.02em] text-white">
                        {content ? content : 'Loading..'}
                    </h2>
                </div>
                {/* Controls */}
                <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1db954] border-none cursor-pointer transition-all duration-150 shadow-[0_4px_16px_rgba(29,185,84,0.45)] shrink-0 hover:bg-[#1ed760] hover:scale-[1.06] active:scale-[0.97]">
                        <FaPlay color='' fontSize='20px'/>
                    </button>
                </div>
            </div>

            {/* Track table */}
            <div>
                <table className="w-full border-collapse px-6 table-fixed">
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
                    {/* Data */}
                    <tbody>
                        {album.songs.map(item =>
                            <tr
                                key={item.stt}
                                className="rounded-md transition-colors duration-150 cursor-pointer hover:bg-white/[0.07]"
                            >
                                <td
                                    className="py-2.5 pr-0 text-[15px] text-[#a7a7a7] text-center whitespace-nowrap overflow-hidden text-ellipsis"
                                    onMouseEnter={() => setActiveId(item.stt)}
                                    onMouseLeave={() => setActiveId(null)}
                                >
                                    {activeId === item.stt ? <FaPlay /> : item.stt}
                                </td>
                                <td className="py-2.5 pr-4 text-sm text-white whitespace-nowrap overflow-hidden text-ellipsis">
                                    <Item srcImg={item.image} nameSinger={item.singer} nameSong={item.name}/>
                                </td>
                                <td className="py-2.5 pr-4 text-sm text-[#b3b3b3] whitespace-nowrap overflow-hidden text-ellipsis">{album.name}</td>
                                <td className="py-2.5 pr-2 text-sm text-[#b3b3b3] text-right whitespace-nowrap overflow-hidden text-ellipsis">{item.duration}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
