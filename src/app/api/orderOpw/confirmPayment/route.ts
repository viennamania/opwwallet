import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	confirmPayment,
  getOrderById,
} from '@lib/api/orderOpw';

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



const tokenContractAddressOPW = "0xcF3Ad9031729B5E131582138edE799F08F52299D"; // OPW on Polygon

const contractAddressArbitrum = "0xcF3Ad9031729B5E131582138edE799F08F52299D"; // OPW on Arbitrum






export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, orderId, paymentAmount, isSmartAccount } = body;

  console.log("lang", lang);
  console.log("chain", chain);

  console.log("orderId", orderId);

  console.log("paymentAmount", paymentAmount);

  console.log("isSmartAccount", isSmartAccount);






  
  try {



    // get buyer wallet address


    const order = await getOrderById( orderId );

    if (!order) {
      return NextResponse.json({
        result: null,
      });
    }
    

    const {
      walletAddress: walletAddress,
      opwAmount: opwAmount,
      buyer: buyer,
    } = order as UserProps;


    const sellerWalletAddress = walletAddress;

    //console.log("sellerWalletAddress", sellerWalletAddress);


    if (!sellerWalletAddress) {
      return NextResponse.json({
        result: null,
      });
    }

    const user = await getOneByWalletAddress(sellerWalletAddress);

    ///console.log("user", user);

    if (!user) {
      return NextResponse.json({
        result: null,
      });
    }


    const escrowWalletAddress = user.escrowWalletAddress;



    const toAddressStore = buyer.walletAddress;

    const sendAmountToStore = opwAmount;




    let transactionHashResult = "";
    let queueId = "";



    if (isSmartAccount) {


      const escrowWalletPrivateKey = user.escrowWalletPrivateKey;

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
    
      if (!personalAccount) {
        return NextResponse.json({
          result: null,
        });
      }


      const wallet = smartWallet({

        chain: chain === 'polygon' ? polygon : arbitrum,
        sponsorGas: true,
      });

      // Connect the smart wallet
      const account = await wallet.connect({
        client: client,
        personalAccount: personalAccount,
      });

      if (!account) {
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
        amount: sendAmountToStore,
      });

      const sendDataStore = await sendAndConfirmTransaction({
        transaction: transactionSendToStore,
        account: account,
      });
  
      
      if (!sendDataStore) {
        return NextResponse.json({
          result: null,
        });
      }

      transactionHashResult = sendDataStore.transactionHash;

    } else {


      // /backend-wallet/{chain}/transfer
      /*
      {
        "to": "0x152e208d08cd3ea1aa5d179b2e3eba7d1a733ef4",
        "currencyAddress": "0x0000000000000000000000000000000000000000",
        "amount": "string",
        "txOverrides": {
          "gas": "530000",
          "maxFeePerGas": "1000000000",
          "maxPriorityFeePerGas": "1000000000",
          "value": "10000000000"
        }
      }
      */
      // if chain if "polygon" then chainId is 137
      const chainId = chain === "polygon" ? polygon.id : arbitrum.id;
      const url = process.env.THIRDWEB_ENGINE_URL + "/backend-wallet/" + chainId + "/transfer";

      ///console.log("url", url);

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
          "x-backend-wallet-address": escrowWalletAddress,
        },
        body: JSON.stringify({
          to: toAddressStore,
          currencyAddress: chain === "polygon" ? tokenContractAddressOPW : contractAddressArbitrum,
          amount: sendAmountToStore,
          txOverrides: {
            gas: "530000",
            maxFeePerGas: "1000000000",
            maxPriorityFeePerGas: "1000000000",
            value: "10000000000",
          },
        }),
      });
          

      /*
      {
        "result": {
          "transactionHash": "string"
        }
      }
      */

      //console.log("resp", resp);


      if (!resp) {
        return NextResponse.json({
          result: null,
        });
      }

      const responseJson = await resp.json();

      console.log("responseJson", responseJson);

      queueId = responseJson.result.queueId;

      ///const hash = responseJson.result.transactionHash;

      transactionHashResult = "0x";



    }





    console.log("Sent successfully!");



    const result = await confirmPayment({
      lang: lang,
      chain: chain,
      orderId: orderId,
      paymentAmount: paymentAmount,

      queueId: queueId,
      
      transactionHash: transactionHashResult,
    });
  
  
    //console.log("result", JSON.stringify(result));
  
    const {
      nickname: nickname,
      tradeId: tradeId,
    } = result as UserProps;
  
  
  
    const amount = opwAmount;


    // send sms

    /*
    if (!buyer.mobile) {
      return NextResponse.json({
        result,
      });
    }


    // check buyer.mobile is prefixed with +
    if (!buyer.mobile.startsWith("+")) {
      return NextResponse.json({
        result,
      });
    }



    const to = buyer.mobile;


    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);



    let message = null;


    try {

      


      const msgBody = `[OPW] TID[${tradeId}] You received ${amount} USDT from ${nickname}! https://wallet.olgaai.io/${lang}/${chain}/sell-usdt/${orderId}`;
  
      message = await client.messages.create({
        ///body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        body: msgBody,
        from: "+17622254217",
        to: to,
      });
  
      console.log(message.sid);

    } catch (error) {
        
      console.log("error", error);
  
    }
    */
  
    
    return NextResponse.json({
  
      result,
      
    });





  } catch (error) {
      
    console.log(" error=====>" + error);



  }

  


 
  return NextResponse.json({

    result: null,
    
  });
  
}