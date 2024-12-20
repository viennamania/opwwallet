'use client';

import { useState, useEffect, use } from "react";



import { toast } from 'react-hot-toast';

import { client } from "../../../client";

import {
    getContract,
    sendAndConfirmTransaction,
} from "thirdweb";



import {
    polygon,
    arbitrum,
} from "thirdweb/chains";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,
    useConnectedWallets,
    useSetActiveWallet,
} from "thirdweb/react";

import { inAppWallet } from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 






// open modal

import Modal from '@/components/modal';

import {
  useRouter,
  useSearchParams
}from "next//navigation";

import { it } from "node:test";


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
import { IncomingPhoneNumberContextImpl } from "twilio/lib/rest/api/v2010/account/incomingPhoneNumber";

import useSound from 'use-sound';
import { get } from "http";
import { add } from "thirdweb/extensions/farcaster/keyGateway";


interface SellOrder {
  _id: string;
  createdAt: string;
  nickname: string;
  trades: number;
  price: number;
  available: number;
  limit: string;
  paymentMethods: string[];

  opwAmount: number;
  fietAmount: number;
  fietCurrency: string;
  rate: number;
  payment: any;

  walletAddress: string;

  seller: any;

  status: string;

  acceptedAt: string;

  paymentRequestedAt: string;

  cancelledAt: string;

  paymentConfirmedAt: string;
  escrowTransactionHash: string;

  tradeId: string;

  buyer: any;

  privateSale: boolean;
}





const wallets = [
  inAppWallet({
    auth: {
      options: ["phone", "email"],
    },
  }),
];



const contractAddress = "0xcF3Ad9031729B5E131582138edE799F08F52299D"; // OPW on Polygon

const contractAddressArbitrum = "0xcF3Ad9031729B5E131582138edE799F08F52299D"; // OPW on Arbitrum




