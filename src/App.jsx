import "./App.css";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import OriginalData from "./components/listing/OriginalData";

function App() {
  return (
    <>
      <h1 className="text-center text-2xl mt-4">
        Hi I am Priyansh Sharma <WavingHandIcon fontSize="large" />
      </h1>
      <OriginalData />
    </>
  );
}

export default App;
