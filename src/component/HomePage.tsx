import { useEffect, useState } from "react";

function HomePage() {
  // Define the items (drum pads)
  const Items = [
    { text: "w", img: "/images/tom1.png" },
    { text: "a", img: "/images/tom2.png" },
    { text: "s", img: "/images/tom3.png" },
    { text: "d", img: "/images/tom4.png" },
    { text: "j", img: "/images/snare.png" },
    { text: "k", img: "/images/crash.png" },
    { text: "l", img: "/images/kick.png" },
  ];

  const [activeKey, setActiveKey] = useState<string | null>(null);


  const playSound = (key: string) => {
    const soundMap: { [key: string]: string } = {
      k: "crash.mp3",
      l: "kick-bass.mp3",
      j: "snare.mp3",
      w: "tom-1.mp3",
      a: "tom-2.mp3",
      s: "tom-3.mp3",
      d: "tom-4.mp3",
    };

    const audio = new Audio(`/sounds/${soundMap[key]}`);
    audio.play();
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);
  };


  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const validKeys = Items.map((item) => item.text);
      if (validKeys.includes(key)) {
        playSound(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <h1 className="text-[6rem] text-white text-center py-20 font-arvo"
      style={{ textShadow: " 3px 0 #DA0463" }}>
        Drum 🥁 Kit
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-5 px-4">
        {Items.map((item, i) => (
          <div
            key={i}
            onClick={() => playSound(item.text)}
            className={`relative w-40 h-40 rounded-2xl shadow-xl overflow-hidden transition-all duration-200 cursor-pointer bg-white border-8 border-[#3F3F47] ${
              activeKey === item.text ? "scale-110 shadow-pink-500" : "hover:scale-105"
            }`}
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
              <span
                className="text-pink-700 font-bold text-6xl font-arvo"
                style={{ textShadow: "3px 0 white" }}
              >
                {item.text.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
