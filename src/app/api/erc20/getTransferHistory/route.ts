import { NextResponse, type NextRequest } from "next/server";


import { Network, Alchemy, AssetTransfersCategory } from 'alchemy-sdk';


const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MAINNET,
    connectionInfoOverrides: {
      skipFetchSetup: true,
    },
  };
  
const alchemy = new Alchemy(settings);
  



export async function GET(request: NextRequest) {


  const url = new URL(request.url);

  const toAddress = url.searchParams.get("toAddress") ?? undefined;


  
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    
    //fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",

    toAddress: toAddress,
    //toAddress: "0xd756755358f5ae805c189c9a63794cc51d44f4ed",
    //fromAddress: "0xf6d48af3161a418108239612c106b1F35231fa6D",

    category: [
      //AssetTransfersCategory.EXTERNAL, 
      //AssetTransfersCategory.INTERNAL, 
      AssetTransfersCategory.ERC20, 
      //AssetTransfersCategory.ERC721, 
      //AssetTransfersCategory.ERC1155
    ],
  });
  
  //console.log(data);
  
  /*
  const data = {
    hello: "world",
  };
  */

  const transfers = data?.transfers;


  return NextResponse.json({


    transfers,
    
  });
  
}
