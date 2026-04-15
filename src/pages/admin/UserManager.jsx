import { useState } from "react";
import { MdSearch, MdDelete, MdBlock, MdCheckCircle } from "react-icons/md";

// Mock data — sẽ thay bằng API call khi backend sẵn sàng
const mockUsers = [
  { id: 1, username: "nguyenvana",   email: "vana@email.com",    role: "user",  isVerified: true,  createdAt: "2025-01-10" },
  { id: 2, username: "tranthib",     email: "thib@email.com",    role: "user",  isVerified: true,  createdAt: "2025-02-14" },
  { id: 3, username: "admin",        email: "admin@soundwave.vn",role: "admin", isVerified: true,  createdAt: "2025-01-01" },
  { id: 4, username: "lethic",       email: "thic@email.com",    role: "user",  isVerified: false, createdAt: "2025-03-20" },
  { id: 5, username: "phamvand",     email: "vand@email.com",    role: "user",  isVerified: true,  createdAt: "2025-03-22" },
];

const roleBadge = {
  admin: "bg-[#7c83f5]/20 text-[#7c83f5]",
  user:  "bg-[#2e3450] text-[#9ca3af]",
};

export default function UserManager() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | user | admin

  const filtered = users.filter(u => {
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filter === "all" || u.role === filter;
    return matchSearch && matchRole;
  });

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleToggleVerify = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isVerified: !u.isVerified } : u));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white m-0">Quản lý người dùng</h2>
        <span className="text-sm text-[#9ca3af]">{users.length} tài khoản</span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 bg-[#232840] border border-[#2e3450] rounded-lg px-3 py-2 flex-1 max-w-sm">
          <MdSearch size={18} color="#6b7280"/>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo username, email..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder-[#6b7280] w-full"
          />
        </div>
        <div className="flex gap-1.5">
          {["all", "user", "admin"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border-none cursor-pointer transition-colors ${
                filter === f ? "bg-[#7c83f5] text-white" : "bg-[#2e3450] text-[#9ca3af] hover:bg-white/10"
              }`}
            >
              {f === "all" ? "Tất cả" : f === "admin" ? "Admin" : "User"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1f35] border border-[#2e3450] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-[#6b7280] bg-[#232840]">
              <th className="px-5 py-3 text-left font-medium">Người dùng</th>
              <th className="px-5 py-3 text-left font-medium">Vai trò</th>
              <th className="px-5 py-3 text-left font-medium">Trạng thái</th>
              <th className="px-5 py-3 text-left font-medium">Ngày tạo</th>
              <th className="px-5 py-3 text-right font-medium w-24">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-[#6b7280] text-sm">Không tìm thấy người dùng</td></tr>
            ) : filtered.map(user => (
              <tr key={user.id} className="border-t border-[#2e3450] hover:bg-white/5 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7c83f5]/30 flex items-center justify-center text-xs font-bold text-[#7c83f5] shrink-0 uppercase">
                      {user.username[0]}
                    </div>
                    <div>
                      <p className="text-sm text-white m-0">{user.username}</p>
                      <p className="text-xs text-[#6b7280] m-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${roleBadge[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`flex items-center gap-1 text-xs ${user.isVerified ? "text-[#1db954]" : "text-[#f59e0b]"}`}>
                    <MdCheckCircle size={14}/>
                    {user.isVerified ? "Đã xác thực" : "Chờ xác thực"}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-[#6b7280]">{user.createdAt}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleToggleVerify(user.id)}
                      title={user.isVerified ? "Hủy xác thực" : "Xác thực tài khoản"}
                      className="p-1.5 rounded-lg bg-[#2e3450] border-none cursor-pointer text-[#9ca3af] hover:text-[#1db954] hover:bg-[#1db954]/10 transition-colors"
                    >
                      <MdBlock size={15}/>
                    </button>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 rounded-lg bg-[#2e3450] border-none cursor-pointer text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                      >
                        <MdDelete size={15}/>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#2e3450] text-xs text-[#6b7280]">
          Hiển thị {filtered.length} / {users.length} tài khoản
        </div>
      </div>
    </div>
  );
}
