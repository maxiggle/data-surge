import { ethers } from "ethers";
import config from "../utils/config";

export default function useReviewContract() {
  const provider = new ethers.JsonRpcProvider(config.galadrielRpcUrl);
  const signer = new ethers.Wallet(config.galadrielPrivateKey, provider);
  const contract = new ethers.Contract(
    config.employeeAddress,
    config.employeeAbi,
    signer
  );

  async function reviewContract(
    contractId: number,
    prompt: string
  ): Promise<bigint> {
    const transaction = await contract.reviewContract(contractId, prompt);
    const receipt = await transaction.wait();
    const events = receipt.logs
      .map((log: ethers.Log) => {
        try {
          return contract.interface.parseLog(log);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          return null;
        }
      })
      .filter((event: ethers.Log | null) => event !== null);
    console.log("events", events);
    console.log("events[0].args.contractId", events[0].args.contractId);
    console.log("events[0].args.contractId", events[0].args);
    return events[0].args[0];
  }

  async function getReviewedContent(reviewId: number): Promise<string> {
    return contract.getReviewContent(reviewId);
  }
  async function approveContract(
    contractId: number,
    isApproved: boolean
  ): Promise<void> {
    const transaction = await contract.approveContract(contractId, isApproved);
    console.log("transaction", transaction);
    await transaction.wait();
  }
  return {
    reviewContract,
    getReviewedContent,
    approveContract,
  };
}
