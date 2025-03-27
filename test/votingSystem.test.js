const VotingSystem = artifacts.require("VotingSystem");

contract("VotingSystem", (accounts) => {
  let votingSystem;
  const admin = accounts[0];
  const voter1 = accounts[1];
  const voter2 = accounts[2];

  beforeEach(async () => {
    votingSystem = await VotingSystem.new();
  });

  it("initializes with correct admin", async () => {
    const contractAdmin = await votingSystem.admin();
    assert.equal(contractAdmin, admin, "Admin is not correctly set");
  });

  it("allows admin to add candidates", async () => {
    await votingSystem.addCandidate("Test Candidate", { from: admin });
    const candidateCount = await votingSystem.candidatesCount();
    assert.equal(candidateCount, 1, "Candidate was not added");

    const candidate = await votingSystem.candidates(1);
    assert.equal(
      candidate.name,
      "Test Candidate",
      "Candidate name is incorrect"
    );
  });

  it("prevents non-admin from adding candidates", async () => {
    try {
      await votingSystem.addCandidate("Illegal Candidate", { from: voter1 });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(
        error.message,
        "Only admin can perform this action",
        "Different error thrown"
      );
    }
  });

  it("allows voting when open", async () => {
    // Add candidate and open voting
    await votingSystem.addCandidate("Voting Candidate", { from: admin });
    await votingSystem.toggleVotingStatus({ from: admin });

    // Cast vote
    await votingSystem.vote(1, { from: voter1 });
    const voter = await votingSystem.voters(voter1);

    assert.equal(voter.hasVoted, true, "Voter status not updated");

    const candidate = await votingSystem.candidates(1);
    assert.equal(candidate.voteCount, 1, "Vote count not incremented");
  });

  it("prevents voting twice", async () => {
    // Add candidate and open voting
    await votingSystem.addCandidate("Repeat Candidate", { from: admin });
    await votingSystem.toggleVotingStatus({ from: admin });

    // First vote
    await votingSystem.vote(1, { from: voter1 });

    // Try voting again
    try {
      await votingSystem.vote(1, { from: voter1 });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(
        error.message,
        "You have already voted",
        "Different error thrown"
      );
    }
  });
});
