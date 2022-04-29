import "../styles/add-voter.css";

const AddVoter = ({ newVoter, setNewVoter, addNewVoter, newVoterStatus }) => {
  const handleNewVoter = (e) => {
    setNewVoter(e.target.value);
  };
  return (
    <div className="container container-addVote form-container">
      <h4 className="addVote-title title-sm">Give right to vote</h4>
      <p className="addVote-body body-sm">
        (only chairman can give vote right)
      </p>
      <div className="addVote-form">
        <input
          value={newVoter}
          onChange={handleNewVoter}
          className="addVote-input"
          placeholder="input Address"
        />
        <button onClick={addNewVoter} className="btn addVote-btn">
          Give right
        </button>
      </div>
      {newVoterStatus && <p>Status: {newVoterStatus}</p>}
    </div>
  );
};

export default AddVoter;
