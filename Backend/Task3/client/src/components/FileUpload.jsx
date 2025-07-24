import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      if (selected.type.startsWith("image")) {
        setPreview(URL.createObjectURL(selected));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file first.");
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data.file);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-xl font-bold mb-4">Upload a File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
        />

        {preview && (
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover mb-4" />
        )}

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>

        {response && (
          <div className="mt-4 text-green-700">
            <p>File uploaded:</p>
            <a
              href={response.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500"
            >
              {response.name}
            </a>
          </div>
        )}

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
