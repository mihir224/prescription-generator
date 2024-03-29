import React, { useState,useEffect,useRef } from 'react';
import '../styles/Input.css';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import axios from 'axios';
import medicalLogo from '../medical-logo.png';
import barcode from '../barcode.png';
import sign from '../sign.png';
import { ThreeDots } from  'react-loader-spinner'


function Input(){
    const [input,setInput] = useState("");
    const inputRef=useRef(null);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const [prescription,setPrescription]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        console.log(prescription);
        if(prescription!=null){
            try{
            const doc=new jsPDF();
            html2canvas(inputRef.current).then((canvas)=>{
                const imgData=canvas.toDataURL('image/png');
                doc.addImage(imgData,'PNG',5,10,200,0)
                doc.save("prescription.pdf");
            })
        }catch(err){
            console.log(err)
        }
        }
    },[prescription])
       
    const handleChange=(e)=>{
        setInput(e.target.value)
    }
    const handleClick=()=>{
        setIsLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          };
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'user', content: `I'm using your api to generate some prescription data based on some doctor notes. You have to return this data in the form of a json based on the doctors notes I provide you. The data should have 10 keys: name, age, weight, height, bp, complaint, diagnosis, medicine_name,  dosage, and duration. Just provide me with the json data nothing else. Here's the doctor notes: ${input}. Medicine name, dosage, and duration you have to identify yourself` }
            ],
            temperature: 0.7
          };
        (async ()=>{
            const res=await axios.post('https://api.openai.com/v1/chat/completions',data,{headers})
            setPrescription(JSON.parse(res.data.choices[0].message.content))
            setIsLoading(false);
        })();
       
    }
    return(
        <div id='input'>
        <div id={prescription?'input-body':'initial-body'}>
        <div id='initial-input' style={{display:`${prescription?"none":"content"}`}}>
        <p id='intro' >Welcome to <span style={{fontWeight:'700'}}>Prescriptify</span>! To get started, Enter the patient's name, age, and
         the diagnosis done by the doctor. This diagnosis should include the patient's weight, height, blood pressure, complaint and the 
         doctor's diagnosis of this complaint. After this, click generate. In a few seconds, your prescription would be ready! In addition 
         to the diagnosis, the prescription will also contain the medicine name, dosage and duration. <br/> <br/>Feel free to write us at mihirsaini25@gmail.com for any queries.</p>
            <textarea id='ta' onChange={handleChange} value={input} placeholder="Enter doctor's notes here"></textarea>
            {isLoading?
            (
                <div style={{display:'flex',justifyContent:'center'}}>
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="white" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
                </div>
            )
                :<button className='btn' onClick={handleClick} >GENERATE</button>}
        </div>
            <h3 id='intro' style={{padding:'10px',display:`${prescription?"":"none"}`}}>Here's your prescription:</h3>
            {prescription!=null&&<div ref={inputRef} id='prescription' style={{backgroundColor:'white'}}>
            <div id='header'>
            <div>
                <span className='highlighted'>Dr. Mihir Saini</span><br/>
                <span>M.B.B.S., M.D., M.S. | Reg. No:270988</span><br/>
                <span>Mob. No: +91-8439747234</span>
            </div>
            <div id='m-logo'>
                <img src={medicalLogo} alt='medical-logo' height='120' width='140' ></img>
            </div>
            <div>
                <span className='highlighted'>Care Clinic</span><br/>
                <span>Kothrud, Pune - 411038</span><br/>
                <span>Ph: +91-8979563377<br/>Timing: 09:00 AM - 02:00 PM <br/> Closed: Thursday</span>
                {/* <span>{formattedDate}</span> */}
            </div>
            </div>
            <hr/>
            <div id='patient-info'>
                <div>
                    <img src={barcode} alt='barcode' height='50' width='100'></img>
                    <div className='info'>
                        <div>
                            <span className='bold'>ID: 14 - {prescription?.name} (M) / {prescription?.age} Y</span><br/>
                            <span>Address: KOTHRUD, PUNE</span><br/>
                            <span>Weight (kg): {prescription?.weight}, Height (cms): {prescription?.height}, BP: {prescription?.bp} </span>
                        </div>
                         <div>
                            <span className='bold'>Referred: By: Dr. Rahane</span>
               
                        </div>
                        <div>
                            <span className='bold'>Known History Of</span>
                            <ul>
                                <li>BFS</li>
                                <li>DFS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <span id='date'>Date: {formattedDate}</span>
                </div>
            </div>
            <hr/>
            <div>
                <div className='grid-container'>
                    <div  className='bold col'>Chief Complaints</div>
                    <div  className='bold col'>Clinical Findings</div>
                </div>
                <div className='grid-container'>
                    <div className='row'>* {prescription?.complaint}</div>
                    <div className='row'>* DEMO FINDING 1</div>
                </div>
            </div>
            <hr/>
            <div className='info'>
                <div>
                    <span className='bold'>Notes:</span><br/>
                    <span>SAMPLE INTERNAL NOTE</span>
                </div>
                <div>
                    <span className='bold'>Diagnosis:</span><br/>
                    <span>* {prescription?.diagnosis}</span>
                </div>
                <div>
                    <span className='bold'>Procedures Conducted:</span><br/>
                    <span>* DEMO PROCEDURE</span>                        
                </div>
            </div>
            <hr/>
            <div>
                <div className='grid-container-two'>
                    <div  className='bold col'>Medicine Name</div>
                    <div  className='bold col'>Dosage</div>
                    <div  className='bold col'>Duration</div>
                </div>
                <div className='grid-container-two'>
                    <div className='row'>*{prescription?.medicine_name}</div>
                    <div className='row'>*{prescription?.dosage}</div>
                    <div className='row'>*{prescription?.duration}</div>
                </div>
            </div>
            <hr/>
            <div className='info'>
                <div>
                    <span className='bold'>Investigations:</span><br/>
                    <span>SAMPLE INTERNAL NOTE</span>
                </div>
                <div>
                    <span className='bold'>Advice Given:</span><br/>
                    <span>*SAMPLE ADVICE</span>
                </div>
                <div>
                    <span className='bold'>Follow up: 21-06-2023</span><br/>
                </div>
                <div id='sign'>
                <img src={sign} alt='sign' width='100' height='50'></img>
                <span>Dr. Mihir Saini</span>
                <span>M.B.B.S., M.D., M.S.</span>
                </div>
            </div>
            </div>}
        </div>

        </div>
    )
}

export default Input;