export default function Index({ params }: any) {

  //console.log('params', params);


  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');



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

    Order: "",
    Buy: "",
    Sell: "",
    Amount: "",
    Price: "",
    Total: "",
    Orders: "",
    Trades: "",
    Search_my_trades: "",

    Seller: "",
    Buyer: "",
    Me: "",

    Buy_OPW: "",
    Sell_OPW: "",  
    Rate: "",
    Payment: "",
    Bank_Transfer: "",

    I_agree_to_the_terms_of_trade: "",
    I_agree_to_cancel_the_trade: "",

    Opened_at: "",
    Cancelled_at: "",
    Completed_at: "",

    Waiting_for_seller_to_deposit: "",

    to_escrow: "",
    If_the_seller_does_not_deposit_the_OPW_to_escrow: "",
    this_trade_will_be_cancelled_in: "",

    Cancel_My_Trade: "",


    Order_accepted_successfully: "",
    Order_has_been_cancelled: "",
    My_Order: "",

    Sale: "",
    Private_Sale: "",

    Place_Order: "",

    Search_my_orders: "",

    Go_Sell_OPW: "",

    Cancel_My_Order: "",


    Order_has_been_placed: "",


    Placing_Order: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    SMS_will_be_sent_to_your_mobile_number: "",

    Profile : "",
    My_Profile_Picture : "",

    Edit : "",

    Escrow: "",

    TID: "",

    Chat_with_Buyer: "",

    Table_View: "",
    Started_at: "",
    Trading_Time_is: "",
    Memo: "",
    Sell_Amount: "",
    Status: "",
    Payment_Amount: "",

    hours: "",
    minutes: "",
    seconds: "",

    Opened: "",
    Completed: "",
    Cancelled: "",

    Deposit_Name: "",

    Request_Payment: "",

    Waiting_for_seller_to_confirm_payment: "",

    Confirm_Payment: "",

    Escrow_Completed: "",

    Payment_request_has_been_sent: "",

    Payment_has_been_confirmed: "",

    Reload: "",

    Insufficient_balance: "",

    My_Balance: "",

    Anonymous: "",

    Payment_Currency: "",

    Payment_Method: "",

    Order_has_been_failed: "",

    Please_register_your_seller_information: "",

    Sign_in_with_Wallet: "",

    Apply_for_Listing_New_Seller: "",

    Create_Escrow_Wallet: "",

    Please_create_your_escrow_wallet: "",

    Payment_has_been_rollbacked: "",

    Buyer_has_accepted_the_trade: "",

    Sell_preparation_complete: "",

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

    Order,
    Buy,
    Sell,
    Amount,
    Price,
    Total,
    Orders,
    Trades,
    Search_my_trades,
    Seller,
    Buyer,
    Me,

    Buy_OPW,
    Sell_OPW,
    Rate,
    Payment,
    Bank_Transfer,
    I_agree_to_the_terms_of_trade,
    I_agree_to_cancel_the_trade,

    Opened_at,
    Cancelled_at,
    Completed_at,

    Waiting_for_seller_to_deposit,

    to_escrow,

    If_the_seller_does_not_deposit_the_OPW_to_escrow,
    this_trade_will_be_cancelled_in,

    Cancel_My_Trade,

    Order_accepted_successfully,
    Order_has_been_cancelled,
    My_Order,

    Sale,
    Private_Sale,

    Place_Order,

    Search_my_orders,

    Go_Sell_OPW,

    Cancel_My_Order,

    Order_has_been_placed,

    Placing_Order,

    hours_ago,
    minutes_ago,
    seconds_ago,

    SMS_will_be_sent_to_your_mobile_number,

    Profile,
    My_Profile_Picture,

    Edit,

    Escrow,

    TID,

    Chat_with_Buyer,

    Table_View,
    Started_at,
    Trading_Time_is,
    Memo,
    Sell_Amount,
    Status,
    Payment_Amount,

    hours,
    minutes,
    seconds,

    Opened,
    Completed,
    Cancelled,

    Deposit_Name,

    Request_Payment,

    
    Waiting_for_seller_to_confirm_payment,

    Confirm_Payment,

    Escrow_Completed,

    Payment_request_has_been_sent,

    Payment_has_been_confirmed,

    Reload,

    Insufficient_balance,

    My_Balance,

    Anonymous,

    Payment_Currency,

    Payment_Method,

    Order_has_been_failed,

    Please_register_your_seller_information,

    Sign_in_with_Wallet,

    Apply_for_Listing_New_Seller,

    Create_Escrow_Wallet,

    Please_create_your_escrow_wallet,

    Payment_has_been_rollbacked,

    Buyer_has_accepted_the_trade,

    Sell_preparation_complete,


  } = data;





    const router = useRouter();


    const activeAccount = useActiveAccount();

    const address = activeAccount?.address;
  
  
  


    const [rate, setRate] = useState(0);



    const [opwPrice, setOpwPrice] = useState(0);
    useEffect(() => {

        if (!address) {
            return;
        }

        const fetchData = async () => {

            const response = await fetch("/api/orderOpw/getPrice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: "0x91CA2566C3345026647aBbACB56093144eAA4c16",
                }),
            });

            const data = await response.json();

            ///console.log("getPrice data", data);

            if (data.result) {
                setOpwPrice(data.result.opwPrice);

                setRate(data.result.opwPrice);
            }

        };

        fetchData();
    }

    , [address]);






    const [phoneNumber, setPhoneNumber] = useState("");
    useEffect(() => {

      if (address) {
  
        //const phoneNumber = await getUserPhoneNumber({ client });
        //setPhoneNumber(phoneNumber);
  
  
        getUserPhoneNumber({ client }).then((phoneNumber) => {
          setPhoneNumber(phoneNumber || "");
        });
  
      }
  
    } , [address]);
    

 



    const [isPlaying, setIsPlaying] = useState(false);
    //const [play, { stop }] = useSound(galaxySfx);
    const [play, { stop }] = useSound('/ding.mp3');
  
    function playSong() {
      setIsPlaying(true);
      play();
    }
  
    function stopSong() {
      setIsPlaying(false);
      stop();
    }
  
  
  




    const [nativeBalance, setNativeBalance] = useState(0);
    const [balance, setBalance] = useState(0);
    useEffect(() => {
  
      // get the balance
      const getBalance = async () => {
  
        ///console.log('getBalance address', address);
  
        
        const result = await balanceOf({
          contract,
          address: address || "",
        });
  
    
        //console.log(result);
    
        setBalance( Number(result) / 10 ** 18 );
  
  
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
  
  
  
    const [escrowWalletAddress, setEscrowWalletAddress] = useState('');
    const [makeingEscrowWallet, setMakeingEscrowWallet] = useState(false);
  
    const makeEscrowWallet = async () => {
        
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
  
  
      setMakeingEscrowWallet(true);
  
      fetch('/api/orderOpw/getEscrowWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
           isSmartAccount: true,
        }),
      })
      .then(response => response.json())
      .then(data => {
          
          //console.log('getEscrowWalletAddress data.result', data.result);
  
  
          if (data.result) {
            setEscrowWalletAddress(data.result.escrowWalletAddress);
          } else {
            toast.error('Escrow wallet address has been failed');
          }
      })
      .finally(() => {
        setMakeingEscrowWallet(false);
      });
  
    }
  
   
    
    const [escrowBalance, setEscrowBalance] = useState(0);
    const [escrowNativeBalance, setEscrowNativeBalance] = useState(0);
    useEffect(() => {
  
      const getEscrowBalance = async () => {
  
        if (!address) {
          setEscrowBalance(0);
          return;
        }
  
        if (!escrowWalletAddress || escrowWalletAddress === '') return;
  
  
        const result = await balanceOf({
          contract,
          address: escrowWalletAddress,
        });
  
    
        setEscrowBalance( Number(result) / 10 ** 18 );
  
  
  
  
        await fetch('/api/user/getBalanceByWalletAddress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chain: params.chain,
            walletAddress: escrowWalletAddress,
          }),
        })
        .then(response => response.json())
        .then(data => {
            setEscrowNativeBalance(data.result?.displayValue);
        });
  
      };
  
      getEscrowBalance();
  
      const interval = setInterval(() => {
        getEscrowBalance();
      } , 1000);
  
      return () => clearInterval(interval);
  
    } , [address, escrowWalletAddress, contract, params.chain]);
    
  


    
  
    // fiet currency

    const [fietCurrency, setFietCurrency] = useState('USDT');

    useEffect(() => {

      if (fietCurrency === 'USDT') {
        setRate(1);
      } else if (fietCurrency === 'USD') {
        setRate(1);
      } else if (fietCurrency === 'KRW') {
        setRate(1400);
      } else if (fietCurrency === 'JPY') {
        setRate(155);
      } else if (fietCurrency === 'CNY') {
        setRate(7);
      }

    } , [fietCurrency]);




    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("/profile-default.png");
    const [userCode, setUserCode] = useState("");
  
  
    const [user, setUser] = useState<any>(null);


    const [seller, setSeller] = useState(null) as any;


    const [isSeller, setIsSeller] = useState(false);



  
    // get all payment method from user
    const [paymentMethods, setPaymentMethods] = useState([] as any[]);
    // [{"method":"Bank","seller": object},
    // ,{"method":"AliPay","seller": object},
    // ,{"method":"WechatPay","seller": object},
    // ,{"method":"UnionPay","seller": object},
    // ,{"method":"JdPay","seller": object},
    // ,{"method":"NaverPay","seller": object},
    // ,{"method":"KakaoPay","seller": object}]

  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/user/getUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (response.status !== 200) {
                return;
            }
  
            const data = await response.json();
  
            ///console.log("data", data);


  
            if (data.result) {
                setNickname(data.result.nickname);
                data.result.avatar && setAvatar(data.result.avatar);
                setUserCode(data.result.id);

                setUser(data.result);
  
                
                
                setSeller(data.result?.seller);

                
                if (data?.result?.seller
                  || data?.result?.sellerAliPay
                  || data?.result?.sellerWechatPay
                  || data?.result?.sellerUnionPay
                  || data?.result?.sellerJdPay
                  || data?.result?.sellerNaverPay
                  || data?.result?.sellerKakaoPay
                ) {
                  setIsSeller(true);
                }

                // if fietCurrency is USDT, isSeller is true
                if (fietCurrency === 'USDT') {
                  setIsSeller(true);
                }





                setEscrowWalletAddress(data.result?.escrowWalletAddress);



                /*
                setPaymentMethods(
                  [
                    data.result?.seller && {"method":"Bank","seller": data.result?.seller},
                    data.result?.sellerAliPay && {"method":"AliPay","seller": data.result?.sellerAliPay},
                    data.result?.sellerWechatPay && {"method":"WechatPay","seller": data.result?.sellerWechatPay},
                    data.result?.sellerUnionPay && {"method":"UnionPay","seller": data.result?.sellerUnionPay},
                    data.result?.sellerJdPay && {"method":"JdPay","seller": data.result?.sellerJdPay},
                    data.result?.sellerNaverPay && {"method":"NaverPay","seller": data.result?.sellerNaverPay},
                    data.result?.sellerKakaoPay && {"method":"KakaoPay","seller": data.result?.sellerKakaoPay},

                  ]
                );
                */

                // clear paymentMethods
                setPaymentMethods([]);


                ////setPaymentMethods( (prev) => [...prev, {"method":"Wallet","seller": data.result?.seller}] );

                data?.result?.seller && setPaymentMethods( (prev) => [...prev, {"method":"Bank","seller": data.result?.seller}] );
                data?.result?.sellerAliPay && setPaymentMethods( (prev) => [...prev, {"method":"AliPay","seller": data.result?.sellerAliPay}] );
                data?.result?.sellerWechatPay && setPaymentMethods( (prev) => [...prev, {"method":"WechatPay","seller": data.result?.sellerWechatPay}] );
                data?.result?.sellerUnionPay && setPaymentMethods( (prev) => [...prev, {"method":"UnionPay","seller": data.result?.sellerUnionPay}] );
                data?.result?.sellerJdPay && setPaymentMethods( (prev) => [...prev, {"method":"JdPay","seller": data.result?.sellerJdPay}] );
                data?.result?.sellerNaverPay && setPaymentMethods( (prev) => [...prev, {"method":"NaverPay","seller": data.result?.sellerNaverPay}] );
                data?.result?.sellerKakaoPay && setPaymentMethods( (prev) => [...prev, {"method":"KakaoPay","seller": data.result?.sellerKakaoPay}] );

  
            }
        };
  
        address && fetchData();
  
    }, [address, fietCurrency]);




    ///console.log("paymentMethods", paymentMethods);






    
    const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);

    const [searchMyOrders, setSearchMyOrders] = useState(false);


    const [loadingFetchSellOrders, setLoadingFetchSellOrders] = useState(false);

    const fetchSellOrders = async () => {

      /*
      if (!address) {
        return;
      }
      */

      setLoadingFetchSellOrders(true);

      // api call
      const response = await fetch('/api/orderOpw/getAllSellOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          searchMyOrders: searchMyOrders
        })
      });

      const data = await response.json();

      
      //console.log('getAllSellOrders data', data);



      if (data.result) {
        setSellOrders(data.result.orders);
      }

      setLoadingFetchSellOrders(false);

    };







    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    const goChat = () => {
        console.log('Go Chat');
        router.push(`/chat?tradeId=12345`);
    }


    const [opwAmount, setOpwAmount] = useState(0);

    const [defaultKrWAmount, setDefaultKrwAmount] = useState(0);

    const [fietAmount, setFietAmount] = useState(0);

    //console.log('opwAmount', opwAmount);


 

    useEffect(() => {

      if (opwAmount === 0) {

        setDefaultKrwAmount(0);

        setFietAmount(0);

        return;
      }
    
        
      setDefaultKrwAmount( Math.round(opwAmount * rate) );


      setFietAmount( Math.round(opwAmount * rate) );

    } , [opwAmount, rate]);



    const [privateSale, setprivateSale] = useState(false);


    const [sellOrdering, setSellOrdering] = useState(false);

    const [agreementPlaceOrder, setAgreementPlaceOrder] = useState(false);




    // check input krw amount at sell order
    const [checkInputKrwAmount, setCheckInputKrwAmount] = useState(false);






    // payment method
    // Bank, AliPay, WechatPay, UnionPay, JdPay, NaverPay, KakaoPay

    const [paymentMethod, setPaymentMethod] = useState('');




    const sellOrder = async () => {
      // api call
      // set sell order

      if (sellOrdering) {
        return;
      }

      if (agreementPlaceOrder === false) {
        toast.error('You must agree to the terms and conditions');
        return;
      }


      setSellOrdering(true);


      let orderOpwAmount = opwAmount;

      if (checkInputKrwAmount) {
        orderOpwAmount = parseFloat(Number(fietAmount / rate).toFixed(2));
      }
      

      const response = await fetch('/api/orderOpw/setSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          opwAmount: orderOpwAmount,
          fietAmount: fietAmount,
          fietCurrency: fietCurrency,

          payment:
            {
              method: paymentMethod,

              seller:
              paymentMethod === 'Wallet' ? 'Wallet'
              : paymentMethod === 'Bank' ? user?.seller
              : paymentMethod === 'AliPay' ? user?.sellerAliPay
              : paymentMethod === 'WechatPay' ? user?.sellerWechatPay
              : paymentMethod === 'UnionPay' ? user?.sellerUnionPay
              : paymentMethod === 'JdPay' ? user?.sellerJdPay
              : paymentMethod === 'NaverPay' ? user?.sellerNaverPay
              : paymentMethod === 'KakaoPay' ? user?.sellerKakaoPay
              : user?.seller

            }
            ,

          rate: rate,
          privateSale: privateSale,
        })
      });

      if (response.status !== 200) {
        toast.error(Order_has_been_failed);
        setSellOrdering(false);
        return;
      }

      const data = await response.json();

      //console.log('data', data);

      if (data.result) {
        toast.success(
          Order_has_been_placed
        );

        setOpwAmount(0);
        setprivateSale(false);

        setAgreementPlaceOrder(false);
     


        await fetch('/api/orderOpw/getAllSellOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            chain: params.chain,
            walletAddress: address,
            searchMyOrders: searchMyOrders
          })
        }).then(async (response) => {
          const data = await response.json();
          //console.log('data', data);
          if (data.result) {
            setSellOrders(data.result.orders);
          }
        });


  


      } else {
        toast.error(Order_has_been_failed);
      }

      setSellOrdering(false);


    };


    // cancel sell order state
    const [cancellings, setCancellings] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      cancellings.push(false);
    }

    const cancelSellOrder = async (orderId: string, index: number) => {

      if (cancellings[index]) {
        return;
      }

      setCancellings(cancellings.map((item, i) => i === index ? true : item));

      const response = await fetch('/api/orderOpw/cancelSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          walletAddress: address
        })
      });

      const data = await response.json();

      ///console.log('data', data);

      if (data.result) {

        toast.success(Order_has_been_cancelled);

        playSong();


        fetchSellOrders();


      } else {
        toast.error(Order_has_been_failed);
      }

      setCancellings(cancellings.map((item, i) => i === index ? false : item));

    }







    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      requestPaymentCheck.push(false);
    }

    // array of escrowing
    const [escrowing, setEscrowing] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      escrowing.push(false);
    }


    // array of requestingPayment
    const [requestingPayment, setRequestingPayment] = useState([] as boolean[]);
    for (let i = 0; i < 100; i++) {
      requestingPayment.push(false);
    }

    const requestPayment = async (
      index: number,
      orderId: string,
      tradeId: string,
      amount: number,
    ) => {
      // check balance
      // send payment request

      if (balance < amount) {
        toast.error(Insufficient_balance);
        return;
      }


      // check all escrowing is false
      if (escrowing.some((item) => item === true)) {
        toast.error('Escrowing');
        return;
      }

      // check all requestingPayment is false
      if (requestingPayment.some((item) => item === true)) {
        toast.error('Requesting Payment');
        return;
      }



      setEscrowing(
        escrowing.map((item, idx) => idx === index ? true : item)
      );


      // send OPW
      // Call the extension function to prepare the transaction
      const transaction = transfer({
        contract,
        to: escrowWalletAddress,
        amount: amount,
      });
      


      try {


        const transactionResult = await sendAndConfirmTransaction({
            transaction: transaction,
            
            account: activeAccount as any,
        });

        //console.log("transactionResult===", transactionResult);


        setEscrowing(
          escrowing.map((item, idx) => idx === index ? false : item)
        );



        // send payment request

        if (transactionResult) {

          
          setRequestingPayment(
            requestingPayment.map((item, idx) => idx === index ? true : item)
          );
        
          const response = await fetch('/api/orderOpw/requestPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              orderId: orderId,
              transactionHash: transactionResult.transactionHash,
            })
          });

          const data = await response.json();

          ///console.log('/api/orderOpw/requestPayment data====', data);


          /*
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return false;
              }
              return item;
            })
          );
          */
          


          if (data.result) {

            fetchSellOrders();

            // refresh balance

            const result = await balanceOf({
              contract,
              address: address || "",
            });

            //console.log(result);

            setBalance( Number(result) / 10 ** 18 );


            toast.success(Payment_request_has_been_sent);

            ////playSong();


          } else {
            toast.error('Payment request has been failed');
          }

        }


      } catch (error) {
        console.error('Error:', error);

        toast.error('Payment request has been failed');

      }

      setRequestPaymentCheck(
        requestPaymentCheck.map((item, idx) => idx === index ? false : item)
      );

      setEscrowing(
        escrowing.map((item, idx) => idx === index ? false : item)
      );

      setRequestingPayment(
        requestingPayment.map((item, idx) => idx === index ? false : item)
      );


    }






  // array of confirmingPayment

  const [confirmingPayment, setConfirmingPayment] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    confirmingPayment.push(false);
  }


  // confirm payment check box
  const [confirmPaymentCheck, setConfirmPaymentCheck] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    confirmPaymentCheck.push(false);
  }




  // payment amoount array
  const [paymentAmounts, setPaymentAmounts] = useState([] as number[]);
  useEffect(() => {

    // default payment amount is from sellOrders fietAmount
      
    setPaymentAmounts(
      sellOrders.map((item) => item.fietAmount)
      );

  } , [sellOrders]);



  const confirmPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,

  ) => {
    // confirm payment
    // send opw to buyer wallet address

    if (confirmingPayment[index]) {
      return;
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) => idx === index ? true : item)
    );



    const response = await fetch('/api/orderOpw/confirmPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        orderId: orderId,
        paymentAmount: paymentAmount,
         isSmartAccount: true,
      })
    });

    const data = await response.json();

    //console.log('data', data);

    if (data.result) {
      
      fetchSellOrders();

      toast.success(Payment_has_been_confirmed);

      playSong();

    } else {
      toast.error('Payment has been failed');
    }


    setConfirmPaymentCheck(
      confirmPaymentCheck.map((item, idx) => idx === index ? false : item)
    );

    setConfirmingPayment(
      confirmingPayment.map((item, idx) => idx === index ? false : item)
    );



  }





  
  // array of rollbackingPayment
  const [rollbackingPayment, setRollbackingPayment] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    rollbackingPayment.push(false);
  }

  // rollback payment check box
  const [rollbackPaymentCheck, setRollbackPaymentCheck] = useState([] as boolean[]);
  for (let i = 0; i < 100; i++) {
    rollbackPaymentCheck.push(false);
  }




  // rollback payment
  const rollbackPayment = async (

    index: number,
    orderId: string,
    paymentAmount: number,

  ) => {
    // rollback payment
    // send opw to seller wallet address

    if (rollbackingPayment[index]) {
      return;
    }

    setRollbackingPayment(
      rollbackingPayment.map((item, idx) => idx === index ? true : item)
    );


    const response = await fetch('/api/orderOpw/sellOrderRollbackPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        orderId: orderId,
        paymentAmount: paymentAmount,
         isSmartAccount: true,
      })
    });

    const data = await response.json();

    //console.log('data', data);

    if (data.result) {
      
      fetchSellOrders();

      toast.success(Payment_has_been_rollbacked);

      playSong();

    }


    setRollbackPaymentCheck(
      rollbackPaymentCheck.map((item, idx) => idx === index ? false : item)
    );

    setRollbackingPayment(
      rollbackingPayment.map((item, idx) => idx === index ? false : item)
    );



  }



  const [acceptedSellOrderCount, setAcceptedSellOrderCount] = useState(0);

  useEffect(() => {

    const fetchSellOrders = async () => {

      if (
        //!address
        false

        || sellOrdering
        || cancellings.some((item) => item === true)
        || escrowing.some((item) => item === true)
        || requestPaymentCheck.some((item) => item === true)
        || requestingPayment.some((item) => item === true)
        || confirmPaymentCheck.some((item) => item === true)
        || confirmingPayment.some((item) => item === true)
        || rollbackPaymentCheck.some((item) => item === true)
        || rollbackingPayment.some((item) => item === true)
      ) {
        return;
      }

      setLoadingFetchSellOrders(true);

      // api call
      const response = await fetch('/api/orderOpw/getAllSellOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: params.lang,
          chain: params.chain,
          walletAddress: address,
          searchMyOrders: searchMyOrders
        })
      });

      const data = await response.json();

      
      //console.log('getAllSellOrders data', data);



      if (data.result) {

        // if accepted status count is different from sellOrders

        const acceptedCount = data.result.orders.filter((item: any) => item.status === 'accepted').length;

        if (acceptedCount !== acceptedSellOrderCount) {
          playSong();
          setAcceptedSellOrderCount(acceptedCount);
        }

        
        
        setSellOrders(data.result.orders);

      }

      setLoadingFetchSellOrders(false);

    };
      


    fetchSellOrders();

    // fetch sell orders every 10 seconds
    
    const interval = setInterval(() => {
      fetchSellOrders();
    }, 3000);

    return () => clearInterval(interval);
    

  }, [address, searchMyOrders, params.lang, params.chain
    , sellOrdering
    , cancellings
    , escrowing
    , requestPaymentCheck
    , requestingPayment
    , confirmPaymentCheck
    , confirmingPayment
    , rollbackPaymentCheck
    , rollbackingPayment

    , acceptedSellOrderCount

    //, playSong

  ]);










    // check table view or card view
    const [tableView, setTableView] = useState(false);


    const [storeCodeNumber, setStoreCodeNumber] = useState('');

    useEffect(() => {
  
      const fetchStoreCode = async () => {
  
        const response = await fetch('/api/orderOpw/getStoreCodeNumber', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
  
        //console.log('getStoreCodeNumber data', data);
  
        setStoreCodeNumber(data?.storeCodeNumber);
  
      }
  
      fetchStoreCode();
  
    } , []);



    //console.log('sellOrders', sellOrders);
    
    
    
    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

        <div className="py-0 w-full">
  
          {/* goto home button using go back icon
          history back
          */}

          <AppBarComponent />

          <Header
            lang={params.lang}
            chain={params.chain}
          />

          {/* store code number */}
          {/*
          <div className="w-full flex flex-row gap-2 items-center justify-start text-zinc-300 text-lg font-se"
          >
            SC: {storeCodeNumber}
          </div>
          */}

          {/*
          <div className="mt-0 flex justify-start space-x-4 mb-10">
              <button
                onClick={() => router.push(
                  '/' + params.lang + '/' + params.chain + '?wallet=' + wallet
                )}
              
              >
                <Image
                  src="/icon-home.webp"
                  alt="Home"
                  width={50}
                  height={50}
                />
              </button>
          </div>
          */}


          <div className="flex flex-col items-start justify-center space-y-4">

              <div className='flex flex-row items-center space-x-4'>
                  <Image
                    src="/logo-opw.png"
                    alt="OPW"
                    width={35}
                    height={35}
                    className="rounded-lg"
                  />
                  <Image
                    src={
                      `/logo-${params.chain}.png`
                    }
                    alt="Chain"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <div className="text-2xl font-semibold">
                    {Sell_OPW}
                  </div>

              </div>


                <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-3">

                  <div className="flex flex-row items-start gap-3">
                    


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


                  </div>



                </div>



                  <div className=" w-full grid gap-4  justify-center">

                    {/* sell order card view */}
                    {/* input price and auto change opw amount */}
                    <article
                      className={` ${checkInputKrwAmount ? 'block' : 'hidden'} bg-black p-4 rounded-md border-2 border-green-500`}
                    >
                        
                        <div className="flex flex-col xl:flex-row gap-5 xl:gap-5 items-center ">
                            
                            <div className="flex flex-col gap-2 items-start">
                              
                              <div className=" flex flex-row items-center justify-between gap-4">
                      
                                {/* sell icon */}
                                <div className=" flex flex-row items-center gap-2">
                                  <Image
                                    src="/trade-sell.png"
                                    alt="Sell"
                                    width={40}
                                    height={40}
                                  />
                                  <h2 className="text-lg font-semibold text-white">
                                    {Order}
                                  </h2>
                                </div>
  
                                {/* check box for private sale */}
                                <div className="flex flex-row items-center gap-2">
  
                                  <Image
                                    src="/icon-private-sale.png"
                                    alt="Private Sale"
                                    width={32}
                                    height={32}
                                  />
  
                                  <div className="text-sm text-zinc-400">
                                    {Private_Sale}
                                  </div>
                                  <input
                                    className="w-6 h-6"
                                    type="checkbox"
                                    checked={privateSale}
                                    onChange={(e) => setprivateSale(e.target.checked)}
                                  />
                                </div>
  
                              </div>

                              <p className="mt-4 text-xl font-bold text-zinc-400">1 OPW = {
                                // currency format
                                Number(rate).toLocaleString('ko-KR', {
                                  style: 'currency',
                                  currency: 'KRW'
                                })
                              }</p>

                              <div className=" flex flex-row items-center gap-2">
                                
                                <div className="flex flex-row gap-1 items-center text-xl text-blue-500 font-bold ">

                                  <input 
                                    type="number"
                                    className=" w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                                    placeholder={Price}
                                    value={fietAmount}
                                    onChange={(e) => {
                                      // check number
                                      e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                      
                                      // if prefix 0, then remove 0
                                      if (e.target.value.startsWith('0')) {
                                        e.target.value = e.target.value.substring(1);
                                      }


                                      /*
                                      if (e.target.value === '') {
                                        setFietAmount(0);
                                        return;
                                      }
                                      */

  
                                      parseFloat(e.target.value) < 0 ? setFietAmount(0) : setFietAmount(parseFloat(e.target.value));
  
                                      parseFloat(e.target.value) > 100000000 ? setFietAmount(1000) : setFietAmount(parseFloat(e.target.value));
  
                                      //setOpwAmount(Number((fietAmount / rate).toFixed(2)));
                                    
                                    
                                    } }
                                  />

                                  <div className=" text-sm">KRW</div>

                                </div>
  
                                <p className=" text-xl text-zinc-400 font-bold">
                                  = {
                                  fietAmount === 0 ? '0' :
                                  
                                  (fietAmount / rate).toFixed(2) === 'NaN' ? '0' : (fietAmount / rate).toFixed(2)

                                  }{' '}OPW
                                </p>

                              </div>

                            </div>


                          <div className="mt-4 flex flex-col gap-2 items-start">
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                              <span className="text-sm text-zinc-400">
                                SMS: {phoneNumber}
                              </span>
                            </div>
                           
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-2 w-2 bg-zinc-400 rounded-full inline-block mr-2"></div>
                              <span className="text-sm text-zinc-400">
                                 {SMS_will_be_sent_to_your_mobile_number}
                              </span>
                            </div>

                          </div>


                          <div className="mt-4 flex flex-col gap-2">
                            <div className="flex flex-row items-center gap-2">
                              <input
                                disabled={!address || fietAmount === 0 || sellOrdering}
                                type="checkbox"
                                checked={agreementPlaceOrder}
                                onChange={(e) => setAgreementPlaceOrder(e.target.checked)}
                              />
                              <p className="text-sm text-zinc-400">
                                {I_agree_to_the_terms_of_trade}
                              </p>

                            </div>

                            <div className="flex flex-col gap-2">
                    
                              {sellOrdering ? (

                                <div className="flex flex-row items-center gap-2">
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
                                    <div className="text-white">
                                      {Placing_Order}...
                                    </div>
                      
                                </div>
                              ) : (
                                  <button
                                      disabled={fietAmount === 0 || agreementPlaceOrder === false}
                                      className={`text-lg text-white px-4 py-2 rounded-md ${fietAmount === 0 || agreementPlaceOrder === false ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {
                                          console.log('Sell OPW');
                                          // open trade detail
                                          // open modal of trade detail
                                          ///openModal();
    
                                          sellOrder();
                                      }}
                                  >
                                    {Place_Order}
                                  </button>
                              )}

                            </div>

                          </div>

                        </div>

                    </article>


                  </div>

         
                  <div className="mt-10 w-full flex flex-col xl:flex-row items-center justify-between gap-4">
                    
                      <div className="flex flex-row items-center gap-2">

                        {/* select table view or card view */}                     
                        <div className="flex flex-row items-center space-x-4">
                            <div className="text-sm">{Table_View}</div>
                            <input
                              type="checkbox"
                              checked={tableView}
                              onChange={(e) => setTableView(e.target.checked)}
                              className="w-5 h-5 rounded-full"
                            />
                        </div>
                      </div>

                      
                      <div className="p-2 flex flex-row items-start justify-between gap-2">

                        {/*
                        <div className="flex flex-col gap-2 items-center">
                          <div className="text-sm">{Total}</div>
                          <div className="text-xl font-semibold text-zinc-800">
                            {sellOrders.length}
                          </div>
                        </div>
                        */}

                        <div className="flex flex-col gap-2 items-center">
                          <div className="text-sm">{Orders}</div>
                          <div className="text-xl font-semibold text-gray-800">
                            {sellOrders.filter((item) => item.status === 'ordered').length}
                          </div>
                        </div>

                        {/* completed trades */}
                        <div className="flex flex-col gap-2 items-center">
                          <div className="text-sm">{Completed}</div>
                          <div className="text-xl font-semibold text-gray-800">
                            {sellOrders.filter((item) => item.status === 'paymentConfirmed').length}
                          </div>
                        </div>

                        {/* cancelled trades */}
                        <div className="flex flex-col gap-2 items-center">
                          <div className="text-sm">{Cancelled}</div>
                          <div className="text-xl font-semibold text-gray-800">
                            {sellOrders.filter((item) => item.status === 'cancelled').length}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                          <div className="text-sm">{Trades}</div>
                          <div className="text-4xl font-semibold text-gray-800">
                            {
                              //sellOrders.filter((item) => item.status === 'accepted').length
                              sellOrders.filter((item) => item.status === 'accepted' || item.status === 'paymentRequested').length
                            }
                          </div>
                        </div>

                      </div>
     
                  </div>

                {/*
                <div className="w-full flex flex-row items-center justify-between gap-4">

                  <div className="mt-4 flex flex-row items-center gap-2">
                    <button
                      disabled={loadingFetchSellOrders || requestingPayment.some((item) => item === true) || escrowing.some((item) => item === true) || confirmingPayment.some((item) => item === true)}
                      className={`flex flex-row gap-1 text-sm text-zinc-800 px-2 py-1 rounded-md ${loadingFetchSellOrders ? 'bg-gray-500' : 'bg-green-500'}`}
                      onClick={fetchSellOrders}
                    >
                      <Image
                        src="/loading.png"
                        alt="loading"
                        width={16}
                        height={16}
                        className={loadingFetchSellOrders ? 'animate-spin' : 'hidden'}
                      />
                      <span>{Reload}</span>
                    </button>
                  </div>

                </div>
                */}


                {tableView ? (


           
                <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                  <thead>
                      <tr
                          className="bg-gray-800 text-white text-xs h-10 "
                      >

                          <th className="text-left pl-2">{Opened_at}</th>
                          <th className="text-left">{TID}</th>
                          <th className="text-left">{Started_at}</th>
                          {/*
                          <th className="text-left">{Trading_Time_is}</th>
                          */}

                          <th className="text-left">
                            {Deposit_Name} / {Buyer}
                          </th>

                          <th className="text-left">{Sell_Amount} / {Price} / {Rate}</th>


                          <th className="text-left">{Payment}</th>
                          <th className="text-left">{Payment_Amount}</th>
                          
                          <th className="text-left">{Status}</th>

                          
                      </tr>
                  </thead>
                  <tbody>
                      {sellOrders.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-800 hover:bg-opacity-10 text-xs h-10 ">
                              
                              <td className="pl-2">
                                {
                                  new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                  ) :
                                  new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                  ) : (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                  )}
                              </td>
                              
                              <td className="text-blue-500 text-lg font-semibold">
                                {item.tradeId}
                              </td>
                              
                              
                              <td className="text-left text-lg font-semibold">

                                {item.acceptedAt && (
                                  new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                  ) : new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                  ) : (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                  )
                                )}
                                
                              </td>

                              {/*
                              <td>
                                {item.status === 'paymentConfirmed' &&
                                
                                ( ( (new Date(item.paymentConfirmedAt).getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 ).toFixed(0) ) + ' ' + minutes
                                
                                }
                              </td>
                              */}

                              <td className=" flex flex-col items-start justify-center gap-1 mt-2 ">

                                <div className="flex flex-row gap-1">
                                  <span className="text-lg text-yellow-500 font-semibold">
                                    {item.buyer?.depositBankName && item.buyer?.depositBankName}
                                  </span>
                                  <span className="text-lg text-yellow-500 font-semibold">
                                    {item.buyer?.depositName ? item.buyer?.depositName : item.tradeId}
                                  </span>
                                </div>

                                 <span>{item.buyer?.nickname}</span>
                              </td>


                              <td className="p-2">
                                <div className="flex flex-col gap-1">
                                  <span className="text-lg">{item.opwAmount}{' '}OPW</span>

                                  <span className="text-lg text-yellow-500 font-semibold">
                                    
                                    {
                                      item.fietCurrency === 'USDT' ? (
                                        Number(item.fietAmount).toLocaleString('en-US', {
                                          style: 'currency',
                                          currency: 'USD'
                                        })
                                      ) : item.fietCurrency === 'USD' ? (
                                      Number(item.fietAmount).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                      })
                                    ) : item.fietCurrency === 'JPY' ? (
                                      Number(item.fietAmount).toLocaleString('ja-JP', {
                                        style: 'currency',
                                        currency: 'JPY'
                                      })
                                    ) : item.fietCurrency === 'CNY' ? (
                                      Number(item.fietAmount).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'CNY'
                                      })
                                    ) : (
                                      Number(item.fietAmount).toLocaleString('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                      })
                                    )}


                                  </span>

                                  <span className="text-xs">
                                    {Number(item.rate).toFixed(2)}
                                  </span>
                                </div>
                              </td>

                           
                              <td>

                                {
                                item?.payment?.method === 'Wallet' ? (
                                  <span className="text-xs text-yellow-500 font-semibold">
                                    {item?.walletAddress.substring(0, 10)}...
                                  </span>
                                ) : item?.payment?.method === 'Bank' ? (
                                  <div className="flex flex-col gap-1">
                                    <span>{item?.payment?.seller?.bankInfo.bankName}</span>
                                    <span>{item?.payment?.seller?.bankInfo.accountNumber}</span>
                                    <span>{item?.payment?.seller?.bankInfo.accountHolder}</span>
                                  </div>
                                ) : item?.payment?.method === 'AliPay'
                                || item?.payment?.method === 'WechatPay'
                                || item?.payment?.method === 'UnionPay'
                                || item?.payment?.method === 'JdPay'
                                || item?.payment?.method === 'NaverPay'
                                || item?.payment?.method === 'KakaoPay' ? (

                                  <div className="flex flex-col gap-1">
                                    <span>{item?.payment?.method}</span>
                                    <Image
                                      src={item.seller?.qrcodeImage ? item.seller?.qrcodeImage : '/icon-qrcode.png'}
                                      alt="qrcode"
                                      width={32}
                                      height={32}
                                      className="rounded-md"
                                    />
                                  </div>

                                ) : (
                                  <div className="flex flex-col gap-1">
                                    <span>
                                      X
                                    </span>
                                  </div>
                                )}


                              </td>


                              <td className="text-lg text-yellow-500 font-semibold">
                                {item.status === 'paymentConfirmed' && (

                                  item.fietCurrency === 'USD' ? (
                                    Number(item.fietAmount).toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD'
                                    })
                                  ) : item.fietCurrency === 'JPY' ? (
                                    Number(item.fietAmount).toLocaleString('ja-JP', {
                                      style: 'currency',
                                      currency: 'JPY'
                                    })
                                  ) : item.fietCurrency === 'CNY' ? (
                                    Number(item.fietAmount).toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'CNY'
                                    })
                                  ) : (
                                    Number(item.fietAmount).toLocaleString('ko-KR', {
                                      style: 'currency',
                                      currency: 'KRW',
                                    })
                                  )


                                )}

                                {item.status === 'paymentRequested' && (

                                  <div className="flex flex-col gap-1">
                                    <input
                                      disabled={true}
                                      type="number"
                                      className="w-24 px-2 py-1 border border-gray-300 rounded-md text-lg text-black"
                                      placeholder="Amount"
                                      value={paymentAmounts[index]}
                                      onChange={(e) => {
                                        // check number
                                        e.target.value = e.target.value.replace(/[^0-9.]/g, '');


                                        parseFloat(e.target.value) < 0 ? setPaymentAmounts(
                                          paymentAmounts.map((item, idx) => {
                                            if (idx === index) {
                                              return 0;
                                            }
                                            return item;
                                          })
                                        ) : setPaymentAmounts(
                                          paymentAmounts.map((item, idx) => {
                                            if (idx === index) {
                                              return parseFloat(e.target.value);
                                            }
                                            return item;
                                          })
                                        );

                                      }
                                    }
                                    />
                                      
                                  </div>

                                )}
                              </td>
                              
                              <td>

                                {
                                address && address === item.walletAddress
                                && item.status === 'ordered' && (
                            
                                  <button
                                    disabled={cancellings[index]}
                                    className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${cancellings[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                    onClick={() => cancelSellOrder(item._id, index)}
                                  >
                                    <Image
                                      src="/loading.png"
                                      alt="loading"
                                      width={16}
                                      height={16}
                                      className={cancellings[index] ? 'animate-spin' : 'hidden'}
                                    />
                                    <span>{Cancel_My_Order}</span>
                                   
                                  </button>
                                )}


                                {item.status === 'paymentConfirmed' && (
                                  <div className="flex flex-col gap-1">
                                    <span className="text-lg font-semibold text-green-500">
                                      {Completed}
                                    </span>
                                    <span>{
                                      //item.paymentConfirmedAt && new Date(item.paymentConfirmedAt).toLocaleString()
                                      // form now
                                      new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) : new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )
                                    }</span>
                                  </div>
                                )}

                                {item.status === 'accepted' && (
                                  <div className="flex flex-row gap-1">

                                    {/* check box for agreement */}
                                    <input
                                      disabled={escrowing[index] || requestingPayment[index]}
                                      type="checkbox"
                                      checked={requestPaymentCheck[index]}
                                      onChange={(e) => {
                                        setRequestPaymentCheck(
                                          requestPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                    />

                                    <button
                                      disabled={escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index]}
                                      
                                      className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {

                                        requestPayment(
                                          index,
                                          item._id,
                                          item.tradeId,
                                          item.opwAmount
                                        );
                                      }}
                                    >
                                      <Image
                                        src="/loading.png"
                                        alt="loading"
                                        width={16}
                                        height={16}
                                        className={escrowing[index] || requestingPayment[index] ? 'animate-spin' : 'hidden'}
                                      />
                                      <span>{Request_Payment}</span>
                                    
                                    </button>

                                  </div>
                                )}

                                {item.status === 'paymentRequested' && (

                                  <div className="mt-5 flex flex-col gap-2">

                                    <div className="flex flex-row items-center gap-3">

                                      <Image
                                        src="/loading.png"
                                        alt="Escrow"
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                      />
                                      <span className="text-sm font-semibold text-yellow-500">
                                        {/*Escrow_Completed*/}
                                        {/* 판매 준비 완료 : 결제 확인 후 결제 확인 버튼을 눌러 거래를 완성해 주세요. */}
                                        {/* Sell preparation complete: After confirming the payment, press the payment confirmation button to complete the transaction. */}
                                        {Sell_preparation_complete}
                                      </span>
                                    </div>

                                    {item.walletAddress === address && (
                                      <div className="flex flex-row gap-1">

                                        <input
                                          disabled={confirmingPayment[index]}
                                          type="checkbox"
                                          checked={confirmPaymentCheck[index]}
                                          onChange={(e) => {
                                            setConfirmPaymentCheck(
                                              confirmPaymentCheck.map((item, idx) => {
                                                if (idx === index) {
                                                  return e.target.checked;
                                                }
                                                return item;
                                              })
                                            );
                                          }}
                                        />

                                        <button
                                          disabled={confirmingPayment[index] || !confirmPaymentCheck[index]}
                                          className={`w-full flex flex-row gap-1 text-sm text-white px-2 py-2 rounded-md ${confirmingPayment[index] || !confirmPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                          onClick={() => {
                                            confirmPayment(
                                              index,
                                              item._id,
                                              paymentAmounts[index]
                                            );
                                          }}

                                        >

                                          <Image
                                            src="/loading.png"
                                            alt="loading"
                                            width={16}
                                            height={16}
                                            className={confirmingPayment[index] ? 'animate-spin' : 'hidden'}
                                          />
                                          <span>{Confirm_Payment}</span>

                                        </button>

                                      </div>
                                    )}


                                    {/* escrow cancel */}
                                    {/*
                                    <div className="flex flex-row gap-1">

                                      <input
                                        disabled={rollbackingPayment[index]}
                                        type="checkbox"
                                        checked={rollbackPaymentCheck[index]}
                                        onChange={(e) => {
                                          setRollbackPaymentCheck(
                                            rollbackPaymentCheck.map((item, idx) => {
                                              if (idx === index) {
                                                return e.target.checked;
                                              }
                                              return item;
                                            })
                                          );
                                        }}
                                      />

                                      <button
                                        disabled={rollbackingPayment[index] || !rollbackPaymentCheck[index]}
                                        className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${rollbackingPayment[index] || !rollbackPaymentCheck[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                        onClick={() => {
                                          rollbackPayment(
                                            index,
                                            item._id,
                                            paymentAmounts[index]
                                          );
                                        }}

                                      >
                                          
                                          <Image
                                            src="/loading.png"
                                            alt="loading"
                                            width={16}
                                            height={16}
                                            className={rollbackingPayment[index] ? 'animate-spin' : 'hidden'}
                                          />
                                          <span>
                                            에스크로 취소
                                          </span>

                                      </button>

                                    </div>
                                    */}



                                  </div>

                                )}


                                {item.status === 'cancelled' && (
                                  <span className="text-red-500">{Cancelled}</span>
                                )}
                                
                              </td>

                          </tr>
                      ))}
                  </tbody>
                  </table>

                  ) : (



                  <div className=" w-full grid gap-4 xl:grid-cols-3 justify-center">

                    {sellOrders.map((item, index) => (

                      <div
                        key={index}
                        className="relative flex flex-col items-center justify-center"
                      >


                        {item.status === 'ordered' && (new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24) && (
                          <div className="absolute inset-0 flex justify-center items-center z-10
                            bg-black bg-opacity-50
                          ">
                            <Image
                              src="/icon-expired.png"
                              alt="Expired"
                              width={100}
                              height={100}
                              className="opacity-20"
                            />
                          </div>
                        )}



                        {item.status === 'cancelled' && (
                          <div className="absolute inset-0 flex justify-center items-center z-10
                            bg-black bg-opacity-50
                          ">
                            <Image
                              src="/icon-cancelled.png"
                              alt="Cancelled"
                              width={100}
                              height={100}
                              className="opacity-20"
                            />
                          </div>
                        )}




                        <article
                            key={index}
                            className={`

                              w-full h-full

                              bg-black p-4 rounded-md border
                              
                               ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}
                               

                               ${item.status === 'paymentConfirmed' ? 'bg-gray-900 border-gray-900' : ''}

                            `}
                        >

                            {item.status === 'ordered' && (
                              <div className="flex flex-col items-start gap-1">


                                <div className="flex flex-row items-center gap-2">
                                  {/* new order icon 1 hour after created */}

            
                                  {
                                    (new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60 < 1 && (
                                      <Image
                                        src="/icon-new.png"
                                        alt="New Order"
                                        width={32}
                                        height={32}
                                      />
                                    ) 
                                  } 



                                  {item.privateSale ? (
                                      <Image
                                        src="/icon-private-sale.png"
                                        alt="Private Sale"
                                        width={32}
                                        height={32}
                                      />
                                  ) : (
                                      <Image
                                        src="/icon-public-sale.png"
                                        alt="Public Sale"
                                        width={32}
                                        height={32}
                                      />
                                  )}

                                  <p className="text-sm text-zinc-400">



                                    {params.lang === 'en' && Opened_at} {
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )}{' '}{params.lang === 'kr' && Opened_at}


                                  </p>

                                </div>

                                {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) > 0 ? (

                                  <div className="mt-2 flex flex-row items-center space-x-2">
                                    <Image
                                      src="/icon-timer.webp"
                                      alt="Timer"
                                      width={28}
                                      height={28}
                                    />
                                    <p className="text-sm text-zinc-400">Expires in {

                                      24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) - 1

                                    } hours {
                                      60 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) % 60
                                    } minutes

                                    
                                    </p>
                                  </div>

                                  ) : (
                                  <div className="mt-2 flex flex-row items-center space-x-2">
                                    <Image
                                      src="/icon-timer.webp"
                                      alt="Expired"
                                      width={28}
                                      height={28}
                                    />
                                    <p className="text-sm text-zinc-400">Expired</p>
                                  </div>
                                )}

                              </div>
                            )}






                            { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'cancelled') && (

                              <div className="flex flex-row items-center gap-2  bg-white px-2 py-1 rounded-md mb-4  ">




                                {item.privateSale && (
                                    <Image
                                      src="/icon-private-sale.png"
                                      alt="Private Sale"
                                      width={32}
                                      height={32}
                                    />
                                ) }

                                { (item.status === 'accepted' || item.status === 'paymentRequested') && (
                                  <Image
                                    src="/icon-trade.png"
                                    alt="Trade"
                                    width={32}
                                    height={32}
                                  />
                                )}


                                <p className="text-xl font-semibold text-green-500 ">
                                  {TID}: {item.tradeId}
                                </p>

                              </div>

                            )}












                            { (item.status === 'paymentConfirmed') && (

                              <div className="flex flex-row items-center gap-2  bg-white px-2 py-1 rounded-md mb-4">

                                <Image
                                  src="/confirmed.png"
                                  alt="Payment Confirmed"
                                  width={50}
                                  height={50}
                                />

                                <p className="text-xl font-semibold text-green-500 ">
                                  {TID}: {item.tradeId}
                                </p>
                              </div>

                            )}


                            {/*
                            {item.acceptedAt && (
                              <p className="mb-2 text-sm text-zinc-400">
                                Trade started at {new Date(item.acceptedAt).toLocaleDateString() + ' ' + new Date(item.acceptedAt).toLocaleTimeString()}
                              </p>
                            )}



                            {item.status === 'cancelled' && (

                                <p className="text-sm text-zinc-400"> 
                                  Cancelled at {new Date(item?.cancelledAt).toLocaleString()}
                                </p>
                    
                            )}



                            {item.paymentConfirmedAt && (
                              <p className="mb-2 text-sm text-zinc-400">
                                
                                Completed at {new Date(item.paymentConfirmedAt).toLocaleDateString() + ' ' + new Date(item.paymentConfirmedAt).toLocaleTimeString()}
                            
                              </p>
                            )}
                            */}



                            <div className="mt-4 flex flex-col items-start gap-2">

                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold text-white">
                                  {Sell_Amount}:{' '}
                                </span>
                                <p className="text-2xl font-semibold text-green-500">
                                  {item.opwAmount} OPW
                                </p>
                              </div>

                              <div className="flex flex-row items-start gap-2">

                                <p className="text-xl text-zinc-400">
                                  {Price}:{' '}
                                  {
                                    item.fietCurrency === 'USDT' ? (
                                      Number(item.fietAmount).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                      })
                                    ) : item.fietCurrency === 'KRW' ? (
                                      Number(item.fietAmount).toLocaleString('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                      })
                                    ) : item.fietCurrency === 'USD' ? (
                                      Number(item.fietAmount).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                      })
                                    ) : item.fietCurrency === 'JPY' ? (
                                      Number(item.fietAmount).toLocaleString('ja-JP', {
                                        style: 'currency',
                                        currency: 'JPY',
                                      })
                                    ) : item.fietCurrency === 'CNY' ? (
                                      Number(item.fietAmount).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'CNY',
                                      })
                                    ) : (
                                      Number(item.fietAmount).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                      })
                                    )
                                  }
                                  
                                </p>

                                <p className="text-lg font-semibold text-white">{Rate}: {

                                  Number(item.fietAmount / item.opwAmount).toFixed(2)

                                }</p>

                              </div>

                            </div>

                            {/*
                            {address && item.walletAddress === address && item.status !== 'cancelled' && (
                            */}
                            {item.status !== 'cancelled' && (
                              
                              
                              <div className="mt-4 flex flex-col gap-2 items-start">

                                <p className="mt-2 text-sm text-zinc-400">
                                  {Payment}:
                                </p>
                                  
                                  
                                  {/*item.seller?.bankInfo.bankName} {item.seller?.bankInfo.accountNumber} {item.seller?.bankInfo.accountHolder*/}

                                  {
                                  item?.payment?.method === 'Wallet' ? (

                                    <div className="flex flex-row items-center gap-2 text-zinc-400">
                                      <span>{item?.walletAddress.substring(0, 10)}...</span>
                                    </div>

                                  ) : item?.payment?.method === 'Bank' ? (
                                    <div className="flex flex-row items-center gap-2 text-zinc-400">
                                      <span>{item?.payment?.seller?.bankInfo.bankName}</span>
                                      <span>{item?.payment?.seller?.bankInfo.accountNumber}</span>
                                      <span>{item?.payment?.seller?.bankInfo.accountHolder}</span>
                                    </div>
                                  ) : item?.payment?.method === 'AliPay'
                                  || item?.payment?.method === 'WechatPay'
                                  || item?.payment?.method === 'UnionPay'
                                  || item?.payment?.method === 'JdPay'
                                  || item?.payment?.method === 'NaverPay'
                                  || item?.payment?.method === 'KakaoPay' ? (

                                    <div className="w-full flex flex-row items-center justify-between gap-2 text-zinc-400">
                                      <span>{item?.payment?.method}</span>
                                      <Image
                                        src={item?.payment?.seller?.qrcodeImage ? item?.payment?.seller?.qrcodeImage : '/icon-qrcode.png'}
                                        alt="qrcode"
                                        width={200}
                                        height={200}
                                        className="rounded-md"
                                      />
                                    </div>

                                  ) : (
                                    <div className="flex flex-col gap-1">
                                      <span>
                                        X
                                      </span>
                                    </div>
                                  )}


                                
                                {/*
                                <p className="text-sm text-zinc-400">
                                  {Deposit_Name}: {
                                    item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                  }
                                </p>  
                                */}
                              </div>

                            )}



                       

                            
                            <div className="mt-4 flex text-lg font-semibold mb-2 text-white">
                              {
   

                                item.walletAddress === address &&
                                (item.status === 'accepted' || item.status === 'paymentRequested') ? (

                     
                                  <div className="flex flex-row items-center gap-2">
                                    <span>{Seller}: {item.nickname}</span>
                                    <span className="text-green-500">:{Me}</span>
                                    
                                    {/* goto /sell-opw/:id */}
                                    {/*
                                    <div
                                      className="text-sm
                                        bg-blue-500 text-zinc-800 px-3 py-2 rounded-md hover:bg-blue-600 cursor-pointer"

                                      onClick={() => {
                                        router.push(
                                          "/" + params.lang + "/" + params.chain + `/sell-opw/${item._id}`);
                                      }}
                                    >
                                      {Go_Sell_OPW}
                                    </div>
                                    */}
                                
                                  </div>




                                ) : (item.walletAddress === address && item.status === 'ordered') ? (

                                  <div className="flex flex-row items-center gap-2">
                                    <span>{Seller}: {item.nickname}</span>
                                    <span className="text-green-500">:{Me}</span>
                                           
                                    <button
                                        disabled={cancellings[index]}
                                        className={`text-sm bg-red-500 text-zinc-800 px-3 py-2 rounded-md ${cancellings[index] ? 'bg-gray-500' : ''}`}
                                        onClick={() => {
                                          // api call
                                          // cancelSellOrder
      
                                          cancelSellOrder(item._id, index);
      
                                        }}
                                    >
      
                                      <div className="flex flex-row text-xs items-center gap-2 ">
                                        {cancellings[index] ? (
                                          <div className="
                                            w-4 h-4
                                            border-2 border-zinc-800
                                            rounded-full
                                            animate-spin
                                          ">
                                            <Image
                                              src="/loading.png"
                                              alt="loading"
                                              width={12}
                                              height={12}
                                            />
                                          </div>
                                        ) : (
                                          <Image
                                            src="/icon-cancelled.png"
                                            alt="Cancel"
                                            width={12}
                                            height={12}
                                          />
                                        )}
                                        <div className="flex flex-row xl:flex-col items-center gap-1">
                                          <span>{Cancel_My_Order}</span>
                                        </div>
                                      </div>
                                      
                                    </button>

                                  </div>
  

                                ) : (
                                
                                  <span>
                                    {Seller}: {item.nickname}
                                  </span>

                                )

                              }
                            </div>

                          

   



                            {/* accept order button for seller */}

                            
                            {(item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'paymentConfirmed' || item.status === 'cancelled') 
                              && (
                                <div className="w-full mt-4 mb-2 flex flex-col gap-2 items-start ">
                                  <p className="text-lg text-green-500 font-semibold">
                                    {Buyer}: {
                                      item.buyer.walletAddress === address ? item.buyer.nickname + ' :' + Me :
                                    
                                      item.buyer.nickname
                                    }
                                  </p>
                                </div>
                            )}
                            





                            {/* share button */}
                           

                            {/*
                            <div className=" mt-4 flex flex-row gap-2 items-center justify-center">

                              {item.privateSale && (
                                <Image
                                  src="/icon-private-sale.png"
                                  alt="Private Sale"
                                  width={48}
                                  height={48}
                                />
                              )}
   

                              {item.walletAddress === address && item.privateSale && (
                                <button
                                    className=" flex flex-row text-sm bg-blue-500 text-zinc-800 px-2 py-1 rounded-md"
                                    onClick={() => {
                                      
                                      ////router.push(`/sell-opw/${item._id}`);

                                      // copy to clipboard
                                      navigator.clipboard.writeText(`https://wallet.olgaai.io/${params.lang}/${params.chain}/sell-opw/${item._id}`);
                                      toast.success('Link has been copied to clipboard');

                                    }}
                                >

                                  <Image
                                    src="/icon-share.png"
                                    alt="Share"
                                    width={16}
                                    height={16}
                                    className="mr-2"
                                  />
                                  Share
                                </button>
                              )}


                            </div>
                            */}
                          




                            {/* waiting for escrow */}
                            {item.status === 'accepted' && (
                                <div className="mt-4 flex flex-row gap-2 items-center justify-start text-white">
                                  <Image
                                    src="/loading.png"
                                    alt="Escrow"
                                    width={32}
                                    height={32}
                                    className="animate-spin"
                                  />

                                  <div className="flex flex-col gap-2 items-start">
                                    <span className="text-sm text-yellow-500">
                                      {Buyer_has_accepted_the_trade}
                                    </span>

                                    <span className="text-sm text-zinc-400">
                                      {If_the_seller_does_not_deposit_the_OPW_to_escrow}
                                    </span>
                                    <span className="text-sm text-zinc-400">
                                      {this_trade_will_be_cancelled_in}{' '}
                                      {
                                        (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) > 0
                                        ? (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) + ' ' + hours
                                        : (60 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) % 60) + ' ' + minutes

                                      }
                                    </span>
                                  </div>

                                </div>
                            )}



                            {/* waiting for payment */}
                            {item.status === 'paymentRequested' && (

                                <div className="mt-4 flex flex-col gap-2 items-start justify-start text-white">

                                  <div className="flex flex-row items-center gap-2">

                                    <Image
                                      src="/smart-contract.png"
                                      alt="Smart Contract"
                                      width={32}
                                      height={32}
                                    />
                                    <div>{Escrow}: {item.opwAmount} OPW</div>

 
                                    <button
                                      className="bg-white text-black px-2 py-2 rounded-md"
                                      onClick={() => {
                                          // new window for smart contract
                                          ///window.open(`https://polygonscan.com/tx/${item.escrowTransactionHash}`);


                                          {
                                            params.chain === 'polygon' ? (
                                              window.open(`https://polygonscan.com/tx/${item.escrowTransactionHash}`)
                                            ) : (
                                              window.open(`https://etherscan.io/tx/${item.escrowTransactionHash}`)
                                            )
                                          }


                                      }}
                                    >
                                      <Image
                                        src="/logo-polygon.png"
                                        alt="Polygon"
                                        width={20}
                                        height={20}
                                      />
                                    </button>

                              

                                  </div>

                                  <div className="flex flex-row gap-2 items-center justify-start">

                                    {/* rotate loading icon */}
                                  
                                    <Image
                                      src="/loading.png"
                                      alt="Escrow"
                                      width={32}
                                      height={32}
                                      className="animate-spin"
                                    />

                                    <div>
                                      {Waiting_for_seller_to_deposit}{' '}{item.fietAmount}
                                      {' '}{item?.fietCurrency}
                                      
                                    </div>

                                  </div>

                                </div>
                            )}




                                {
                                item.walletAddress === address &&
                                item.status === 'accepted' && (
                                  <div className="mt-5 flex flex-row gap-1">

                                    {/* check box for agreement */}
                                    <input
                                      disabled={escrowing[index] || requestingPayment[index]}
                                      type="checkbox"
                                      checked={requestPaymentCheck[index]}
                                      onChange={(e) => {
                                        setRequestPaymentCheck(
                                          requestPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                    />

                                    <button
                                      disabled={escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index]}
                                      
                                      className={`w-full flex flex-row gap-1 text-sm text-white px-2 py-2 rounded-md ${escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {

                                        requestPayment(
                                          index,
                                          item._id,
                                          item.tradeId,
                                          item.opwAmount
                                        );
                                      }}
                                    >
                                      <Image
                                        src="/loading.png"
                                        alt="loading"
                                        width={16}
                                        height={16}
                                        className={escrowing[index] || requestingPayment[index] ? 'animate-spin' : 'hidden'}
                                      />
                                      <span>{Request_Payment}</span>
                                    
                                    </button>

                                  </div>
                                )}


                                {item.walletAddress === address && item.status === 'paymentRequested' && (
                      

                                <div className="mt-5 flex flex-col gap-1 mb-1">

                                  <span className="text-sm font-semibold text-yellow-500">{Escrow_Completed}</span>

                                  <div className="flex flex-row gap-1">

                                    <input
                                      disabled={confirmingPayment[index]}
                                      type="checkbox"
                                      checked={confirmPaymentCheck[index]}
                                      onChange={(e) => {
                                        setConfirmPaymentCheck(
                                          confirmPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                    />

                                    <button
                                      disabled={confirmingPayment[index] || !confirmPaymentCheck[index]}
                                      className={`w-full flex flex-row gap-1 text-sm text-white px-2 py-2 rounded-md ${confirmingPayment[index] || !confirmPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {
                                        confirmPayment(
                                          index,
                                          item._id,
                                          paymentAmounts[index]
                                        );
                                      }}

                                    >

                                      <Image
                                        src="/loading.png"
                                        alt="loading"
                                        width={16}
                                        height={16}
                                        className={confirmingPayment[index] ? 'animate-spin' : 'hidden'}
                                      />
                                      <span>{Confirm_Payment}</span>

                                    </button>

                                  </div>


                                  {/* escrow cancel */}
                                  {/*
                                  <div className="flex flex-row gap-1">

                                    <input
                                      disabled={rollbackingPayment[index]}
                                      type="checkbox"
                                      checked={rollbackPaymentCheck[index]}
                                      onChange={(e) => {
                                        setRollbackPaymentCheck(
                                          rollbackPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                    />

                                    <button
                                      disabled={rollbackingPayment[index] || !rollbackPaymentCheck[index]}
                                      className={`flex flex-row gap-1 text-xs text-white px-2 py-1 rounded-md ${rollbackingPayment[index] || !rollbackPaymentCheck[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                      onClick={() => {
                                        rollbackPayment(
                                          index,
                                          item._id,
                                          paymentAmounts[index]
                                        );
                                      }}

                                    >
                                        
                                        <Image
                                          src="/loading.png"
                                          alt="loading"
                                          width={16}
                                          height={16}
                                          className={rollbackingPayment[index] ? 'animate-spin' : 'hidden'}
                                        />
                                        <span>
                                          에스크로 취소
                                        </span>

                                    </button>

                                  </div>
                                  */}



                                </div>



                                )}






                        </article>


                      </div>

                    ))}

                  </div>


                )}

            </div>

            
          </div>


          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  goChat={goChat}
              />
          </Modal>


        </main>

    );


};






