import { NextResponse, type NextRequest } from "next/server";

import {
	getOpenOrdersCount,
} from '@lib/api/orderOpw';



export async function POST(request: NextRequest) {

  const body = await request.json();



  const result = await getOpenOrdersCount();

 
  return NextResponse.json({

    result,
    
  });
  
}
