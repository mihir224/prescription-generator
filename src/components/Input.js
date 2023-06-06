import React, { useState,useEffect,useRef } from 'react';
import '../styles/Input.css';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


function Input(){
    const [input,setInput] = useState("");
    const inputRef=useRef(null);
    const element = inputRef.current;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    useEffect(()=>{
        console.log(input);
    },[input])
    const handleChange=(e)=>{
        setInput(e.target.value)
    }
    const handleClick=(e)=>{
        const doc=new jsPDF();
        html2canvas(element).then((canvas)=>{
            const imgData=canvas.toDataURL('image/png');
            doc.addImage(imgData,'PNG',5,10,200,0)
            doc.save("prescription.pdf");
        })
    }
    return(
        <div id='input'>
        <div id='input-body'>
            <textarea id='ta' onChange={handleChange} value={input} placeholder='Enter prescription text...'></textarea>
            <div ref={inputRef} id='prescription'>
            <div id='title'>
                <h1>The Johns Hopkins Hospital</h1>
                <h3>United States</h3>
            </div>
            <div id='header'>
            <div>
                <h2>Mihir Saini</h2>
                <h3>A.I.I.M.S. DELHI (M.B.B.S)</h3>
            </div>
            <div><span>{formattedDate}</span></div>
            </div>
            <hr/>
                <p id='content'>{input}</p>
            </div>
        </div>
            <button className='btn' onClick={handleClick} >Generate Prescription</button>
        </div>
    )
}

export default Input;