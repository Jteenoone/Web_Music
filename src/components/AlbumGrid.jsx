import CardAlbum from "./CardAlbum";
import j97 from '../assets/images/j97.jpg';
import sontung from '../assets/images/sontung-mtp.jpg';
import { useNavigate } from "react-router-dom";

export default function Album() {
    const navigate = useNavigate();
    const albums = [
    {
        id: 1,
        src_img: j97,
        name_album: "Đóm",
        name_singer: "Jack"

    },
    {
        id: 2,
        src_img: sontung,
        name_album: "Album2",
        name_singer: "Singer 2"

    },
    {
        id: 3,
        src_img: "",
        name_album: "Sky",
        name_singer: "Sơn Tùng"
    },
    {
        id: 4,
        src_img: "",
        name_album: "Sky",
        name_singer: "Sơn Tùng"
    },
    {
        id: 5,
        src_img: "",
        name_album: "Sky",
        name_singer: "Sơn Tùng"
    },
    {
        id: 6,
        src_img: "",
        name_album: "Sky",
        name_singer: "Sơn Tùng"
    },
    {
        id: 7,
        src_img: "",
        name_album: "Sky",
        name_singer: "Sơn Tùng"
    },
    {
        id: 8,
        src_img: "",
        name_album: "Sky",
        name_singer: "Sơn Tùng"
    }
    ];

    return (
        <div className="text-white">
            <h3 className="mt-5 mb-2.5 text-[25px]">Album nổi bật</h3>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
                {albums.map((album) => (
                    <CardAlbum
                    key={album.id}
                    src_img={album.src_img}
                    name_album={album.name_album}
                    name_singer={album.name_singer}
                    onClick={() => navigate(`/album/${album.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
