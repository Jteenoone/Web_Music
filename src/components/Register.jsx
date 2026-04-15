import { useState } from "react";
import { FaEye, FaEyeSlash, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.username.trim()) e.username = "Vui lòng nhập tên đăng nhập";
        if (!form.email.trim()) e.email = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email không hợp lệ";
        if (!form.password) e.password = "Vui lòng nhập mật khẩu";
        else if (form.password.length < 6) e.password = "Mật khẩu phải có ít nhất 6 ký tự";
        if (form.password !== form.confirmPassword) e.confirmPassword = "Mật khẩu xác nhận không khớp";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length > 0) {
            setErrors(e2);
            return;
        }
        // TODO: connect to API POST /api/auth/register
        alert(`Đăng ký thành công!\nUsername: ${form.username}\nEmail: ${form.email}`);
    };

    const fields = [
        { name: "username", label: "Tên đăng nhập", type: "text" },
        { name: "email", label: "Email", type: "email" },
        {
            name: "password", label: "Mật khẩu", type: showPassword ? "text" : "password",
            toggle: () => setShowPassword(p => !p), shown: showPassword
        },
        {
            name: "confirmPassword", label: "Xác nhận mật khẩu", type: showConfirm ? "text" : "password",
            toggle: () => setShowConfirm(p => !p), shown: showConfirm
        },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0f1120] [background-image:radial-gradient(ellipse_at_60%_40%,#1e2247_0%,#0f1120_70%)]">
            <div className="bg-[#1a1f35] border border-[#2e3450] rounded-2xl px-12 py-10 w-full max-w-[420px] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-7">
                    <FaMusic size={28} color="#7c83f5"/>
                    <span className="text-xl font-bold text-white tracking-[0.5px]">Sound Wave</span>
                </div>

                <h2 className="text-2xl font-bold text-white m-0 mb-1.5">Đăng ký</h2>
                <p className="text-sm text-[#9ca3af] m-0 mb-7">Tạo tài khoản mới của bạn</p>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    {fields.map(field => (
                        <div key={field.name} className="field relative mb-5">
                            <input
                                type={field.type}
                                placeholder=" "
                                value={form[field.name]}
                                name={field.name}
                                onChange={handleChange}
                                className={`w-full text-[15px] px-4 py-4 pr-11 border-[1.5px] rounded-[10px] bg-[#232840] text-white outline-none transition-colors duration-200 box-border ${errors[field.name] ? 'border-[#f87171]' : 'border-[#2e3450] focus:border-[#7c83f5]'}`}
                            />
                            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] pointer-events-none transition-all duration-200 bg-[#232840] px-1">
                                {field.label}
                            </label>
                            {field.toggle && (
                                <button
                                    type="button"
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#6b7280] cursor-pointer flex items-center p-1 hover:text-[#9ca3af]"
                                    onClick={field.toggle}
                                >
                                    {field.shown ? <FaEyeSlash size={16}/> : <FaEye size={16}/>}
                                </button>
                            )}
                            {errors[field.name] && (
                                <p className="text-[12px] text-[#f87171] mt-1 ml-0.5">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-[#7c83f5] text-white text-[15px] font-semibold border-none rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#6670e8] active:scale-[0.98] mt-1"
                    >
                        Đăng ký
                    </button>
                </form>

                <p className="text-center text-[13px] text-[#6b7280] mt-6 mb-0">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-[#7c83f5] no-underline font-semibold hover:text-[#a5abff]">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
