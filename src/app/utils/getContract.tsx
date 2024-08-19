import React, { useEffect, useState } from "react";
import { getContract } from "viem";
import { publicClient} from "../../client";
import { contract } from "../abi/contractAbi";
import { Address } from "viem";

export const contractRead = getContract({
    address: contract.address as Address,
    abi: contract.abi,
    client: publicClient,
});