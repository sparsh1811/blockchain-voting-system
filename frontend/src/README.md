# Troubleshooting Guide for Blockchain Voting System

## Issue: Frontend and Backend Not Responding

### Potential Causes:

1. **Contract Deployment**:

   - Ensure that the `VotingSystem` contract is deployed successfully on Ganache.
   - Check the contract address in Ganache and update the frontend code with this address.

2. **MetaMask Connection**:

   - Ensure that MetaMask is installed and connected to the correct network (the same as Ganache).
   - Check if the user has granted permission to access their accounts.

3. **Voting Status**:
   - Ensure that the voting status is open in the contract. Use the `toggleVotingStatus` function to open voting if it is closed.

### Steps to Resolve:

1. Start Ganache and ensure it is running.
2. Deploy the contract using Truffle:
   ```bash
   truffle migrate --reset
   ```
3. Update the contract address in `frontend/src/App.js`:
   ```javascript
   const contractAddress = "0xYourDeployedContractAddress"; // Replace with actual address
   ```
4. Open voting status if necessary:

   ```javascript
   await votingSystem.toggleVotingStatus();
   ```

5. Refresh the frontend application and check for any errors in the console.

### Additional Notes:

- Ensure that the correct version of Node.js and Truffle is installed.
- Check the console for any error messages that may provide further insights.
