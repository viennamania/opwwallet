import { NextResponse, type NextRequest } from "next/server";

import {
  UserProps,
	acceptBuyOrder,
} from '@lib/api/order';

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";
import { idCounter } from "thirdweb/extensions/farcaster/idRegistry";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    mobile: mobile,
    message: message,
   } = body;

   

    try {


      
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
      
      

      const to = mobile;
      const msgBody = message;



      const response = await client.messages.create({
        body: msgBody,
        from: "+17622254217",
        to: to,
      });

      console.log(response.sid);

      

    } catch (e) {
      console.error('error', e);
    }




 
  return NextResponse.json({

    result : "success",
    
  });
  
}
