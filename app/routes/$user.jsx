import { Base64 } from 'js-base64';
import * as xlsx from 'xlsx';
import { useEffect, useState } from 'react';

function mean(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return (sum / data.length).toFixed(2);
}

const Grid = (prop) => {
    return (
        <div className="grid grid-cols-4 gap-4">
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
    const [tol, setTol] = useState(null);
    const [tolpt, setTolpt] = useState(null);
    const [physc,setPhysc] = useState(null);
    const [chemsc,setChemsc] = useState(null);
    const [biosc,setBiosc] = useState(null);
    const [mathsc,setMathsc] = useState(null);
    const [comsc,setComsc] = useState(null);
    const [tolsc,setTolsc] = useState(null);
    const [medal, setMedal] = useState(null);
    const [pl, setPl] = useState(null);

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
            const sheetName = workbook.SheetNames[2];
            const sheet = workbook.Sheets[sheetName];
            let physc = [], chemsc = [], biosc = [], mathsc = [], comsc = [], tolsc = [];
            for(let i=3;i<=247;i++){
                physc.push(sheet['U' + i].v);
                chemsc.push(sheet['W' + i].v);
                biosc.push(sheet['Y' + i].v);
                mathsc.push(sheet['Q' + i].v);
                comsc.push(sheet['S' + i].v);
                tolsc.push(sheet['AA' + i].v);
                if(sheet['C'+i].v == user){
                    // get name
                    setTitle(sheet['D' + i].v);
                    setFn(sheet['E' + i].v);
                    setLn(sheet['F' + i].v);
                    // get score
                    setPhy(sheet['U' + i].v);
                    setChem(sheet['W' + i].v);
                    setBio(sheet['Y' + i].v);
                    setMath(sheet['Q' + i].v);
                    setCom(sheet['S' + i].v);
                    setTol(sheet['AA' + i].v);
                    //get percentile
                    setPhypt((sheet['V' + i].v).toFixed(2));
                    setChempt((sheet['X' + i].v).toFixed(2));
                    setBiopt((sheet['Z' + i].v).toFixed(2));
                    setMathpt((sheet['R' + i].v).toFixed(2));
                    setCompt((sheet['T' + i].v).toFixed(2));
                    setTolpt((sheet['AB' + i].v).toFixed(2));
                    //get medal
                    setMedal(sheet['AD'+i].v)
                    setPl(sheet['AC'+i].v)
                }
            }
            setPhysc(physc);
            setChemsc(chemsc);
            setBiosc(biosc);
            setMathsc(mathsc);
            setComsc(comsc);
            setTolsc(tolsc);
        };    
        if(user){
            fetchData();
        }
    },[user]);

    return (
        <div className="font-sans px-4 pt-16 pb-4 flex flex-col items-center gap-2">
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
                    <h1 className="text-center">คะแนน</h1>
                    <h1 className="text-center">ค่าเฉลี่ย</h1>
                    <h1 className="text-center">เปอร์เซ็นต์ไทล์</h1>
                </Grid>
                <Grid>
                    <h1>ฟิสิกส์</h1>
                    <h1 className="font-bold text-center">{phy}</h1>
                    <h1 className="font-bold text-center">{physc ? mean(physc) : null}</h1>
                    <h1 className="font-bold text-center">{phypt}</h1>
                </Grid>
                <Grid>
                    <h1>เคมี</h1>
                    <h1 className="font-bold text-center">{chem}</h1>
                    <h1 className="font-bold text-center">{chempt ? mean(chemsc) : null}</h1>
                    <h1 className="font-bold text-center">{chempt}</h1>
                </Grid>
                <Grid>
                    <h1>ชีวะ</h1>
                    <h1 className="font-bold text-center">{bio}</h1>
                    <h1 className="font-bold text-center">{biopt ? mean(biosc) : null}</h1>
                    <h1 className="font-bold text-center">{biopt}</h1>
                </Grid>
                <Grid>
                    <h1>คณิตศาสตร์</h1>
                    <h1 className="font-bold text-center">{math}</h1>
                    <h1 className="font-bold text-center">{mathpt ? mean(mathsc) : null}</h1>
                    <h1 className="font-bold text-center">{mathpt}</h1>
                </Grid>
                <Grid>
                    <h1>วิทยาการคำนวณ</h1>
                    <h1 className="font-bold text-center">{com}</h1>
                    <h1 className="font-bold text-center">{compt ? mean(comsc) : null}</h1>
                    <h1 className="font-bold text-center">{compt}</h1>
                </Grid>
                <Grid>
                    <h1>คะแนนรวม</h1>
                    <h1 className="font-bold text-center">{tol}</h1>
                    <h1 className="font-bold text-center">{tolpt ? mean(tolsc) : null}</h1>
                    <h1 className="font-bold text-center">{tolpt}</h1>
                </Grid>
                <Grid/>
                <Grid>
                    <h1>รางวัล:</h1>
                    <h1 className="font-bold text-center">{medal}</h1>
                    <h1 className='text-center'>ลำดับที่:</h1>
                    <h1 className="font-bold text-center">{pl}</h1>
                </Grid>
            </div>
        </div>
    )
}
