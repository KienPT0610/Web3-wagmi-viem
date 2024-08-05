import React from 'react';
import { publicClient, walletClient } from '../client';
import { contract } from './contractAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const Transfer = () => {
    const account = useAccount();

    const submit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const to = formData.get('to');
        const amount = formData.get('amount') as string;

        console.log(to, amount);

        const { request } = await publicClient.simulateContract({
            abi: contract.abi,
            address: contract.address as Address,
            functionName: 'transfer', 
            args: [to, BigInt(amount)],
            account: account.address as Address,
        });

        const hash = await walletClient.writeContract(request);
        
        console.log(request);
    }
    
    return (
        <div>
            <h1>Transfer</h1>
            <form onSubmit={submit}>
                <input type='text' name='to' />
                <input type='number' name='amount' />
                <button type='submit'>Transfer</button>
            </form>
        </div>
    );
}


export default Transfer;