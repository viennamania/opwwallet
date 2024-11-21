import { NextResponse, type NextRequest } from "next/server";

import {
	updateSellerStatusJdPay
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, sellerStatus, qrcodeImage } = body;

  //console.log("walletAddress", walletAddress);
  //console.log("sellerStatus", sellerStatus);

  const result = await updateSellerStatusJdPay({
    walletAddress: walletAddress,
    sellerStatus: sellerStatus,
    qrcodeImage: qrcodeImage
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
