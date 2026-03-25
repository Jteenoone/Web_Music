import {useNavigate, Link} from 'react-router-dom';
import logo from '../assets/images/apple-music.jpg';

export default function Header() {

  return (
    <div className="flex items-center justify-center bg-[#323750] border border-[#1E2237] text-white h-full">
      <nav className="flex items-center ml-5 gap-2.5">
        <img src={logo} alt='Logo' className="w-[50px]"/>
        Music App
      </nav>

      <input
        type='text'
        placeholder='Tìm kiếm bài hát của bạn'
        className="flex-1 p-[5px] ml-[200px] mr-[200px] bg-[#272D43]"
      />

      <Link to="/login" className="bg-[#526AD6] rounded-[10px] px-[15px] py-[10px] mx-[50px] my-5 hover:bg-[#6579cf] transition-colors duration-200">
        Đăng nhập
      </Link>
    </div>
  );
}
