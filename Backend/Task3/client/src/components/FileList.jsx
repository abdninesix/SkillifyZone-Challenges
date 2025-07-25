import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/upload");
                setFiles(res.data.files);
            } catch (err) {
                setError("Failed to fetch files.");
            }
        };

        fetchFiles();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/upload/${id}`);
            setFiles(files.filter((file) => file._id !== id));

            toast.success("File deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete file. Please try again.");
        }
    };

    return (
        <div className="mx-auto">
            {error && <p className="text-red-500">{error}</p>}

            {files.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                <div className="flex flex-wrap gap-4 mt-4">
                    {files.map((file) => (
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={file._id}
                            className="w-full lg:w-72 bg-gray-200 rounded-lg p-4 flex flex-col"
                        >
                            {file.type.startsWith("image") ? (
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="lg:h-32 object-cover mb-2 rounded"
                                />
                            ) : (
                                <div className="w-full h-32 flex items-center justify-center bg-gray-100 text-sm text-gray-600 mb-2">
                                    {file.type.includes("pdf")
                                        ? "PDF"
                                        : file.type.includes("word")
                                            ? "DOC"
                                            : "File"}
                                </div>
                            )}

                            <p className="text-sm">{file.name.slice(0, 40)}...</p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();    // ✅ Prevent anchor navigation
                                    e.stopPropagation();   // ✅ Prevent bubbling up to <a>
                                    handleDelete(file._id);
                                }}
                                className="text-red-500 text-right cursor-pointer hover:underline text-sm"
                            >
                                Delete
                            </button>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileList;