// close modal

const TradeDetail = (
    {
        closeModal = () => {},
        goChat = () => {},
        
    }
) => {


    const [amount, setAmount] = useState(1000);
    const price = 91.17; // example price
    const receiveAmount = (amount / price).toFixed(2);
    const commission = 0.01; // example commission
  
    return (

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
          <h2 className="text-lg font-semibold text-black ">Iskan9</h2>
          <span className="ml-2 text-blue-500 text-sm">318 trades</span>
        </div>
        <p className="text-gray-600 mt-2">The offer is taken from another source. You can only use chat if the trade is open.</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span>{price} KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Limit</span>
            <span>40680.00 KRW - 99002.9 KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Available</span>
            <span>1085.91 OPW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Seller&apos;s payment method</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 rounded-full">Tinkoff</span>
          </div>
          <div className="mt-4 text-gray-700">
            <p>24/7</p>
          </div>
        </div>
  
        <div className="mt-6 border-t pt-4 text-gray-700">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">I want to pay</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(
                    e.target.value === '' ? 0 : parseInt(e.target.value)
                ) }

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">I will receive</label>
              <input 
                type="text"
                value={`${receiveAmount} OPW`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Commission</label>
              <input 
                type="text"
                value={`${commission} OPW`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
                className="bg-green-500 text-zinc-800 px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Buy OPW');
                    // go to chat
                    // close modal
                    closeModal();
                    goChat();

                }}
            >
                Buy OPW
            </button>
            <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Cancel');
                    // close modal
                    closeModal();
                }}
            >
                Cancel
            </button>
          </div>

        </div>


      </div>
    );
  };



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
                OPW Wallet Admin
              </span>
            </div>
          </button>
  
        </div>
        
      </header>
    );
  }
  