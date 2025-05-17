"use client";
import { chakra_petch } from "../fontui";
export default function TypeSelection() {
  return (
    <div
      className={`w-[100%] shadow-2xl bg-gray-100 rounded text-center text-xl font-semibold pt-3 pb-6 text-indigo-600`}
    >
      Thể loại
      <ul
        className={`text-start ${chakra_petch.className} px-3 flex flex-col gap-5 mt-3 text-black`}
      >
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Hành động
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Phiêu lưu
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Hài
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Tình cảm
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Kinh dị
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Tâm lý
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Sci-fi
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Giả tưởng
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Hoạt hình
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Chiến tranh
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Tội phạm
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Bí ẩn
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Tài liệu
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Âm nhạc
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Gia đình
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Thể thao
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Lịch sử
        </li>
        <li className="border-b-2 border-indigo-400">
          <input type="checkbox" /> Viễn Tây
        </li>
      </ul>
    </div>
  );
}
