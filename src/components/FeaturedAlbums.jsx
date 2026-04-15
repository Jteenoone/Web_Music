import AlbumCard from "./AlbumCard";
import { albums } from '../data/Albums';
import { useNavigate } from "react-router-dom";

export default function FeaturedAlbums() {
    const navigate = useNavigate();

    return (
        <div className="text-white mt-6">
            <h3 className="mt-5 mb-2.5 text-[25px]">Album nổi bật</h3>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
                {albums.map((album) => (
                    <AlbumCard
                        key={album.id}
                        src_img={album.image}
                        name_album={album.name}
                        name_singer={album.singer}
                        onClick={() => navigate(`/album/${album.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
