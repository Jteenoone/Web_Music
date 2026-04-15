import SongCard from './SongCard';
import src_img from '../assets/images/img.jpg';
import { songs } from '../data/Song';

export default function FeaturedSongs() {
  return (
    <div className="text-white mt-6">
        <h3 className="text-[25px] mb-2.5">Bài hát nổi bật</h3>
        <div className="flex gap-[30px] items-stretch">
           <div className="flex-1 flex flex-col">
            {songs.slice(0, 4).map(item => (
              <SongCard key={item.id ?? item.name} item={item}/>
            ))}
          </div>
          <img src={src_img} alt="" className="w-[400px] h-full object-cover rounded-lg"/>
        </div>
    </div>
  );
}
