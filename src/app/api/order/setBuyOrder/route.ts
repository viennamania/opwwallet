import { NextResponse, type NextRequest } from "next/server";

import {
	insertBuyOrder,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, nickname, usdtAmount, fietAmount, rate, privateSale, buyer } = body;

  ///console.log("setBuyOrder =====  walletAddress", walletAddress);
  

  const result = await insertBuyOrder({
    walletAddress: walletAddress,
    nickname: nickname,
    usdtAmount: usdtAmount,
    fietAmount: fietAmount,
    rate: rate,
    privateSale: privateSale,
    buyer: buyer
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
