import { NextResponse, type NextRequest } from "next/server";

import {
	insertSellOrder,
} from '@lib/api/order';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, usdtAmount, fietAmount, fietCurrency, rate, payment, privateSale } = body;

  console.log("setSellOrder walletAddress", walletAddress);
  

  const result = await insertSellOrder({
    walletAddress: walletAddress,
    usdtAmount: usdtAmount,
    fietAmount: fietAmount,
    fietCurrency: fietCurrency,
    rate: rate,
    payment: payment,
    privateSale: privateSale,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
