import { MdMusicNote, MdAlbum, MdPeople, MdHeadphones } from "react-icons/md";
import { songs } from "../../data/Song";
import { albums } from "../../data/Albums";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-[#1a1f35] border border-[#2e3450] rounded-xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white m-0">{value}</p>
        <p className="text-sm text-[#9ca3af] m-0">{label}</p>
      </div>
    </div>
  );
}

const recentSongs = songs.slice(0, 5).map((s, i) => ({
  ...s,
  plays: Math.floor(Math.random() * 10000 + 1000),
  rank: i + 1,
}));

export default function AdminDashboard() {
  const stats = [
    { icon: <MdMusicNote size={22} color="white"/>, label: "Tổng bài hát",   value: songs.length,  color: "bg-[#7c83f5]" },
    { icon: <MdAlbum size={22} color="white"/>,     label: "Tổng album",     value: albums.length, color: "bg-[#1db954]" },
    { icon: <MdPeople size={22} color="white"/>,    label: "Người dùng",     value: 128,           color: "bg-[#f59e0b]" },
    { icon: <MdHeadphones size={22} color="white"/>,label: "Lượt nghe hôm nay", value: "2.4K",    color: "bg-[#ef4444]" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6 m-0">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} {...s}/>)}
      </div>

      {/* Top tracks */}
      <div className="bg-[#1a1f35] border border-[#2e3450] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2e3450]">
          <h3 className="text-sm font-semibold text-white m-0">Bài hát được nghe nhiều nhất</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-[#6b7280]">
              <th className="px-5 py-3 text-left font-medium w-10">#</th>
              <th className="px-5 py-3 text-left font-medium">Tên bài hát</th>
              <th className="px-5 py-3 text-left font-medium">Nghệ sĩ</th>
              <th className="px-5 py-3 text-right font-medium">Lượt nghe</th>
            </tr>
          </thead>
          <tbody>
            {recentSongs.map(song => (
              <tr key={song.id} className="border-t border-[#2e3450] hover:bg-white/5 transition-colors">
                <td className="px-5 py-3 text-[#6b7280] text-sm">{song.rank}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={song.src_img} alt="" className="w-9 h-9 rounded object-cover shrink-0"/>
                    <span className="text-sm text-white">{song.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-[#9ca3af]">{song.singer}</td>
                <td className="px-5 py-3 text-sm text-[#9ca3af] text-right">{song.plays.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
