'use client'

import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Address } from 'viem'
import { getBalanceToken } from './utils/getTokenBalance'

// export const runtime = "edge";

function App() {
  const account = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [balanceToken, setBalanceToken] = useState(0);

  useEffect(() => {
    if (account.status === 'connected') {
      fetchBalanceToken();
    }
  }, [account]);

  const fetchBalanceToken = async () => {
    if( account.chainId != 97 ) {
      alert("Connect bsc testnet");
    }
    const balance = await getBalanceToken(account.address as Address);
    setBalanceToken(balance); 
  }

  return (
    <div>
      <div>
        {
          account.status === 'connected' ? (
            <div>
              <button onClick={() => disconnect()}>Disconnect</button>
              <p>Address: {account.address} </p>
              <p>Balance: {Number(balanceToken)} Token BW</p>
              <p>ChainID: {account.chainId} </p>
            </div>
          ) : (
            <div>
              <button onClick={() => connect({ connector: connectors[0] })}>Connect</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
