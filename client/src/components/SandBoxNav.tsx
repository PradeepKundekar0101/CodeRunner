import { FaPlay, FaRegSave } from "react-icons/fa";

import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";

interface SandBoxNavProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  fontSize: string;
  setFontSize: React.Dispatch<React.SetStateAction<string>>;
  running: boolean;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  runCode: () => Promise<void>;
}
const SandBoxNav: React.FC<SandBoxNavProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  running,
  runCode,
}) => {
  const [showInput,setShowInput] = useState<boolean>(false);
  return (
    <div className="flex justify-end py-3 space-x-3 px-5 border-t-2 border-b-2 border-slate-700 bg-slate-800 ">
      <div className="flex items-center bg-slate-700 text-white py-1 px-2 rounded-md">
        <select
          name="lang"
          className="bg-slate-600 px-3 py-1 rounded-md focus:outline-none "
          value={language}
          onChange={(e: any) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="vs-dark">Javascript</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className="flex items-center bg-slate-700 text-white py-1 px-2 rounded-md">
        <label htmlFor="size">Font Size&nbsp;</label>
        <select
          name="size"
          className="bg-slate-600 px-3 py-1 rounded-md focus:outline-none"
          onChange={(e: any) => {
            setFontSize(e.target.value);
          }}
          value={fontSize}
        >
          <option value="10">Small</option>
          <option value="16">Medium</option>
          <option value="32">Large</option>
        </select>
      </div>

      <button
        disabled={running}
        className="bg-green-600 flex items-center py-1 px-3 rounded-lg text-white"
        onClick={runCode}
      >
        {running ? "Running..." : "Run Code"}
        <FaPlay />
      </button>
      <div className="flex items-center justify-center">
      <input type="text" placeholder="Title" className="rounded-xl h-full px-2"/>
      <button className="text-white mx-1">Cancel</button>
      </div>
     
      <button onClick={()=>{}}>
        <FaRegSave fill="#fff"   size={30} />
      </button>

      <button
        onClick={() => {
          if (theme === "vs-dark") setTheme("light");
          else setTheme("vs-dark");
        }}
      >
        {theme === "vs-dark" ? (
          <CiLight fill="#fff" size={30} />
        ) : (
          <MdOutlineDarkMode fill="#fff" size={30} />
        )}
      </button>
    </div>
  );
};

export default SandBoxNav;
