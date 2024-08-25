import React, { useState } from "react";
import axios from "axios";

const UploadBeat = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: Infinity,
                headers: {
                    'pinata_api_key': 'd44a319da6c8ecec639e',
                    'pinata_secret_api_key': '8a8779dbb7d29020a090164d3fe3aca1ca76e9fdd9846adaf9d0f2862bdfff24'
                }
            });
            alert(`File uploaded successfully. IPFS Hash: ${response.data.IpfsHash}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        }
    };

    return (
        <div>
            <h4> Upload Beat </h4>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default UploadBeat; 