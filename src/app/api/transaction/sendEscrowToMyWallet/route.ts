import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	confirmPayment,
  getOrderById,
} from '@lib/api/order';

import {
  getOneByWalletAddress 
} from '@lib/api/user';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";




import {
  createThirdwebClient,
  eth_getTransactionByHash,
  getContract,
  sendAndConfirmTransaction,
  
  sendBatchTransaction,


} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import {
  polygon,
  arbitrum,
 } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


import {
  mintTo,
  totalSupply,
  transfer,
  
  getBalance,

  balanceOf,

} from "thirdweb/extensions/erc20";



if (!process.env.THIRDWEB_ENGINE_URL) {
  throw new Error("THIRDWEB_ENGINE_URL is not defined");
}

if (!process.env.THIRDWEB_ENGINE_ACCESS_TOKEN) {
  throw new Error("THIRDWEB_ENGINE_ACCESS_TOKEN is not defined");
}




// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

//nextjs /pages/api
/*
export const config = {
	//runtime: 'edge',
	maxDuration: 120, // This function can run for a maximum of 60 seconds
};
*/





//const chain = polygon;


// OPW Token (OPW)
const tokenContractAddressOPW = '0x7f0c8d6f0d8c6f0b7d1f2f1b8f7d1e1f3f0f0f0';






export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, walletAddress, amount: escrowAmount } = body;


  console.log("chain===>" + chain);
  console.log("walletAddress===>" + walletAddress);
  console.log("escrowAmount===>" + escrowAmount);

  
  try {


    const user = await getOneByWalletAddress(walletAddress);

    if (!user) {
      return NextResponse.json({
        result: null,
      });
    }






    const toAddressStore = walletAddress;

    // const sendAmountToStore = amount; // This line is no longer needed





      const escrowWalletPrivateKey = user.escrowWalletPrivateKey;

      ///console.log("escrowWalletPrivateKey===>" + escrowWalletPrivateKey);

      if (!escrowWalletPrivateKey) {
        return NextResponse.json({
          result: null,
        });
      }

      const client = createThirdwebClient({
        secretKey: process.env.THIRDWEB_SECRET_KEY || "",
      });

      if (!client) {

        return NextResponse.json({
          result: null,
        });
      }


      const personalAccount = privateKeyToAccount({
        client,
        privateKey: escrowWalletPrivateKey,
      });

      console.log("personalAccount===>" + personalAccount);
    
      if (!personalAccount) {
        return NextResponse.json({
          result: null,
        });
      }


      const wallet = smartWallet({
        chain: chain === 'polygon' ? polygon : arbitrum,
        sponsorGas: true,
      });

      console.log("wallet===>" + wallet);

      if (!wallet) {
        console.log("wallet is null");
        return NextResponse.json({
          result: null,
        });
      }

      // Connect the smart wallet
      const account = await wallet.connect({
        client: client,
        personalAccount: personalAccount,
      });

      console.log("account===>" + account);

      if (!account) {
        console.log("account is null");
        return NextResponse.json({
          result: null,
        });
      }

 
      const contract = getContract({
        client,
        chain: chain === 'polygon' ? polygon : arbitrum,
        address: tokenContractAddressOPW, // erc20 contract from thirdweb.com/explore
      });
      
                
      const transactionSendToStore = transfer({
        contract,
        to: toAddressStore,
        amount: escrowAmount,
      });

      const sendDataStore = await sendAndConfirmTransaction({
        transaction: transactionSendToStore,
        account: account,
      });

      console.log("sendDataStore===>" + JSON.stringify(sendDataStore));
  
      
      if (!sendDataStore) {
        console.log("sendDataStore is null");
        return NextResponse.json({
          result: null,
        });
      }

      const transactionHashResult = sendDataStore.transactionHash;

    



    console.log("Sent successfully!");


    
    
    return NextResponse.json({
  
      result: {
        transactionHash: transactionHashResult,
      },
      
    });





  } catch (error) {
      
    console.log(" error=====>" + JSON.stringify(error));



  }

  


 
  return NextResponse.json({

    result: null,
    
  });
  
}
