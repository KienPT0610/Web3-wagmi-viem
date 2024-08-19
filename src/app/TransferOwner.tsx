import React from 'react';
import { publicClient, walletClient } from '../client';
import { contract } from './abi/contractAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const TransferOwner = () => {
    const account = useAccount();

    const submit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const id = formData.get('id');
        const newOwner = formData.get('newOwner') as string;

        // console.log(to, amount);

        const { request } = await publicClient.simulateContract({
            abi: contract.abi,
            address: contract.address as Address,
            functionName: 'transferOwner', 
            args: [Number(id), newOwner],
            account: account.address as Address,
        });

        const hash = await walletClient.writeContract(request);
        
        console.log(request);
    }
        
    return (
        <div>
            <h1>Transfer Owner Beat</h1>
            <form onSubmit={submit}>
                <label htmlFor="">ID</label><br />
                <input type='text' name='id' /><br />
                <label htmlFor="">New Owner</label><br />
                <input type='text' name='newOwner' /><br />
                <button type='submit'>Transfer Owner</button>
            </form>
        </div>
    );
}


export default TransferOwner;