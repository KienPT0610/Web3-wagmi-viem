import React, {useState, useEffect } from "react";
import { getListBeat } from "../utils/getListBeat";
import { Beat } from "../types/Beat";
import { useAccount } from "wagmi";
import {publicClient, walletClient} from "../../client";
import  { contract } from '../abi/contractAbi'
import {Address} from "viem";
import Controls from './Controls';

const ManageListBeat = () => {

    const [beats, setBeats] = useState<Beat[]>([]);
    const account = useAccount();

    useEffect(() => {
        getListBeat().then((data) => {
            setBeats(data);
        });
    }, []);

    const handleSaleBeat = async (id: number) => {
        const value = Number(prompt(`Enter price for beat ID: ${id}`));
        alert(`Sale Beat ID: ${id} with price: ${value}`);

        const {request} = await publicClient.simulateContract({
            address: contract.address as Address,
            abi: contract.abi,
            functionName: 'listBeatForSale',
            args: [id, value],
            account: account.address as Address
        })
        await walletClient.writeContract(request); 
    }

    const handleTransferOwner = async (id: number) => {
        // const id = Number(prompt(`Enter ID beat to transfer owner`));
        const newOwner = prompt(`Enter new owner address`);
        alert(`Transfer Beat ID: ${id} to new owner: ${newOwner}`);

        const {request} = await publicClient.simulateContract({
            address: contract.address as Address,
            abi: contract.abi,
            functionName: 'transferOwner',
            args: [id, newOwner],
            account: account.address as Address
        })
        await walletClient.writeContract(request);
        // location.reload(); 
    }

    const handleChangeBeat = async (id: number) => {
        const newTitle = prompt(`Enter new title for beat ID: ${id}`);
        alert(`Change Beat ID: ${id} with new title: ${newTitle}`);

        const {request} = await publicClient.simulateContract({
            address: contract.address as Address,
            abi: contract.abi,
            functionName: 'changeTitle',
            args: [id, newTitle],
            account: account.address as Address
        })
        await walletClient.writeContract(request);
        // location.reload();
    }

    return (
        <div>
            <h4> Manage List Beat </h4>
            <div>
                {beats.filter((beat) => beat.owner === account.address).map((beat) => (
                    <div key={beat.id} style={{border: '1px solid black', margin: '10px'}} >
                        <p>ID: {beat.id} </p>
                        <p> Title <b> {beat.title}</b> </p>
                        <p> Owner { beat.owner } </p>
                        <p> Price {Number(beat.price)} </p>
                        <Controls src={`https://crimson-worried-lungfish-936.mypinata.cloud/ipfs/${beat.cid}`} />
                        <button onClick={() => handleSaleBeat(beat.id)}> Sale Beat </button>
                        <button onClick={() => handleTransferOwner(beat.id)}> Transfer Owner </button>
                        <button onClick={() => handleChangeBeat(beat.id)}> Change Title </button>
                        <button>Unlist Sale</button>
                        <button>Dowload</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageListBeat;