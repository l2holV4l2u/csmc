import { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import { Base64 } from 'js-base64';

export default function Index() {
  const [workbook, setWorkbook] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorCode, setErrorCode] = useState(2); // initial state for not typing anything

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (!workbook) return;
    const sheetName = workbook.SheetNames[1];
    const sheet = workbook.Sheets[sheetName];
    let errorCode = 0; // 0 = can't find username, 1 = wrong password
    for(let i=2;i<=259;i++){
      const cell = sheet['J'+i];
      const cellValue = cell ? cell.v : null;
      console.log(cellValue)
      if(cellValue == username){
        const cell = sheet['M'+i];
        const cellValue = cell ? cell.v : null;
        if(cellValue == password){
          const cell = sheet['C'+i];
          const cellValue = cell ? cell.v : null;
          window.location.href = '' + Base64.encode(cellValue);
          errorCode = -1;
        }
        else{
          errorCode = 1;
        }
        break;
      }
    }
    setErrorCode(errorCode);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/database/csmc-database.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = xlsx.read(data, { type: 'array' });
      setWorkbook(workbook);
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans p-16 flex flex-col h-screen gap-2">
      {/* image head */}
      <div className="flex flex-row items-center justify-center gap-4">
        <img src="./img/csmc.png" alt="CSMC" className="h-32 w-auto" />
        <img src="./img/smp.png" alt="smp" className="h-32 w-auto" />
      </div>
      {/* Error */}
      <div className="flex flex-col items-center text-red-600">
        {errorCode === 0 && "Can't find username"}
        {errorCode === 1 && "Incorrect password"}
      </div>
      {/* login */}
      <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border border-black rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          type="text"
          value={username}
          placeholder='เลขบัตรประชาชน'
          onChange={(e) => setUsername(e.target.value)}
        />        
        <label>Password</label>
        <input
          className="appearance-none block bg-gray-200 text-gray-700 border border-black rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          type="text"
          value={password}
          placeholder='email ที่ใช้สมัคร'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  );
}
