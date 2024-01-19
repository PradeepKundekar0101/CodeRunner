// src/CodeRunner.tsx
import React, {  useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Terminal } from 'xterm';

import axios from 'axios';
const SandBox: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const runCode = async() => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/code/execute",{code});
        console.log(response)
        setOutput(response.data.output)
    } catch (error) {
      console.error('Error running code:', error);
    }
  };
  return (
    <div>
      <MonacoEditor
        height="400px"
        language="javascript"
        theme="vs-dark"
        onChange={((val)=>{setCode(val||'')})}
       
      />
      <div>
        <button onClick={runCode}>Run Code</button>
      </div>
      <div>
    
        <h2>Output:</h2>
        <pre className='text-black'>{output}</pre>
      </div>
    </div>
  );
};

export default SandBox;
