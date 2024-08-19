
import { publicClient } from '../../client';
import { contract } from '../abi/contractAbi';
import { Address } from 'viem';

export const getBalanceToken = async (account: Address) => { 
    const balance = await publicClient.readContract({
        address: contract.address as Address,
        abi: contract.abi,
        functionName: 'balanceOf',
        args: [account],
    });

    // console.log('Balance Token: ', balance);
    return Number(balance);
}