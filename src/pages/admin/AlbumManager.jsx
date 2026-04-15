import { useState } from "react";
import { albums as initialAlbums } from "../../data/Albums";
import { MdAdd, MdEdit, MdDelete, MdClose, MdSearch } from "react-icons/md";

function AlbumModal({ album, onSave, onClose }) {
  const [form, setForm] = useState(
    album ? { name: album.name, singer: album.singer, image: album.image } :
    { name: "", singer: "", image: "" }
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
            {album ? "Chỉnh sửa album" : "Thêm album mới"}
          </h3>
          <button onClick={onClose} className="bg-transparent border-none text-[#6b7280] cursor-pointer hover:text-white"><MdClose size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">Tên album *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nhập tên album" className={inputCls}/>
          </div>
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">Nghệ sĩ *</label>
            <input name="singer" value={form.singer} onChange={handleChange} placeholder="Nhập tên nghệ sĩ" className={inputCls}/>
          </div>
          <div>
            <label className="text-xs text-[#9ca3af] mb-1 block">URL ảnh bìa</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className={inputCls}/>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-[#2e3450] text-sm text-[#9ca3af] bg-transparent cursor-pointer hover:bg-white/5 transition-colors">Hủy</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#7c83f5] text-white text-sm font-medium border-none cursor-pointer hover:bg-[#6670e8] transition-colors">
              {album ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AlbumManager() {
  const [albums, setAlbums] = useState(initialAlbums);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);

  const filtered = albums.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.singer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (modal === "add") {
      setAlbums(prev => [...prev, { ...form, id: Date.now(), songs: [] }]);
    } else {
      setAlbums(prev => prev.map(a => a.id === modal.id ? { ...a, ...form } : a));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa album này?")) {
      setAlbums(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white m-0">Quản lý album</h2>
        <button
          onClick={() => setModal("add")}
          className="flex items-center gap-1.5 bg-[#7c83f5] text-white text-sm font-medium px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-[#6670e8] transition-colors"
        >
          <MdAdd size={18}/> Thêm album
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#232840] border border-[#2e3450] rounded-lg px-3 py-2 mb-4 max-w-sm">
        <MdSearch size={18} color="#6b7280"/>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm kiếm album..."
          className="bg-transparent border-none outline-none text-sm text-white placeholder-[#6b7280] w-full"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
        {filtered.length === 0 ? (
          <p className="text-[#6b7280] text-sm col-span-full py-8 text-center">Không tìm thấy album</p>
        ) : filtered.map(album => (
          <div key={album.id} className="bg-[#1a1f35] border border-[#2e3450] rounded-xl overflow-hidden hover:border-[#7c83f5]/40 transition-colors">
            <img src={album.image} alt={album.name} className="w-full aspect-square object-cover"/>
            <div className="p-3">
              <p className="text-sm font-semibold text-white m-0 truncate">{album.name}</p>
              <p className="text-xs text-[#9ca3af] m-0 mt-0.5">{album.singer}</p>
              <p className="text-xs text-[#6b7280] m-0 mt-0.5">{album.songs.length} bài hát</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setModal(album)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#2e3450] border-none cursor-pointer text-xs text-[#9ca3af] hover:text-[#7c83f5] hover:bg-[#7c83f5]/10 transition-colors"
                >
                  <MdEdit size={13}/> Sửa
                </button>
                <button
                  onClick={() => handleDelete(album.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#2e3450] border-none cursor-pointer text-xs text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                >
                  <MdDelete size={13}/> Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <AlbumModal
          album={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
