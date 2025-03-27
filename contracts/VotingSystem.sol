// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract VotingSystem {
    // Struct to represent a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Struct to track voter information
    struct Voter {
        bool hasVoted;
        uint256 votedCandidateId;
    }

    // State variables
    address public admin;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint256 public candidatesCount;
    bool public votingOpen;

    // Events
    event CandidateAdded(uint256 id, string name);
    event Voted(uint256 candidateId, address voter);
    event VotingStatusChanged(bool isOpen);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier votingIsOpen() {
        require(votingOpen, "Voting is not currently open");
        _;
    }

    modifier validCandidate(uint256 _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        _;
    }

    modifier voterHasNotVoted() {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        _;
    }

    // Constructor
    constructor() {
        admin = msg.sender;
        votingOpen = false;
        candidatesCount = 0;
    }

    // Add a new candidate
    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    // Vote for a candidate
    function vote(uint256 _candidateId) public votingIsOpen validCandidate(_candidateId) voterHasNotVoted {
        // Record the vote
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;

        // Increment candidate vote count
        candidates[_candidateId].voteCount++;

        // Emit voting event
        emit Voted(_candidateId, msg.sender);
    }

    // Get candidate details
    function getCandidate(uint256 _candidateId) public view validCandidate(_candidateId) returns (uint256, string memory, uint256) {
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }

    // Toggle voting status (open/close)
    function toggleVotingStatus() public onlyAdmin {
        votingOpen = !votingOpen;
        emit VotingStatusChanged(votingOpen);
    }

    // Get total votes for a candidate
    function getCandidateVotes(uint256 _candidateId) public view validCandidate(_candidateId) returns (uint256) {
        return candidates[_candidateId].voteCount;
    }
}