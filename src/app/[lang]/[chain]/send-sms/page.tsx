// send USDT
'use client';


import React, { use, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { client } from '../../../client';

import {
    //ThirdwebProvider,
    ConnectButton,
  
    useConnect,
  
    useReadContract,
  
    useActiveWallet,

    useActiveAccount,
    useSendBatchTransaction,

    useConnectedWallets,

    useSetActiveWallet,

    
} from "thirdweb/react";

import {
    polygon,
    arbitrum,
} from "thirdweb/chains";

import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 


import {
  createWallet,
  inAppWallet,
  getWalletBalance,
} from "thirdweb/wallets";

import Image from 'next/image';

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";



const wallets = [
  inAppWallet({
    auth: {
      options: ["phone", "email"],
    },
  }),
];




//const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
//const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum




//const contractAddressTron = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // USDT on Tron






/*
const smartWallet = new smartWallet(config);
const smartAccount = await smartWallet.connect({
  client,
  personalAccount,
});
*/

import {
  useRouter,
  useSearchParams
} from "next//navigation";

///import { Select } from '@mui/material';


import { Sen } from 'next/font/google';
import { Router } from 'next/router';
import path from 'path';
import { Message } from 'twilio/lib/twiml/MessagingResponse';






export default function SendSms({ params }: any) {


  //console.log("params", params);

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');

  const token = searchParams.get('token');

  //console.log("token", token);

  const tokenImage = "/token-" + String(token).toLowerCase() + "-icon.png";



  const [contractAddress, setContractAddress] = useState('');
  const [contractAddressArbitrum, setContractAddressArbitrum] = useState('');
  useEffect(() => {
    if (token === "USDT") {
      setContractAddress("0xc2132D05D31c914a87C6611C10748AEb04B58e8F"); // USDT on Polygon
      setContractAddressArbitrum("0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"); // USDT on Arbitrum
    } else if (token === "OPW") {
      setContractAddress("0xcF3Ad9031729B5E131582138edE799F08F52299D"); // OPW on Polygon
      setContractAddressArbitrum("0xcF3Ad9031729B5E131582138edE799F08F52299D"); // OPW on Arbitrum
    }
  } , [token]);


  
  
  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "arbitrum" ? arbitrum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

    address: params.chain === "arbitrum" ? contractAddressArbitrum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });







  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    My_Balance: "",
    My_Nickname: "",
    My_Buy_Trades: "",
    My_Sell_Trades: "",
    Buy: "",
    Sell: "",
    Buy_USDT: "",
    Sell_USDT: "",
    Contact_Us: "",
    Buy_Description: "",
    Sell_Description: "",
    Send_USDT: "",
    Pay_USDT: "",
    Coming_Soon: "",
    Please_connect_your_wallet_first: "",

    USDT_sent_successfully: "",
    Failed_to_send_USDT: "",

    Go_Buy_USDT: "",
    Enter_Wallet_Address: "",
    Enter_the_amount_and_recipient_address: "",
    Select_a_user: "",
    User_wallet_address: "",
    This_address_is_not_white_listed: "",
    If_you_are_sure_please_click_the_send_button: "",

    Sending: "",

    Anonymous: "",

    My_Wallet_Address: "",

    Token_sent_successfully: "",

    Failed_to_send_token: "",

    Send: "",

    Sign_in_with_Wallet: "",

    Country_Code: "",
    Mobile_Number: "",
    Message: "",

  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    My_Balance,
    My_Nickname,
    My_Buy_Trades,
    My_Sell_Trades,
    Buy,
    Sell,
    Buy_USDT,
    Sell_USDT,
    Contact_Us,
    Buy_Description,
    Sell_Description,
    Send_USDT,
    Pay_USDT,
    Coming_Soon,
    Please_connect_your_wallet_first,

    USDT_sent_successfully,
    Failed_to_send_USDT,

    Go_Buy_USDT,
    Enter_Wallet_Address,
    Enter_the_amount_and_recipient_address,
    Select_a_user,
    User_wallet_address,
    This_address_is_not_white_listed,
    If_you_are_sure_please_click_the_send_button,

    Sending,

    Anonymous,

    My_Wallet_Address,

    Token_sent_successfully,

    Failed_to_send_token,

    Send,

    Sign_in_with_Wallet,

    Country_Code,
    Mobile_Number,
    Message,
    
  } = data;



  const router = useRouter();



  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;



  const [amount, setAmount] = useState(0);




  const [polBalance, setPolBalance] = useState(0);
  useEffect(() => {
        
    
      const getPolBalance = async () => {
  
        if (!address) {
          return;
        }
  
        try {
          const result = await getWalletBalance({
            chain: polygon,
            address: address,
            client: client,
          });

          ///console.log("result", result);
      
          if (!result) return;
      
          setPolBalance( Number(result.value) / 10 ** 18 );
  
        } catch (error) {
          console.error("Error getting balance", error);
        }
  
      };
  
      
      getPolBalance();
  
      // get the balance in the interval
      const interval = setInterval(() => {
        getPolBalance();
      }, 1000);
  
  
      return () => clearInterval(interval);
 
  } , [address]);


  const [balance, setBalance] = useState(0);

  useEffect(() => {
   
    const getBalance = async () => {

      if (!address || !contract) return;

      const result = await balanceOf({
        contract,
        address: address,
      });
      if (!result) return;
      if (token === "USDT") {
        setBalance(Number(result) / 10 ** 6);
      } else if (token === "OPW") {
        setBalance(Number(result) / 10 ** 18);
      }

    };
    getBalance();

    const interval = setInterval(() => {
      getBalance();
    }, 1000);

    return () => clearInterval(interval);
    
  } , [address, contract, token]);


  console.log("balance", balance);

  /*
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      ///console.log('getBalance address', address);

      
      const result = await balanceOf({
        contract,
        address: address || "",
      });

  
      //console.log(result);

      if (!result) return;
  
      setBalance( Number(result) / 10 ** 6 );


      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.chain,
          walletAddress: address,
        }),
      })

      .then(response => response.json())

      .then(data => {
          setNativeBalance(data.result?.displayValue);
      });



    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);

  } , [address, contract, params.chain]);
  */











  const [user, setUser] = useState(
    {
      _id: '',
      id: 0,
      email: '',
      nickname: '',
      avatar: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    }
  );

  useEffect(() => {

    if (!address) return;

    const getUser = async () => {

      const response = await fetch('/api/user/getUserByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });

      if (!response) return;

      const data = await response.json();


      setUser(data.result);

    };

    getUser();

  }, [address]);









  // get list of user wallets from api
  const [users, setUsers] = useState([
    {
      _id: '',
      id: 0,
      email: '',
      avatar: '',
      nickname: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    }
  ]);

  const [totalCountOfUsers, setTotalCountOfUsers] = useState(0);

  useEffect(() => {

    if (!address) return;

    const getUsers = async () => {

      const response = await fetch('/api/user/getAllUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      });

      const data = await response.json();

      ///console.log("getUsers", data);


      ///setUsers(data.result.users);
      // set users except the current user

      setUsers(data.result.users.filter((user: any) => user.walletAddress !== address));



      setTotalCountOfUsers(data.result.totalCount);

    };

    getUsers();


  }, [address]);






  const [recipient, setRecipient] = useState({
    _id: '',
    id: 0,
    email: '',
    nickname: '',
    avatar: '',
    mobile: '',
    walletAddress: '',
    createdAt: '',
    settlementAmountOfFee: '',
  });




  // send sms
  const [countryCode, setCountryCode] = useState('+86');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSendingSms, setIsSendingSms] = useState(false);
  const sendSms = async () => {
    
    if (isSendingSms) {
      return;
    }

    if (!countryCode) {
      toast.error('Please enter a valid country code');
      return;
    }

    if (!mobileNumber) {
      toast.error('Please enter a valid mobile number');
      return;
    }

    if (!message) {
      toast.error('Please enter a valid message');
      return;
    }

    setIsSendingSms(true);

    try {

      const response = await fetch('/api/sms/sendSms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: countryCode + mobileNumber,
          message: message,
        }),
      });

      const data = await response.json();

      if (data.result) {
        toast.success('SMS sent successfully');

        setMessage('');

      } else {
        toast.error('Failed to send SMS');
      }

    } catch (error) {
      console.error("error", error);
      toast.error('Failed to send SMS');
    }

    setIsSendingSms(false);

  }



  return (

    <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

      <div className="py-0 w-full ">

        {/* goto home button using go back icon
        history back
        */}
        <AppBarComponent />


        <Header
          lang={params.lang}
          chain={params.chain}
        />

        {/*
        <div className="mt-4 flex justify-start space-x-4 mb-10">
            <button
              
              onClick={() => router.push(
                
                //'/' + params.lang + '/' + params.chain

                wallet === "smart" ?
                '/' + params.lang + '/' + params.chain + '/?wallet=smart'
                :
                '/' + params.lang + '/' + params.chain

              )}

              className="text-gray-600 font-semibold underline">
              {Go_Home}
            </button>
        </div>
        */}
        


        <div className="flex flex-col items-start justify-center space-y-4">

            <div className='flex flex-row items-center space-x-4'>

              <div className='flex flex-row items-center space-x-2'>

                
              </div>

              <div className="text-2xl font-semibold">
                SMS {Send}
              </div>

            </div>

            {/* goto buy usdt page */}
            {/*
            <div className="text-sm font-semibold text-zinc-100 mt-2 w-full text-right">
  
              <a
                href={

                  '/' + params.lang + '/' + params.chain + '/buy-usdt' + '?wallet=' + wallet
                
                }

                className="text-zinc-100 underline"
              >
                {token} 구매하러 가기
              </a>
            </div>
            */}


            <div className="w-full flex flex-row gap-2 justify-end items-center">
              <select
                className="
                  p-2 bg-blue-500 text-white rounded w-40
                  transition duration-300 ease-in-out
                  transform hover:-translate-y-1

                "
                onChange={(e) => {
                  const lang = e.target.value;
                  router.push(
                    "/" + lang + "/" + params.chain + "/send-sms"
                  );
                }}
              >
                <option
                  value="en"
                  selected={params.lang === "en"}
                >
                  English(US)
                </option>
                <option
                  value="zh"
                  selected={params.lang === "zh"}
                >
                  中文(ZH)
                </option>
                <option
                  value="ja"
                  selected={params.lang === "ja"}
                >
                  日本語(JP)
                </option>
                <option
                  value="kr"
                  selected={params.lang === "kr"}
                >
                  한국어(KR)
                </option>
                <option
                  value="vi"
                  selected={params.lang === "vi"}
                >
                  Tiếng Việt(VN)
                </option>
                <option
                  value="th"
                  selected={params.lang === "th"}
                >
                  ไทย(TH)
                </option>
              </select>

            </div>
          


            <div className='w-full  flex flex-col gap-5 border
              bg-yellow-500 border-yellow-500 text-white
              p-4 rounded-lg

              '>


                {/* send sms */}
                {/* input mobile phome number and input message */}
                <div className='w-full flex flex-col gap-4'>

                  
                  
                  <div className='w-full flex flex-col items-start gap-4'>
                    <div className='text-lg font-semibold'>
                      {Mobile_Number}
                    </div>


                    <div className='flex flex-row items-center gap-4'>
                      {/* country code */}
                      {/* select country code */}
                      <select
                        className='w-24 p-2 rounded-lg border border-white text-black'
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option
                          value='+86'
                          //selected={countryCode === '+86'}
                        >+86</option>
                        <option
                          value='+82'
                          //selected={countryCode === '+82'}
                        >+82</option>
                        <option
                          value='+81'
                          selected={countryCode === '+81'}
                        >+81</option>
                        <option
                          value='+84'
                          selected={countryCode === '+84'}
                        >+84</option>
                        <option
                          value='+66'
                          selected={countryCode === '+66'}
                        >+66</option>

                      </select>



                      <div className='text-lg font-semibold'>
                        -
                      </div>
                      <input
                        type='text'
                        className='w-full p-2 rounded-lg border border-white text-black'
                        placeholder='1012345678'
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>

                  </div>


                  <div className='w-full flex flex-row items-between gap-4'>
                    <div className='w-20  text-lg font-semibold'>
                      {Message}
                    </div>
                    <textarea
                      className='w-full p-2 rounded-lg border border-white text-black'
                      placeholder='Hello, World!'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                {/* send button */}
                <div className='w-full flex justify-center'>
                  <button
                    disabled={isSendingSms || !countryCode || !mobileNumber || !message}
                    className={`
                      ${isSendingSms ? 'bg-gray-500' : 'bg-blue-500'}
                      w-40
                      text-white p-2 rounded-lg
                      transition duration-300 ease-in-out
                      transform hover:-translate-y-1
                    `}
                    onClick={sendSms}
                  >
                    {isSendingSms ? 'Sending...' : 'Send'}
                  </button>
                </div>


            </div>




        </div>

       </div>

    </main>

  );

}





function Header(
  {
    lang,
    chain,
  } : {
    lang: string,
    chain: string,
  }
) {

  const router = useRouter();


  return (
    <header className="flex flex-col items-center mb-5 md:mb-10">

      {/* header menu */}
      <div className="w-full flex flex-row justify-between items-center gap-2
        bg-zinc-800 p-5 rounded-lg text-center
        hover:shadow-lg
        transition duration-300 ease-in-out
        transform hover:-translate-y-1
        
      ">
        <button
          onClick={() => {
            router.push(
              "/" + lang + "/" + chain
            );
          }}
        >
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/logo-opw.png"
              alt="Circle Logo"
              width={35}
              height={35}
              className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
            />
            <span className="text-lg xl:text-3xl text-zinc-100 font-semibold">
              OPW Wallet
            </span>
          </div>
        </button>

      </div>
      
    </header>
  );
}
