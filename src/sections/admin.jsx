import React from 'react'
import GrantRole from "./grantRole"
import AddCandidate from "./addCandidate"
import VoteCan from "./voteCandidate"
import ChangeVote from "./changeVote"
import ChangeResult from "./changeResult"

const admin = () => {
  return (
    <div>
    <GrantRole />
      <AddCandidate />
      <ChangeVote/>
      <ChangeResult/>
    </div>
  )
}

export default admin