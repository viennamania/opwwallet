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
      options: ["phone"],
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

import { Select } from '@mui/material';
import { Sen } from 'next/font/google';
import { Router } from 'next/router';
import path from 'path';






export default function SendUsdt({ params }: any) {


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

      console.log("getUsers", data);


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



  ///console.log("recipient", recipient);

  //console.log("recipient.walletAddress", recipient.walletAddress);
  //console.log("amount", amount);



  const [otp, setOtp] = useState('');

  
  
  /////const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(true); // for testing


  const [isSendedOtp, setIsSendedOtp] = useState(false);



  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [isVerifingOtp, setIsVerifingOtp] = useState(false);

  

  const sendOtp = async () => {

    setIsSendingOtp(true);
      
    const response = await fetch('/api/transaction/setOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        mobile: user.mobile,
      }),
    });

    const data = await response.json();

    //console.log("data", data);

    if (data.result) {
      setIsSendedOtp(true);
      toast.success('OTP sent successfully');
    } else {
      toast.error('Failed to send OTP');
    }

    setIsSendingOtp(false);

  };

  const verifyOtp = async () => {

    setIsVerifingOtp(true);
      
    const response = await fetch('/api/transaction/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        otp: otp,
      }),
    });

    const data = await response.json();

    //console.log("data", data);

    if (data.status === 'success') {
      setVerifiedOtp(true);
      toast.success('OTP verified successfully');
    } else {
      toast.error('Failed to verify OTP');
    }

    setIsVerifingOtp(false);
  
  }




  const [sending, setSending] = useState(false);


  
  const sendUsdt = async () => {
    if (sending) {
      return;
    }

   
    if (!amount) {
      toast.error('Please enter a valid amount');
      return;
    }

    //console.log('amount', amount, "balance", balance);

 
    if (Number(amount) > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setSending(true);



    try {




        // send USDT
        // Call the extension function to prepare the transaction
        const transaction = transfer({
            //contract,

            contract: contract,

            to: recipient.walletAddress,
            amount: amount,
        });
        

        const { transactionHash } = await sendTransaction({
          
          account: activeAccount as any,

          transaction,
        });

        
        if (transactionHash) {


          await fetch('/api/transaction/setTransfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              walletAddress: address,
              amount: amount,
              toWalletAddress: recipient.walletAddress,
            }),
          });



          toast.success(USDT_sent_successfully);

          setAmount(0); // reset amount

          // refresh balance

          // get the balance

          const result = await balanceOf({
            contract,
            address: address || "",
          });

          //console.log(result);
          if (token === "USDT") {
            setBalance( Number(result) / 10 ** 6 );
          } else if (token === "OPW") {
            setBalance( Number(result) / 10 ** 18 );
          }


        } else {

          toast.error(Failed_to_send_USDT);

        }

      

      


    } catch (error) {
      
      console.error("error", error);

      toast.error(Failed_to_send_USDT);
    }

    setSending(false);
  };



  const sendToken = async () => {
    if (sending) {
      return;
    }

    if (!recipient.walletAddress) {
      toast.error('Please enter a valid address');
      return;
    }

    if (!amount) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (Number(amount) > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setSending(true);

    try {
      // Call the extension function to prepare the transaction
      const transaction = transfer({
        contract,
        to: recipient.walletAddress,
        amount: amount,
      });

      const { transactionHash } = await sendTransaction({
        account: activeAccount as any,
        transaction,
      });

      if (transactionHash) {
        toast.success(Token_sent_successfully);
        setAmount(0); // reset amount

      } else {
        toast.error(Failed_to_send_token);
      }
    } catch (error) {
      console.error(error);
      toast.error(Failed_to_send_token);
    }

    setSending(false);
  };






  // get user by wallet address
  const getUserByWalletAddress = async (walletAddress: string) => {

    const response = await fetch('/api/user/getUserByWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
      }),
    });

    const data = await response.json();

    //console.log("getUserByWalletAddress", data);

    return data.result;

  };
  
  const [wantToReceiveWalletAddress, setWantToReceiveWalletAddress] = useState(true);


  const [isWhateListedUser, setIsWhateListedUser] = useState(false);

  
  /*
  useEffect(() => {

    if (!recipient?.walletAddress) {
      return;
    }

    // check recipient.walletAddress is in the user list
    getUserByWalletAddress(recipient?.walletAddress)
    .then((data) => {
        
        //console.log("data============", data);
  
        const checkUser = data

        if (checkUser) {
          setIsWhateListedUser(true);

          setRecipient(checkUser as any);

        } else {
          setIsWhateListedUser(false);

          setRecipient({


            _id: '',
            id: 0,
            email: '',
            nickname: '',
            avatar: '',
            mobile: '',
            walletAddress: recipient?.walletAddress,
            createdAt: '',
            settlementAmountOfFee: '',

          });


        }

    });

  } , [recipient?.walletAddress]);
  */

  


  





  // usdt balance
  const [usdtBalance, setUsdtBalance] = useState(0);



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
               
                <Image
                  src={tokenImage}
                  alt="token"
                  width={35}
                  height={35}
                  className="rounded-full bg-white p-1"
                />
        
                {/*
                <Image
                  src={`/logo-${params.chain}.png`}
                  alt="chain"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                */}
                
              </div>

              <div className="text-2xl font-semibold">
                {token} {Send}
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


          
            {/* my usdt balance */}
            <div className="w-full flex flex-col gap-2 items-start">


              <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-3">

                {/* my usdt balance */}
                <div className="flex flex-row items-start gap-3">
                  
                  <div className="flex flex-col gap-2 items-start">
                    
                    <div className='flex flex-row items-center gap-2'>
                      {/* dot icon */}
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <div className="text-sm">{My_Balance}</div>
                    </div>

                    <div className="flex flex-row items-end justify-center  gap-2">
                      <span className="text-4xl font-semibold text-gray-800">
                        
                        
                        {Number(balance).toFixed(2)}
                        

                      </span>
                      <span className="text-lg">{token}</span>
                    </div>
                  </div>


                  {!address && (

                    <ConnectButton
                    client={client}
                    wallets={wallets}

                    /*
                    accountAbstraction={{
                      chain: polygon, 
                      sponsorGas: true
                    }}
                    */
                   
                    theme={"light"}
                    connectButton={{
                      label: Sign_in_with_Wallet,
                    }}
                    connectModal={{
                      size: "wide", 
                      titleIcon: "https://wallet.olgaai.io/logo-opw.png",                       
                      showThirdwebBranding: false,

                    }}
                    //locale={"ko_KR"}
                    //locale={"en_US"}
                    locale={
                      params.lang === "en" ? "en_US" :
                      params.lang === "zh" ? "en_US" :
                      params.lang === "ja" ? "ja_JP" :
                      params.lang === "kr" ? "ko_KR" :
                      "en_US"
                    }
                    />


                  )}


                  {/*address && (

                    <div className="flex flex-col gap-2 items-center
                      border border-zinc-400 rounded-md p-2">
                  
                      <div className="flex flex-row items-center gap-2">
                        <button
                          className="text-sm text-zinc-400 underline"
                          onClick={() => {
                            navigator.clipboard.writeText(address);
                            toast.success('Copied wallet address');
                          } }
                        >
                          {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </button>

                        <div className="flex flex-row items-center gap-2">
                    
                          <Image
                            src={user?.avatar || "/profile-default.png"}
                            alt="Avatar"
                            width={20}
                            height={20}
                            priority={true} // Added priority property
                            className="rounded-full"
                            style={{
                                objectFit: 'cover',
                                width: '20px',
                                height: '20px',
                            }}
                          />
                          
                          <div className="text-lg font-semibold text-white ">
                            {
                              user && user.nickname ? user.nickname : Anonymous
                            }
                          </div>

                   
                          {address && !user && (
                            <button
                              onClick={() => {
                                router.push('/' + params.lang + '/' + params.chain + '/profiles?wallet=' + wallet);
                              }}
                              className="text-sm text-zinc-400 underline"
                            >
                              Go to profile
                            </button>
                          )}

                        </div>




                      </div>
                    

                    </div>

                  )*/}






                </div>


                {/* POL balance */}
                <div
                  className="flex flex-row gap-2 justify-start items-center p-2"
                >
                  <Image
                    src="/icon-gas-station.png"
                    alt="Gas Station"
                    width={25}
                    height={25}
                  />
                  
                  <div className="text-xl font-semibold text-gray-800">
                    {Number(polBalance).toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-800">
                    POL
                  </p>

                </div>





              </div>



            </div>


            <div className='w-full  flex flex-col gap-5 border
              bg-yellow-500 border-yellow-500 text-white
              p-4 rounded-lg

              '>


              <div className='flex flex-row gap-5 items-center justify-start'>
                {/* dot icon */}
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <div className="text-lg
                  font-semibold
                  text-gray-800

                ">
                  {Enter_the_amount_and_recipient_address}
                </div>
              </div>


              <div className='mb-5 flex flex-col xl:flex-row gap-5 items-start justify-between'>

                <input
                  disabled={sending}
                  type="number"
                  //placeholder="Enter amount"
                  className=" w-64 p-2 border border-gray-300 rounded text-black text-5xl font-semibold "
                  
                  value={amount}

                  onChange={(e) => (

                    // check if the value is a number


                    // check if start 0, if so remove it

                    e.target.value = e.target.value.replace(/^0+/, ''),



                    // check balance

                    setAmount(e.target.value as any)

                  )}
                />
           
                <div className="flex flex-col gap-2 items-start justify-center">

                  <div className=" flex-row gap-2 items-center justify-center hidden">
                    <input
                      type="checkbox"
                      className="w-6 h-6"
                      checked={wantToReceiveWalletAddress}
                      onChange={(e) => setWantToReceiveWalletAddress(e.target.checked)}
                    />
                    <div className="text-white">
                      {Enter_Wallet_Address}
                    </div>
                  </div>

            
            
                  {!wantToReceiveWalletAddress ? (
                    <>
                    <div className='w-full flex flex-row gap-5 items-center justify-between'>
                      <select
                        disabled={sending}

                        className="
                          
                          w-56 p-2 border border-gray-300 rounded text-black text-2xl font-semibold "
                          
                        value={
                          recipient?.nickname
                        }


                        onChange={(e) => {

                          const selectedUser = users.find((user) => user.nickname === e.target.value) as any;

                          console.log("selectedUser", selectedUser);

                          setRecipient(selectedUser);

                        } } 

                      >
                        <option value="">{Select_a_user}</option>
                        

                        {users.map((user) => (
                          <option key={user.id} value={user.nickname}>{user.nickname}</option>
                        ))}
                      </select>

                      {/* select user profile image */}

                      <div className=" w-full flex flex-row gap-2 items-center justify-center">
                        <Image
                          src={recipient?.avatar || '/profile-default.png'}
                          alt="profile"
                          width={38}
                          height={38}
                          className="rounded-full"
                          style={{
                            objectFit: 'cover',
                            width: '38px',
                            height: '38px',
                          }}
                        />

                        {recipient?.walletAddress && (
                          <Image
                            src="/verified.png"
                            alt="check"
                            width={28}
                            height={28}
                          />
                        )}

                      </div>

                      


                    </div>
                

                      {/* input wallet address */}
                      
                      <input
                        disabled={true}
                        type="text"
                        placeholder={User_wallet_address}
                        className=" w-80  xl:w-full p-2 border border-gray-300 rounded text-white text-xs xl:text-lg font-semibold"
                        value={recipient?.walletAddress}
                        onChange={(e) => {
        
                          
                          
                            getUserByWalletAddress(e.target.value)

                            .then((data) => {

                              //console.log("data", data);

                              const checkUser = data;

                              if (checkUser) {
                                setRecipient(checkUser as any);
                              } else {
                                
                                setRecipient({
                                  ...recipient,
                                  walletAddress: e.target.value,
                                });
                                
                              }

                            });

                        } }
                      />

                  </>

                  ) : (

                    <div className='flex flex-col gap-5 items-center justify-between'>
                      <input
                        disabled={sending}
                        type="text"
                        placeholder={User_wallet_address}
                        className=" w-80 xl:w-96 p-2 border border-gray-300 rounded text-white bg-black text-sm xl:text-sm font-semibold"
                        value={recipient.walletAddress}
                        onChange={(e) => setRecipient({
                          ...recipient,
                          walletAddress: e.target.value,
                        })}
                      />

                      {isWhateListedUser ? (
                        <div className="flex flex-row gap-2 items-center justify-center">


                          <Image
                            src={recipient.avatar || '/profile-default.png'}
                            alt="profile"
                            width={30}
                            height={30}
                            className="rounded-full"
                            style={{
                              objectFit: 'cover',
                              width: '38px',
                              height: '38px',
                            }}
                          />
                          <div className="text-white">{recipient?.nickname}</div>
                          <Image
                            src="/verified.png"
                            alt="check"
                            width={30}
                            height={30}
                          />
                          
                        </div>
                      ) : (
                        <>

                        {recipient?.walletAddress && (
                          <div className='flex flex-row gap-2 items-center justify-center'>
                            {/* dot icon */}
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>

                            <div className="text-red-500">
                              {This_address_is_not_white_listed}<br />
                              {If_you_are_sure_please_click_the_send_button}
                            </div>
                          </div>

                        )}

                        </>
                      )}



                    </div>

                  )} 

                </div>

              </div>

              {/* otp verification */}

              {verifiedOtp ? (
                <div className="w-full flex-row gap-2 items-center justify-center hidden">
                  <Image
                    src="/verified.png"
                    alt="check"
                    width={30}
                    height={30}
                  />
                  <div className="text-white">OTP verified</div>
                </div>
              ) : (
             
        
                <div className="w-full flex flex-row gap-2 items-start">

                  <button
                    disabled={!address || !recipient?.walletAddress || !amount || isSendingOtp}
                    onClick={sendOtp}
                    className={`
                      
                      ${isSendedOtp && 'hidden'}

                      w-32 p-2 rounded-lg text-sm font-semibold

                        ${
                        !address || !recipient?.walletAddress || !amount || isSendingOtp
                        ?'bg-gray-300 text-gray-400'
                        : 'bg-green-500 text-white'
                        }
                      
                      `}
                  >
                      Send OTP
                  </button>

                  <div className={`flex flex-row gap-2 items-center justify-center ${!isSendedOtp && 'hidden'}`}>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className=" w-40 p-2 border border-gray-300 rounded text-black text-sm font-semibold"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />

                    <button
                      disabled={!otp || isVerifingOtp}
                      onClick={verifyOtp}
                      className={`w-32 p-2 rounded-lg text-sm font-semibold

                          ${
                          !otp || isVerifingOtp
                          ?'bg-gray-300 text-gray-400'
                          : 'bg-green-500 text-white'
                          }
                        
                        `}
                    >
                        Verify OTP
                    </button>
                  </div>

                </div>

              )}

              



              <button
                
                //disabled={!address || !recipient?.walletAddress || !amount || sending || !verifiedOtp}

                disabled={!address || !recipient?.walletAddress || !amount || sending || !verifiedOtp}

                
                //onClick={sendUsdt}
                onClick={sendToken}

                className={`mt-10 w-full p-2 rounded-lg text-xl font-semibold

                    ${
                    !address || !recipient?.walletAddress || !amount || sending || !verifiedOtp
                    ?'bg-gray-300 text-gray-400'
                    : 'bg-green-500 text-white'
                    }
                   
                   `}
              >
                  {token} {Send}
              </button>

              <div className="w-full flex flex-row gap-2 text-xl font-semibold">

                {/* sending rotate animation with white color*/}
                {sending && (
                  <div className="
                    w-6 h-6
                    border-2 border-zinc-800
                    rounded-full
                    animate-spin
                  ">
                    <Image
                      src="/loading.png"
                      alt="loading"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
                <div className="text-white">
                  {sending ? Sending : ''}
                </div>

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
