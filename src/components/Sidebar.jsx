import { FaHome , FaHeart, FaList  } from "react-icons/fa";
import { TbLibrary } from "react-icons/tb"
import { IoIosAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import jack from '../assets/images/j97.jpg';
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [shownSearch, setShowSearch] = useState(false);
  const focusInput = useRef(null);
  const searchRef = useRef(null);
  useEffect(() => {
    function handleClickOutSide(e) {
      if(searchRef.current && !searchRef.current.contains(e.target) && focusInput.current.value==="") {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
      if(shownSearch) {
        focusInput.current.focus();
      }
    }, [shownSearch]);

  const list = [
    {id: 1, src: jack, name: 'Jack', type: 'Artist'},
    {id: 2,src: '', name: 'Jack', type: 'Artist'},
    {id: 3,src: '', name: 'Jack', type: 'Artist'},
    {id: 4,src: '', name: 'Jack', type: 'Artist'},
    {id: 5,src: '', name: 'Jack', type: 'Artist'}
  ];

    return (
      <div className="flex h-full flex-col text-white p-5">
          <div className="flex items-center gap-10 pb-5">
            <h3>Your Library</h3>
            <button className="flex justify-center items-center border border-[#333] rounded-[10px] px-1.5 bg-[#1E2237] shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              <IoIosAdd color="white" fontSize={20}/>Create
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="flex justify-center items-center border border-[#333] rounded-[10px] px-1.5 bg-[#1E2237] shadow-[0_4px_10px_rgba(0,0,0,0.3)]">Playlist</button>
            <button className="flex justify-center items-center border border-[#333] rounded-[10px] px-1.5 bg-[#1E2237] shadow-[0_4px_10px_rgba(0,0,0,0.3)]">Artist</button>
          </div>
          <div ref={searchRef} className="relative flex items-center h-8 my-2.5">
            {shownSearch && (
              <input
                type="text"
                placeholder="search your library"
                ref={focusInput}
                className="w-[200px] h-8 pl-[35px] opacity-100 transition-all duration-200"
              />
            )}
            <button
              onClick={() => {setShowSearch(true)}}
              className={shownSearch ? "absolute left-2 top-1/2 -translate-y-1/2 bg-transparent border-none" : "bg-transparent border-none"}
            >
              <CiSearch />
            </button>
          </div>
          {list.map((item) => {
             return <SidebarItem key={item.id} srcImg={item.src} name={item.name} type={item.type}/>
          })}
      </div>
    );
}
