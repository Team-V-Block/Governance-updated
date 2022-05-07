import CheckVoterAddress from "./sections/check-voter-address";
import Vote from "./sections/governance";
import AddVoter from "./sections/add-voter";
import GrantRole from "./sections/grantRole";
import AddCandidate from "./sections/addCandidate";
import ChangeVote from "./sections/changeVote";
import ChangeResult from "./sections/changeResult";
import Admin from "./sections/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Vote />
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
