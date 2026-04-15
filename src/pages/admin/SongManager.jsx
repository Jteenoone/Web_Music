import { useState } from "react";
import { songs as initialSongs } from "../../data/Song";
import { MdAdd, MdEdit, MdDelete, MdClose, MdSearch } from "react-icons/md";

function SongModal({ song, onSave, onClose }) {
  const [form, setForm] = useState(
    song ?? { name: "", singer: "", url: "", src_img: "" }
  );

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.singer.trim()) return;
    onSave(form);
  };

  const inputCls = "w-full bg-[#232840] border border-[#2e3450] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#7c83f5] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a1f35] border border-[#2e3450] rounded-xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-white m-0">
            {song ? "Chỉnh sửa bài hát" : "Thêm bài hát mới"}
          </h3>
          <button onClick={onClose} className="bg-transparent border-none text-[#6b7280] cursor-pointer hover:text-white"><MdClose size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">Tên bài hát *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nhập tên bài hát" className={inputCls}/>
          </div>
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">Nghệ sĩ *</label>
            <input name="singer" value={form.singer} onChange={handleChange} placeholder="Nhập tên nghệ sĩ" className={inputCls}/>
          </div>
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">URL ảnh bìa</label>
            <input name="src_img" value={form.src_img} onChange={handleChange} placeholder="https://..." className={inputCls}/>
          </div>
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">URL audio</label>
            <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." className={inputCls}/>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-[#2e3450] text-sm text-[#9ca3af] bg-transparent cursor-pointer hover:bg-white/5 transition-colors">Hủy</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#7c83f5] text-white text-sm font-medium border-none cursor-pointer hover:bg-[#6670e8] transition-colors">
              {song ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SongManager() {
  const [songs, setSongs] = useState(initialSongs);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | 'add' | song object

  const filtered = songs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.singer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (modal === "add") {
      setSongs(prev => [...prev, { ...form, id: Date.now() }]);
    } else {
      setSongs(prev => prev.map(s => s.id === modal.id ? { ...s, ...form } : s));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa bài hát này?")) {
      setSongs(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white m-0">Quản lý bài hát</h2>
        <button
          onClick={() => setModal("add")}
          className="flex items-center gap-1.5 bg-[#7c83f5] text-white text-sm font-medium px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-[#6670e8] transition-colors"
        >
          <MdAdd size={18}/> Thêm bài hát
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#232840] border border-[#2e3450] rounded-lg px-3 py-2 mb-4 max-w-sm">
        <MdSearch size={18} color="#6b7280"/>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm kiếm bài hát..."
          className="bg-transparent border-none outline-none text-sm text-white placeholder-[#6b7280] w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-[#1a1f35] border border-[#2e3450] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-[#6b7280] bg-[#232840]">
              <th className="px-5 py-3 text-left font-medium">Bài hát</th>
              <th className="px-5 py-3 text-left font-medium">Nghệ sĩ</th>
              <th className="px-5 py-3 text-right font-medium w-24">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} className="px-5 py-8 text-center text-[#6b7280] text-sm">Không tìm thấy bài hát</td></tr>
            ) : filtered.map(song => (
              <tr key={song.id} className="border-t border-[#2e3450] hover:bg-white/5 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={song.src_img} alt="" className="w-9 h-9 rounded object-cover shrink-0"/>
                    <span className="text-sm text-white">{song.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-[#9ca3af]">{song.singer}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setModal(song)} className="p-1.5 rounded-lg bg-[#2e3450] border-none cursor-pointer text-[#9ca3af] hover:text-[#7c83f5] hover:bg-[#7c83f5]/10 transition-colors">
                      <MdEdit size={15}/>
                    </button>
                    <button onClick={() => handleDelete(song.id)} className="p-1.5 rounded-lg bg-[#2e3450] border-none cursor-pointer text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors">
                      <MdDelete size={15}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#2e3450] text-xs text-[#6b7280]">
          {filtered.length} / {songs.length} bài hát
        </div>
      </div>

      {modal && (
        <SongModal
          song={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
