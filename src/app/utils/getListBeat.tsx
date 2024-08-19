import { contractRead } from "./getContract";

interface Beat {
    id: number;
    title: string;
    owner: string;
    price: number;
    isForSale: boolean;
}

export const getListBeat = async () => {
    const total = await contractRead.read.beatCountId();

    let beatArray: Beat[] = [];
    for (let i = 1; i <= Number(total); i++) {
        const beat: any = await contractRead.read.beats([i]);
        const typeBeat: Beat = {
            id: i,
            owner: beat[0],         
            title: beat[2],         
            price: Number(beat[3]), 
            isForSale: beat[4]
        };

        beatArray.push(typeBeat);

    }
    
    return beatArray;
}