import CheckVoterAddress from "./components/check-voter-address";
import Vote from "./components/governance";
import AddVoter from "./components/add-voter";
import "./App.css";
import GrantRole from "./components/grantRole";
import AddCandidate from "./components/addCandidate";
import VoteCan from "./components/voteCandidate";
import ChangeVote from "./components/changeVote";
import ChangeResult from "./components/changeResult";
import Admin from "./components/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Vote />
      <VoteCan />
      {/* <AddVoter />
      <CheckVoterAddress /> */}
      {/* <GrantRole />
      <AddCandidate />
      <VoteCan />
      <ChangeVote/>
      <ChangeResult/> */}
      {/* <Admin/> */}
      <Router>
        <Routes>
          {/* <Route path = "/" element={<Vote/>}/> */}
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
