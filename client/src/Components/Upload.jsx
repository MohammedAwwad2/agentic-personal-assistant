import { useState } from "react";

function Upload({
  onUploadSuccess,
  apiEndpoint = "http://localhost:3000/api/ingest",
  acceptTypes = "application/pdf,.pdf",
  buttonText = "Upload",
  uploadingText = "Uploading...",
  successMessage = "Uploaded and ingested successfully.",
  inputId = "pdf-upload",
  labelText = "Choose PDF"
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadDocument = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      setUploadStatus(successMessage);
      setSelectedFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setUploadStatus(err?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };
 return (        <section className="uploadPanel">
           <div className="uploadRow">
             <label className="uploadButton" htmlFor={inputId}>
               {labelText}
             </label>
             <input
               id={inputId}
               className="uploadInput"
               type="file"
               accept={acceptTypes}
               onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
             />
             <button
               className="primaryButton"
               onClick={uploadDocument}
               disabled={!selectedFile || uploading}
             >
               {uploading ? uploadingText : buttonText}
             </button>
             <div className="uploadMeta">
               {selectedFile ? selectedFile.name : "No file selected"}
             </div>
           </div>
           {uploadStatus && <div className="uploadStatus">{uploadStatus}</div>}
         </section>
 )
}

export default Upload;