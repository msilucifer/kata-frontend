import { type BaseError, useReadContracts, useAccount } from "wagmi";
import { abi, address } from "@/contracts/JobBoard.json";

const useJobList = () => {
  const userAccount = useAccount();
  const { data } = useReadContracts({
    contracts: [
      {
        address: `0x${address}`,
        abi: abi,
        functionName: "jobCount",
      },
      {
        address: `0x${address}`,
        abi: abi,
        functionName: "getAllJobs",
        args: [userAccount.address],
      },
      {
        address: `0x${address}`,
        abi: abi,
        functionName: "getApplicationCount",
        args: [userAccount.address],
      },
    ],
  });
  const [jobCount, jobs] = data || [];

  let jobList = jobs?.result as any[];
  let jobListCount = jobCount?.result;

  return { jobListCount, jobList };
};

export default useJobList;
