import { useState } from "react";

export default function PopUp() {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={active ? `w-full` : "w-full"}>
      <div className="w-full h-full bg-black fixed z-40 top-0 opacity-40"></div>
      <div className="w-[90%] h-[80vh] bg-white fixed z-50 left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        Đây là popup
      </div>
    </div>
  );
}
