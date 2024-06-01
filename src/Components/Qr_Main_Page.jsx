import React, { useState } from 'react'

const Qr_Main_Page = () => {
    const [image,setImage] = useState("");
    const [loading,setLoading] = useState(false);
    const [qrData,setQrData] = useState("");
    const [qrSize,setQrSize] = useState(150);

    const QR_generator = async() =>
    {
        setLoading(true);
        console.log(qrData);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?
            size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImage(url);
        }
        catch(error)
        {
            console.error(error);
        }
        finally
        {
            setLoading(false);
        }
    }

    const QR_Downloader = ()=>{
        fetch(image)
            .then((response)=>response.blob())
            .then((blob)=>{
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
            })
            .catch((error)=>
            {
                console.error(error);
            });
    }

  return (
    <div className='container'>
        <h1>QR Module</h1>
        {loading && <p>Kindly wait for some time...</p>}
        {image && <img src={image} className='QRimage' />}
        
        <div>
            <label>
                Data For QR:
            </label>
            <input type="text" value={qrData} id="dataInput"
                placeholder='Enter the data' 
                onChange={(e) => setQrData(e.target.value)} />
            <label>
                Size of QR:
            </label>
            <input type="number" value={qrSize} id="sizeInput"
                placeholder='Enter the size' 
                onChange={(e)=>{setQrSize(e.target.data)}} />
            
          
            <button className='generateButton' disabled ={loading} onClick={QR_generator}>
                Generate QR Code
            </button>
            <button className='generateButton' onClick={QR_Downloader}>
                Download QR Code
            </button>
            
        </div>
      
    </div>
  )
}

export default Qr_Main_Page
