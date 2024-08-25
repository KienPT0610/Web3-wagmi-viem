import React, { useEffect, useState } from "react";
import { getListBeat } from "../utils/getListBeat";
import { Beat } from "../types/Beat";
import { getBalanceToken } from "../utils/getTokenBalance";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { publicClient, walletClient } from "../../client";
import { contract } from "../abi/contractAbi";

const ListBeatSaling = () => {

    const [beats, setBeats] = useState<Beat[]>([] as Beat[]);
    const account = useAccount();

    useEffect(() => {
        getListBeat().then((data) => {
            setBeats(data); 
        });
    }, []);

    const handleBuyBeat = async (id: number, price: number) => {
        const balane = await getBalanceToken(account.address as Address);
        // alert(`Balance Token: ${balane}`);
        if (balane >= price) {
            alert(`Buy Beat ID: ${id}`);
            const { request } = await publicClient.simulateContract({
                address: contract.address as Address,
                abi: contract.abi,
                functionName: 'buyBeat',
                args: [price, id],
                account: account.address as Address,
            });

            const hash = await walletClient.writeContract(request);
            location.reload();
        }
        else {
            alert(`Balance Token not enough`);
        }
    }

    return (
        <div>
            <h4> List Beat Saling </h4>
            <div>
                {beats.filter((beat) => beat.isForSale).map((beat) => (
                    <div key={beat.id}>
                        <div style={{ border: '1px solid black', margin: '10px' }}>
                            <span>ID: {beat.id}</span><br />
                            <span>Title: {beat.title}</span><br />
                            <span>Owner: {beat.owner}</span><br />
                            <span>Price: {Number(beat.price)}</span><br />
                            <button onClick={() => handleBuyBeat(beat.id, beat.price)}>Buy</button>
                            <button>Donate For Owner</button>
                            <button>Favourit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListBeatSaling;