import FileList from "./components/FileList";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <FileUpload />
      <FileList />
    </div>
  );
}

export default App;
