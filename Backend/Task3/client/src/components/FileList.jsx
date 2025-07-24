import { useEffect, useState } from "react";
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
        const confirm = window.confirm("Are you sure you want to delete this file?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3000/api/upload/${id}`);
            setFiles(files.filter((file) => file._id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete file.");
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
                        <div
                            key={file._id}
                            className="md:w-72 md:h-56 bg-gray-200 rounded-lg p-4 flex flex-col"
                        >
                            {file.type.startsWith("image") ? (
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="object-cover mb-2 rounded"
                                />
                            ) : (
                                <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-sm text-gray-600 mb-2">
                                    {file.type.includes("pdf")
                                        ? "PDF"
                                        : file.type.includes("word")
                                            ? "DOC"
                                            : "File"}
                                </div>
                            )}

                            <p className="text-sm">{file.name.slice(0, 20)}...</p>
                            <div className="w-full flex justify-end gap-4">
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    View
                                </a>
                                <button
                                    onClick={() => handleDelete(file._id)}
                                    className="text-red-500 cursor-pointer hover:underline text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileList;
