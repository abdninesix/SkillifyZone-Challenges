import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setResponse({ name: selected.name });
      if (selected.type.startsWith("image")) {
        setPreview(URL.createObjectURL(selected));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data.file);
      toast.success("File uploaded successfully!");

      setFile(null);
      setPreview(null);
      setResponse(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Upload failed.");
    }
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="lg:w-1/3 bg-amber-40 flex flex-col items-center gap-4 mt-20">
          <label
            htmlFor="fileUpload"
            className="w-32 text-center bg-mycolor hover:bg-hovercolor text-white px-4 py-2 rounded cursor-pointer"
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
              className="w-32 text-center bg-mycolor hover:bg-hovercolor text-white px-4 py-2 rounded cursor-pointer"
            >
              Upload
            </button>)}

          {response && (
            <div className="hidden lg:flex flex-col text-green-700 text-center">
              <p className="font-medium">File name: </p>
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
          <div className="lg:w-2/3 p-4">
            <img src={preview} alt="Preview" className="rounded-xl object-cover" />
          </div>
        )}
        {response && (
          <div className="lg:hidden flex flex-col text-green-700 text-center">
            <p className="font-medium">File name: </p>
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
    </div>
  );
};

export default FileUpload;
