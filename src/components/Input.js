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
            doc.addImage(imgData,'PNG',10,10,190,0)
            doc.save("prescription.pdf");
        })
    }
    return(
        <div id='input'>
            <div id='prescription'>
            <h1>The Johns Hopkins Hospital</h1>
            <h3>United States</h3>
            <div id='header'>
            <div>
                <h2>Mihir Saini</h2>
                <h3>A.I.I.M.S. DELHI (M.B.B.S)</h3>
            </div>
            <div><span>{formattedDate}</span></div>
            </div>
                <p>Suspendisse sed velit vitae ex semper auctor in ac neque. Donec pulvinar tortor at nibh aliquet volutpat. Mauris velit est, malesuada sed porta ac, euismod et ex. Donec ultricies tortor a urna lacinia posuere. Integer eget odio eu velit ornare euismod placerat a elit. Donec ac laoreet ante. Etiam nec nisi ac purus bibendum tempor. Integer elementum felis in eros auctor, vitae tincidunt quam facilisis. Quisque et iaculis neque, non maximus ligula.</p>
            </div>
            <textarea ref={inputRef} id='ta' onChange={handleChange} value={input} placeholder='Enter prescription text...'></textarea>
            <button className='btn' onClick={handleClick} >Generate Prescription</button>
        </div>
    )
}

export default Input;