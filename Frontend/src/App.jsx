import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);
      // const response = await axios.post("http://localhost:3001/upload", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      let url = import.meta.env.VITE_GLOBAL_API_URL;
      // console.log(url);
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data);
    } catch (err) {
      setError("Failed to process the PDF");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">PDF Data Extractor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload a PDF File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-medium rounded-md ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Upload"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}
        {data && data.name && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Extracted Data</h2>
            <div className="space-y-2">
              <p>
                <span className="font-bold">Name:</span> {data.name}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {data.phone}
              </p>
              <p>
                <span className="font-bold">Address:</span> {data.address}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
