import { NextResponse, type NextRequest } from "next/server";

import {
	insertSellOrder,
} from '@lib/api/orderOpw';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, opwAmount, fietAmount, fietCurrency, rate, payment, privateSale } = body;

  console.log("setSellOrder walletAddress", walletAddress);
  

  const result = await insertSellOrder({
    walletAddress: walletAddress,
    opwAmount: opwAmount,
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
