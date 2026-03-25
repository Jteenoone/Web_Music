export default function SidebarItem ({srcImg, name, type}) {
  return (
    <div className="flex gap-2.5 my-2.5">
      <img src={srcImg} alt='avatar' className="w-[50px] aspect-square object-cover rounded-full"/>
      <div>
        <p>{name}</p>
        <p>{type}</p>
      </div>
    </div>
  );
}
