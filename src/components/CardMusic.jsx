import {FaPlay} from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';

export default function CardMusic({item}) {
    const {playSong} = usePlayer();
    if (!item) return null;
    const n_name = item?.name ?? "Loading...";
    const n_singer = item?.singer ?? "Loading...";
    return (
    <div className="flex justify-between items-center px-2.5 py-2.5 border-b border-white/10 text-white bg-[#272D43]">
        <img src={item.src_img} alt='avatar' className="w-[45px] h-[45px] rounded-md object-cover"/>
        <div className="flex-1">
            <h4>{n_name}</h4>
            <p>{n_singer}</p>
        </div>
        <button
            onClick={() => playSong(item)}
            className="flex justify-center items-center rounded-full bg-[#323750] w-10 h-10"
        >
            <FaPlay color='white'/>
        </button>
    </div>
    );
}
