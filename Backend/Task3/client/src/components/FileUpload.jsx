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
    <div className="">
      <div className="flex gap-4">

        <div className="w-1/3 flex flex-col items-center justify-center gap-10">
          <label
            htmlFor="fileUpload"
            className="w-fit bg-mycolor hover:bg-hovercolor text-white px-4 py-2 rounded cursor-pointer"
          >
            Choose File
          </label>
          <input
            id="fileUpload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          />


          {file && (
            <button
              onClick={handleUpload}
              className="w-fit bg-mycolor hover:bg-hovercolor text-white px-4 py-2 rounded cursor-pointer"
            >
              Upload
            </button>)}

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
              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
          )}
        </div>

        {preview && (
          <div className="w-2/3">
            <img src={preview} alt="Preview" className="object-cover" />
          </div>
        )}

      </div>
    </div>
  );
};

export default FileUpload;
