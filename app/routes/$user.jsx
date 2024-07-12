import { Base64 } from 'js-base64';
import * as xlsx from 'xlsx';
import { useEffect, useState } from 'react';

export default function User() {
    const [workbook, setWorkbook] = useState(null);
    const [user, setUser] = useState(null);
    const [ind, setInd] = useState(0);
    const [chem, ]
    useEffect(() => {
        // set user
        const pathname = window.location.pathname;
        setUser(Base64.decode(pathname.substring(pathname.lastIndexOf('/') + 1)));
        // set database
        const fetchData = async () => {
            const response = await fetch(decodedUrl); // Use the decoded URL
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const workbook = xlsx.read(data, { type: 'array' });
            setWorkbook(workbook);

            for(let i=3;i<300;i++){
                const cell = sheet['K'+i];
                const cellValue = cell ? cell.v : null;
                if(cellValue == user){

                    break;
                }
            }
        };    
        fetchData();
    },[]);
    
    return (
        <div className="font-sans p-16 flex flex-col items-center h-screen gap-2">
            <div className="flex flex-row">
                <p></p> {/* Display the decoded URL */}
            </div>
            <div className="grid grid-cols-4 gap-4">
                {/* Your other UI components */}
            </div>
        </div>
    )
}
