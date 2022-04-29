import CheckVoterAddress from "./components/check-voter-address";
import Vote from "./components/governance";
import AddVoter from "./components/add-voter";
import "./App.css";

function App() {
  return (
    <>
      <Vote />
      <AddVoter />
      <CheckVoterAddress />
    </>
  );
}

export default App;
