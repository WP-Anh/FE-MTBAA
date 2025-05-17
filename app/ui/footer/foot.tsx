import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeFilled,
  TikTokOutlined,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <div className="w-full bg-black grid-cols-4 text-white flex p-6 justify-center gap-36">
      {/* Footer */}
      {/* 1. About Us
        2. Privacy
        3. Media
        4. Hotline */}

      {/* About Us */}
      <div className="">
        <div className="text-xl font-semibold">Về E-Tech</div>
        <div className="flex flex-col gap-2 mt-2">
          <p>Giới Thiệu</p>
          <p>Tuyển dụng</p>
          <p>Liên hệ</p>
        </div>
      </div>

      {/* Privacy */}
      <div className="">
        <div className="text-xl font-semibold">Chính sách</div>
        <div className="flex flex-col gap-2 mt-2">
          <p>Chính sách khách hàng</p>
          <p>Chính sách bảo mật</p>
          <p>Chính sách blah blah</p>
        </div>
      </div>

      {/* Media */}
      <div>
        <div className="text-xl font-semibold">Kết nối</div>
        <div>
          <p className="flex items-center justify-center w-fit mt-3 gap-2">
            <FacebookOutlined className="text-2xl bg-blue-600 w-fit rounded" />
            Facebook
          </p>
          <p className="flex items-center justify-center w-fit mt-3 gap-2">
            <InstagramOutlined className="text-2xl rounded" />
            Instagram
          </p>
          <p className="flex items-center justify-center w-fit mt-3 gap-2">
            <TikTokOutlined className="text-2xl text-black rounded" /> Tiktok
          </p>
          <p className="flex items-center justify-center w-fit mt-3 gap-2">
            <YoutubeFilled className="text-2xl w-fit rounded stroke-red-500" />{" "}
            Youtube
          </p>
        </div>
      </div>

      {/* Hotline */}
      <div>
        <div className="text-xl font-semibold">
          Tổng đài liên hệ: (+84) 987443212 <br />
          (8:00 - 21:00)
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <p>Khiếu nại:</p>
          <p>Email: </p>
        </div>
      </div>
    </div>
  );
}
