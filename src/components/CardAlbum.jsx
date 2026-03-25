import src from '../assets/images/j97.jpg';

export default function CardAlbum({src_img, name_album, name_singer, onClick}) {
    return (
        <div className="mb-[50px] cursor-pointer" onClick={onClick}>
            <img src={src_img} alt="Album" className="w-full aspect-square object-cover rounded-lg"/>
            <h4>{name_album || "loading..."}</h4>
            <p>{name_singer || "loading..."}</p>
        </div>
    );
}
