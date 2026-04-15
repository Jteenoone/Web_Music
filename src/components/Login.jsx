import { useState } from "react";
import { FaEye, FaEyeSlash, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.name.trim() || !user.password.trim()) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        alert(`userName: ${user.name}\npassword: ${user.password}`);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#0f1120] [background-image:radial-gradient(ellipse_at_60%_40%,#1e2247_0%,#0f1120_70%)]">
            <div className="bg-[#1a1f35] border border-[#2e3450] rounded-2xl px-12 py-10 w-full max-w-[420px] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-7">
                    <FaMusic size={28} color="#7c83f5" />
                    <span className="text-xl font-bold text-white tracking-[0.5px]">Sound Wave</span>
                </div>

                <h2 className="text-2xl font-bold text-white m-0 mb-1.5">Đăng nhập</h2>
                <p className="text-sm text-[#9ca3af] m-0 mb-7">Chào mừng bạn trở lại!</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                    {/* Username field */}
                    <div className="field relative mb-5">
                        <input
                            type="text"
                            placeholder=" "
                            value={user.name}
                            name="name"
                            onChange={handleChange}
                            className="w-full text-[15px] px-4 py-4 pr-11 border-[1.5px] border-[#2e3450] rounded-[10px] bg-[#232840] text-white outline-none transition-colors duration-200 box-border focus:border-[#7c83f5]"
                        />
                        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] pointer-events-none transition-all duration-200 bg-[#232840] px-1">Tên đăng nhập</label>
                    </div>

                    {/* Password field */}
                    <div className="field relative mb-5">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            value={user.password}
                            name="password"
                            onChange={handleChange}
                            className="w-full text-[15px] px-4 py-4 pr-11 border-[1.5px] border-[#2e3450] rounded-[10px] bg-[#232840] text-white outline-none transition-colors duration-200 box-border focus:border-[#7c83f5]"
                        />
                        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] pointer-events-none transition-all duration-200 bg-[#232840] px-1">Mật khẩu</label>
                        <button
                            type="button"
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#6b7280] cursor-pointer flex items-center p-1 transition-colors duration-200 hover:text-[#9ca3af]"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>

                    {error && <p className="text-[13px] text-[#f87171] -mt-2 mb-3 ml-0.5">{error}</p>}

                    <div className="flex justify-end mb-6">
                        <a href="#" className="text-[13px] text-[#7c83f5] no-underline transition-colors duration-200 hover:text-[#a5abff]">Quên mật khẩu?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-[#7c83f5] text-white text-[15px] font-semibold border-none rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#6670e8] active:scale-[0.98]"
                    >
                        Đăng nhập
                    </button>
                </form>

                <p className="text-center text-[13px] text-[#6b7280] mt-6 mb-0">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-[#7c83f5] no-underline font-semibold transition-colors duration-200 hover:text-[#a5abff]">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}
