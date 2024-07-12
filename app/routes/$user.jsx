import { Base64 } from 'js-base64';
import * as xlsx from 'xlsx';
import { useEffect, useState } from 'react';

function percentileRank(data, value) {
    const sortedData = data.sort((a, b) => a - b);
    const rank = sortedData.findIndex(score => score >= value) / sortedData.length;
    return (rank * 100).toFixed(2);
}

const Grid = (prop) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {prop.children}
        </div>
    )
}

export default function User() {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState(null);
    const [fn, setFn] = useState(null);
    const [ln, setLn] = useState(null);
    const [phy,setPhy] = useState(null);
    const [phypt,setPhypt] = useState(null);
    const [chem, setChem] = useState(null);
    const [chempt, setChempt] = useState(null);
    const [bio,setBio] = useState(null);
    const [biopt,setBiopt] = useState(null);
    const [math,setMath] = useState(null);
    const [mathpt,setMathpt] = useState(null);
    const [com,setCom] = useState(null);
    const [compt,setCompt] = useState(null);

    useEffect(() => {
        // set user
        const pathname = window.location.pathname;
        setUser(Base64.decode(pathname.substring(pathname.lastIndexOf('/') + 1)));
    })

    useEffect(() => {
        // set database
        const fetchData = async () => {
            const response = await fetch('/database/csmc-database.xlsx'); // Use the decoded URL
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const workbook = xlsx.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[1];
            const sheet = workbook.Sheets[sheetName];
            let physc = [], chemsc = [], biosc = [], mathsc = [], comsc = [];
            for(let i=2;i<300;i++){
                const cell = sheet['M'+i];
                const cellValue = cell ? cell.v : null;
                if (sheet['Q' + i]) {
                    physc.push(sheet['Q' + i].v);
                }
                if (sheet['R' + i]) {
                    chemsc.push(sheet['R' + i].v);
                }
                if (sheet['S' + i]) {
                    biosc.push(sheet['S' + i].v);
                }
                if (sheet['T' + i]) {
                    mathsc.push(sheet['T' + i].v);
                }
                if (sheet['U' + i]) {
                    comsc.push(sheet['U' + i].v);
                }
                if(cellValue == user){
                    // get name
                    if (sheet['D' + i]) {
                        setTitle(sheet['D' + i].v);
                    }
                    if (sheet['E' + i]) {
                        setFn(sheet['E' + i].v);
                    }
                    if (sheet['F' + i]) {
                        setLn(sheet['F' + i].v);
                    }
                    // get score
                    if (sheet['Q' + i]) {
                        setPhy(sheet['Q' + i].v);
                    }
                    if (sheet['R' + i]) {
                        setChem(sheet['R' + i].v);
                    }
                    if (sheet['S' + i]) {
                        setBio(sheet['S' + i].v);
                    }
                    if (sheet['T' + i]) {
                        setMath(sheet['T' + i].v);
                    }
                    if (sheet['U' + i]) {
                        setCom(sheet['U' + i].v);
                    }
                }
            }
            setPhypt(physc);
            setChempt(chemsc);
            setBiopt(biosc);
            setMathpt(mathsc);
            setCompt(comsc);
        };    
        fetchData();
    },[user]);

    return (
        <div className="font-sans p-16 flex flex-col items-center h-screen gap-2">
            {/* image head */}
            <div className="flex flex-row items-center justify-center gap-4">
                <img src="./img/csmc.png" alt="CSMC" className="h-32 w-auto" />
                <img src="./img/smp.png" alt="smp" className="h-32 w-auto" />
            </div>
            {/* Name */}
            <div className="flex flex-row">
                <h1>{title} {fn} {ln}</h1>        
            </div>
            {/* Score */}
            <div className="gap-4 flex flex-col">
                <Grid>
                    <h1>วิชา</h1>
                    <h1>คะแนน</h1>
                    <h1>percentile</h1>
                </Grid>
                <Grid>
                    <h1>ฟิสิกส์</h1>
                    <h1>{phy}</h1>
                    <h1>{compt ? percentileRank(compt, com) : null}</h1>
                </Grid>
                <Grid>
                    <h1>เคมี</h1>
                    <h1>{chem}</h1>
                    <h1>{compt ? percentileRank(compt, com) : null}</h1>
                </Grid>
                <Grid>
                    <h1>ชีวะ</h1>
                    <h1>{bio}</h1>
                    <h1>{compt ? percentileRank(compt, com) : null}</h1>
                </Grid>
                <Grid>
                    <h1>คณิตศาสตร์</h1>
                    <h1>{math}</h1>
                    <h1>{compt ? percentileRank(compt, com) : null}</h1>
                </Grid>
                <Grid>
                    <h1>วิทยาการคำนวณ</h1>
                    <h1>{com}</h1>
                    <h1>{compt ? percentileRank(compt, com) : null}</h1>
                </Grid>
            </div>
        </div>
    )
}
