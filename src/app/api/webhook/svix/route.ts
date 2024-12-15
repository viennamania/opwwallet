import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	acceptBuyOrder,
  updateBuyOrderByQueueId,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";
import { idCounter } from "thirdweb/extensions/farcaster/idRegistry";



export async function POST(request: NextRequest) {

  const body = await request.json();


  console.log("body", body);

  /*
  body {
    type: 'event-log',
    data: {
      chainId: 137,
      contractAddress: '0xcf3ad9031729b5e131582138ede799f08f52299d',
      blockNumber: 65413971,
      transactionHash: '0x7e1c4c49fe71bb32d9a2e525863ebfc36c5275a41bb8568cfa945071d7645b02',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000f6d48af3161a418108239612c106b1f35231fa6d',
        '0x000000000000000000000000e38a3d8786924e2c1c427a4ca5269e6c9d37bc9c'
      ],
      data: '0x000000000000000000000000000000000000000000000000033f55c29d710000',
      eventName: 'Transfer',
      decodedLog: { to: [Object], from: [Object], value: [Object] },
      timestamp: 1734053978000,
      transactionIndex: 36,
      logIndex: 141
    }
  }
  */

  /*
  body {
    type: 'transaction-receipt',
    data: {
      chainId: 137,
      blockNumber: 65414081,
      contractAddress: '0xcf3ad9031729b5e131582138ede799f08f52299d',
      transactionHash: '0xa3e4e77c7b30c07eb596361179b589d3e91b7daf0fac67214b895c2b81ed2a10',
      blockHash: '0x041e215eb0ab3bf2e5f099986d26e3d27c84bebd1df5ebf6271ecd71f1975dc1',
      timestamp: 1734054212000,
      data: '0xa9059cbb0000000000000000000000007b773c495b91eec3c549c7f811d5c53241cef41f00000000000000000000000000000000000000000000000003311fc80a570000',
      value: '0',
      to: '0xcf3ad9031729b5e131582138ede799f08f52299d',
      from: '0xe38a3d8786924e2c1c427a4ca5269e6c9d37bc9c',
      transactionIndex: 93,
      gasUsed: '63737',
      effectiveGasPrice: '33675808404',
      status: 1
    }
  }
  */


  /*

  const {
    type,
    data,
  } = body;

  // type: 'event-log', 'transaction-receipt'

  if (type === "event-log") {
    return handleEventLog(data);
  } else if (type === "transaction-receipt") {
    return handleTransactionReceipt(data);
  }

  */





  /*
  if (status === "mined") {

    const result = await updateBuyOrderByQueueId({
      queueId,
      transactionHash,
      minedAt,
    });

    console.log("updateBuyOrderByQueueId", result);

    if (result) {
      return NextResponse.json({
        result: "ok",
      });
    } else {
      return NextResponse.json({
        result: "error",
      });
    }

  }
  */


  
  return NextResponse.json({
    result: "ok",
  });
  
  

  /*
  Content-Type: application/json
  X-Engine-Signature: <payload signature>
  X-Engine-Timestamp: <Unix timestamp in seconds>
  */

  /*
body {
  queueId: '0215d127-7d9c-48ba-b5d6-c78f0bbecbeb',
  status: 'mined',
  chainId: '137',
  fromAddress: '0x865D4529EF3a262a7C63145C8906AeD9a1b522bD',
  toAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  data: '0xa9059cbb0000000000000000000000005202a5853c338a38485fa11eda67ca95cb9fce99000000000000000000000000000000000000000000000000000000000015d1f0',
  value: '0',
  nonce: 34,
  deployedContractAddress: null,
  deployedContractType: null,
  functionName: 'transfer',
  functionArgs: '["0x5202a5853c338A38485Fa11eda67ca95cb9fce99","1.43","0xc2132d05d31c914a87c6611c10748aeb04b58e8f"]',
  extension: 'erc20',
  gasLimit: '530000',
  gasPrice: null,
  maxFeePerGas: '61908001546',
  maxPriorityFeePerGas: '61908001454',
  transactionType: 2,
  transactionHash: '0xec8fb837702f845c64bfe2e69d28095f450457b4ac31491122729bb8113f1783',
  queuedAt: '2024-09-08T03:52:17.828Z',
  sentAt: '2024-09-08T03:52:52.212Z',
  minedAt: '2024-09-08T03:53:23.705Z',
  cancelledAt: null,
  errorMessage: null,
  sentAtBlockNumber: 61559147,
  blockNumber: 61559150,
  retryCount: 0,
  onChainTxStatus: 1,
  onchainStatus: 'success',
  effectiveGasPrice: '61908001478',
  cumulativeGasUsed: '2178297',
  signerAddress: '0x865D4529EF3a262a7C63145C8906AeD9a1b522bD',
  accountAddress: null,
  target: null,
  sender: null,
  initCode: null,
  callData: null,
  callGasLimit: null,
  verificationGasLimit: null,
  preVerificationGas: null,
  paymasterAndData: null,
  userOpHash: null,
  retryGasValues: null,
  retryMaxFeePerGas: null,
  retryMaxPriorityFeePerGas: null
}

  */


  ///console.log("body", body);


  
}
