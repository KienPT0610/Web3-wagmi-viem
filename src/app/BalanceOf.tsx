import React from 'react';
import { publicClient } from '../client';
import { contract } from './contractAbi';
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const BalanceOf = () => {
    const account = useAccount();

    const getBalance = async () => {

        const balance = await publicClient.readContract({
            abi: contract.abi,
            address: contract.address as Address, 
            functionName: 'balanceOf',
            args: [account.address as Address],
        });

        console.log(balance);
    }

    return (
        <div>
            <h1>BalanceOf</h1>
            <button type='button' onClick={getBalance}>Check balance of me</button>
        </div>
    );
};

export default BalanceOf;