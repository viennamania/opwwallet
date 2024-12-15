import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	getAllUsers,
} from '@lib/api/user';


//import { client } from "../../../client";

/*
import {
  LocalWallet,
  SmartWallet,
  PrivateKeyWallet,
} from '@thirdweb-dev/wallets';
*/

import {
  //inAppWallet,
  //getWalletBalance,
  ///PrivateKeyWallet,

  privateKeyToAccount,
} from "thirdweb/wallets";

import { polygon } from "thirdweb/chains";


import {
  createThirdwebClient,
  getContract,
  sendTransaction,
  sendBatchTransaction,
  sendAndConfirmTransaction,
  prepareTransaction,
  toWei,
  SendBatchTransactionOptions,
  prepareContractCall,
} from "thirdweb";


import { Network, Alchemy, AssetTransfersCategory } from 'alchemy-sdk';


const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MAINNET,
    connectionInfoOverrides: {
      skipFetchSetup: true,
    },
  };
  
const alchemy = new Alchemy(settings);
  

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {



  

  const ADMIN_WALLET_PRIVATE_KEY = process.env.ADMIN_WALLET_PRIVATE_KEY + "";


  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID + "",
  });


  const account = privateKeyToAccount({
    client,
    privateKey: ADMIN_WALLET_PRIVATE_KEY,
  });
  




  const result = await getAllUsers(
    {
      limit: 1000,
      page: 1,
    }
  );

  //console.log("result", result);

  if (!result) {
    return NextResponse.json({
      result: false,
    });
  }

  const users = result.users;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];


    //console.log("address", address);

    /*
    const result = await getWalletBalance({
      chain: polygon,
      address: address,
      client: client,
    });

    console.log("result", result);

    if (result) {

      const balance = Number(result.value) / 10 ** 18;

      console.log("address", address, "balance", balance);

      
    }
    */

    // alrche getBalance

    if (!user.walletAddress) {
      continue;
    }


    try {
      const balance = await alchemy.core.getBalance( user.walletAddress );

    


      // balance is BigNumber { _hex: '0x00', _isBigNumber: true }

      //console.log("user.walletAddress", user.walletAddress, "balance", balance);

      const balanceValue = balance.toNumber() / 10 ** 18;


      

      if (balanceValue < 0.01) {
        console.log("user.walletAddress", user.walletAddress, "balanceValue", balanceValue, "is less than 0.1");

        // send 0.1 MATIC to user.walletAddress

        /*
        const tx = await sendAndConfirmTransaction({
          chain: polygon,
          client: client,
          to: user.walletAddress,
          value: BigInt(0.1 * 10 ** 18),
        });

        console.log("tx", tx);
        */

        //PreparedTransaction


        const transaction = prepareTransaction({
          to: user.walletAddress,
          chain: polygon,
          client: client,
          value: toWei("0.1"),
        });

        const tx = await sendAndConfirmTransaction({
          account: account,
          transaction: transaction,
        });

        console.log("tx", tx);



      }



    } catch (e) {

      //console.log("error", e + "");

    }


  }


  return NextResponse.json({
    result: true,
  });
  
}
