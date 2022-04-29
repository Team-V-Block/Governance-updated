import "../styles/check-voter-address.css";

const CheckVoterAddress = ({
  voterAddressToCheck,
  setVoterAddressToCheck,
  checkAddressVoter,
  voterStatus,
}) => {
  const handleNewAddressToCheckVote = (e) => {
    setVoterAddressToCheck(e.target.value);
  };
  return (
    <div className="form-container container check-container">
      <h4 className="addVote-title">Check if an address vote status</h4>
      <div className="addVote-form">
        <input
          value={voterAddressToCheck}
          onChange={handleNewAddressToCheckVote}
          className="addVote-input"
          placeholder="Input Address"
        />
        <button onClick={checkAddressVoter} className="addVote-btn btn">
          Check
        </button>
      </div>
      {voterStatus !== "An error has occured" && voterStatus && (
        <div style={{ paddingTop: "2em" }}>
          <h4>Voter Status</h4>
          <p>Account: {voterAddressToCheck}</p>
          <p>Voted: {voterStatus?.voted?.toString()}</p>
          <p>Vote Weight: {Number(voterStatus?.weight?._hex)}</p>
        </div>
      )}{" "}
      {voterStatus === "An error has occured" && <p>{voterStatus}</p>}
    </div>
  );
};

export default CheckVoterAddress;
