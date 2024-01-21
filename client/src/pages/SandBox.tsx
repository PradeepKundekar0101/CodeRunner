// src/CodeRunner.tsx
import React, {  useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { FaPlay } from "react-icons/fa";

import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { notify } from '../utils/notify';
const SandBox: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [language,setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>('');
  const [theme,setTheme] = useState<string>('light');
  const [fontSize,setFontSize] = useState<string>('10');
  const [running,setRunning] = useState<boolean>(false);
  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: Number(fontSize)
    
  };
  const runCode = async() => {
    try {
        setRunning(true);
        const response = await axios.post("http://localhost:8000/api/v1/code/execute",{code,language});
        console.log(response)
        setRunning(false);
        setOutput(response.data.output)

    } catch (error:any) {
      setRunning(false);
      if(error.response){
        notify(error.response.data,false);
        return;
      }
      notify(error.message,false);
      console.error('Error running code:', error);
    }
  };
  return (
    <>
    <Toaster/>
     <div className='flex justify-end py-3 space-x-3 px-5 border-t-2 border-b-2 border-slate-700 bg-slate-800 '>
     <div className='flex items-center bg-slate-700 text-white py-1 px-2 rounded-md'>
        <label htmlFor="lang">Language &nbsp;</label>
        <select name="lang" className='bg-slate-600 px-3 py-1 rounded-md focus:outline-none '  value={language} onChange={(e:any)=>{setLanguage(e.target.value)}} >
            <option value="vs-dark">Javascript</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
      </div>
      
        
      <div className='flex items-center bg-slate-700 text-white py-1 px-2 rounded-md'>
        <label htmlFor="mode">Mode&nbsp;</label>
        <select name="mode" className='bg-slate-600 px-3 py-1 rounded-md focus:outline-none' onChange={(e:any)=>{setTheme(e.target.value)}} value={theme}>
          <option value="vs-dark">Dark Mode</option>
          <option value="light">Light Mode</option>
        </select>
        </div>

        <div className='flex items-center bg-slate-700 text-white py-1 px-2 rounded-md'>
        <label htmlFor="size">Font Size&nbsp;</label>
        <select name="size" className='bg-slate-600 px-3 py-1 rounded-md focus:outline-none' onChange={(e:any)=>{setFontSize(e.target.value)}} value={fontSize}>
          <option value="10">Small</option>
          <option value="16">Medium</option>
          <option value="32">Large</option>
        </select>
        </div>
       

        <button
          disabled={running} 
          className='bg-green-600 flex items-center py-1 px-3 rounded-lg text-white' onClick={runCode}>
            {running?"Running...":"Run Code"}<FaPlay/>
          </button>
      </div>

      <div className='flex'>
      <MonacoEditor
        height="100vh"
        width="70vw"
        options={editorOptions}
       
        language={language}
        theme={theme}
        onChange={((val)=>{setCode(val||'')})}
      />
     
      <div className='bg-black text-green-400 w-[40%]'>
        <h2>Output:</h2>
        <pre className='text-green-400'>{output}</pre>
      </div>
    </div>
    </>
    
  );
};

export default SandBox;
