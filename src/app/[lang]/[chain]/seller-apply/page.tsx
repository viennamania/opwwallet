// nickname settings
'use client';
import React, { use, useEffect, useState } from 'react';



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


import {
    getUserPhoneNumber,
    getUserEmail,
} from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';

import UploaderAliPay from '@/components/uploaderAliPay';

import UploaderWechatPay from '@/components/uploaderWechatPay';

import UploaderUnionPay from '@/components/uploaderUnionPay';

import UploaderJdPay from '@/components/uploaderJdPay';

import UploaderNaverPay from '@/components/uploaderNaverPay';

import UploaderKakaoPay from '@/components/uploaderKakaoPay';

import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";






const wallets = [
    inAppWallet({
      auth: {
        options: ["phone", "email"],
      },
    }),
];



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon

const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum




import {
    useRouter,
    useSearchParams,
} from "next//navigation";

import { N } from 'ethers';



export default function SettingsPage({ params }: any) {


    //console.log("params", params);
    
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

        Wallet_Settings: "",
        Profile_Settings: "",

        Profile: "",
        My_Profile_Picture: "",
  
        Edit: "",


        Cancel: "",
        Save: "",
        Saving: "",
        Enter_your_nickname: "",
        Nickname_should_be_5_10_characters: "",

        Seller: "",
        Not_a_seller: "",
        Apply: "",
        Applying: "",
        Enter_your_bank_name: "",
        Enter_your_account_number: "",
        Enter_your_account_holder: "",
        Send_OTP: "",
        Enter_OTP: "",
        Verify_OTP: "",
        OTP_verified: "",

        Nickname_should_be_alphanumeric_lowercase: "",
        Nickname_should_be_at_least_5_characters_and_at_most_10_characters: "",
  
        Bank_Name: "",
        Account_Number: "",
        Account_Holder: "",

        Nickname_saved: "",
        You_must_enter_different_nickname: "",

        Profile_Information: "",
        Bank_Information: "",
        QR_Code_Payment_Information: "",

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

        Wallet_Settings,
        Profile_Settings,

        Profile,
        My_Profile_Picture,
  
        Edit,

        Cancel,
        Save,
        Saving,
        Enter_your_nickname,
        Nickname_should_be_5_10_characters,

        Seller,
        Not_a_seller,
        Apply,
        Applying,
        Enter_your_bank_name,
        Enter_your_account_number,
        Enter_your_account_holder,
        Send_OTP,
        Enter_OTP,
        Verify_OTP,
        OTP_verified,

        Nickname_should_be_alphanumeric_lowercase,
        Nickname_should_be_at_least_5_characters_and_at_most_10_characters,

        Bank_Name,
        Account_Number,
        Account_Holder,

        Nickname_saved,
        You_must_enter_different_nickname,

        Profile_Information,
        Bank_Information,
        QR_Code_Payment_Information,

        Sign_in_with_Wallet,

    } = data;
    
    



    const router = useRouter();



    const activeAccount = useActiveAccount();

    const address = activeAccount?.address;
  
  
      
    console.log("address", address);
 

    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    useEffect(() => {
  
  
      if (address) {
  
        //const phoneNumber = await getUserPhoneNumber({ client });
        //setPhoneNumber(phoneNumber);
  
  
        getUserPhoneNumber({ client }).then((phoneNumber) => {
          setPhoneNumber(phoneNumber || "");
        });
  
        getUserEmail({ client }).then((emailAddress) => {
          setEmailAddress(emailAddress || "");
        });
  
  
      }
  
    } , [address]);



    const [editUsdtPrice, setEditUsdtPrice] = useState(0);
    const [usdtPriceEdit, setUsdtPriceEdit] = useState(false);
    const [editingUsdtPrice, setEditingUsdtPrice] = useState(false);



    // get usdt price
    // api /api/order/getPrice

    const [usdtPrice, setUsdtPrice] = useState(0);
    useEffect(() => {

        if (!address) {
            return;
        }

        const fetchData = async () => {

            setEditingUsdtPrice(true);

            const response = await fetch("/api/order/getPrice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            const data = await response.json();

            ///console.log("getPrice data", data);

            if (data.result) {
                setUsdtPrice(data.result.usdtPrice);
            }

            setEditingUsdtPrice(false);
        };

        fetchData();
    }

    , [address]);


    
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("/profile-default.png");
    const [userCode, setUserCode] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");


    const [avatarEdit, setAvatarEdit] = useState(false);



    const [seller, setSeller] = useState(null) as any;


    // Alipay , Wechat PAY, UnionPay, JD Pay, Naver pay, kakao pay

    const [aliPaySeller, setAlipaySeller] = useState(null) as any;
    const [wechatPaySeller, setWechatPaySeller] = useState(null) as any;
    const [unionPaySeller, setUnionPaySeller] = useState(null) as any;
    const [jdPaySeller, setJdPaySeller] = useState(null) as any;
    const [naverPaySeller, setNaverPaySeller] = useState(null) as any;
    const [kakaoPaySeller, setKakaoPaySeller] = useState(null) as any;






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

            const data = await response.json();

            ////console.log("data", data);

            if (data.result) {
                setNickname(data.result.nickname);
                
                data.result.avatar && setAvatar(data.result.avatar);
                

                setUserCode(data.result.id);

                setSeller(data.result?.seller);

                setAlipaySeller(data.result?.alipaySeller);
                setWechatPaySeller(data.result?.wechatPaySeller);
                setUnionPaySeller(data.result?.unionPaySeller);
                setJdPaySeller(data.result?.jdPaySeller);
                setNaverPaySeller(data.result?.naverPaySeller);
                setKakaoPaySeller(data.result?.kakaoPaySeller);




            } else {
                setNickname('');
                setAvatar('/profile-default.png');
                setUserCode('');

                setEditedNickname('');
                setAccountHolder('');
                setAccountNumber('');
                setBankName('');

                setSeller(null);
                setAlipaySeller(null);
                setWechatPaySeller(null);
                setUnionPaySeller(null);
                setJdPaySeller(null);
                setNaverPaySeller(null);
                setKakaoPaySeller(null);
            }

        };

        fetchData();
    }, [address]);





    const [loadingSetUserUpdated, setLoadingSetUserUpdated] = useState(false);

    const setUserData = async () => {


        // check nickname length and alphanumeric
        //if (nickname.length < 5 || nickname.length > 10) {

        if (editedNickname.length < 5 || editedNickname.length > 10) {

            toast.error(Nickname_should_be_5_10_characters);
            return;
        }
        
        ///if (!/^[a-z0-9]*$/.test(nickname)) {
        if (!/^[a-z0-9]*$/.test(editedNickname)) {
            toast.error(Nickname_should_be_alphanumeric_lowercase);
            return;
        }

        setLoadingSetUserUpdated(true);


        if (nicknameEdit) {


            const response = await fetch("/api/user/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    
                    //nickname: nickname,
                    nickname: editedNickname,

                }),
            });

            const data = await response.json();

            ///console.log("updateUser data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success(Nickname_saved);

            } else {

                toast.error(You_must_enter_different_nickname);
            }


        } else {

            const response = await fetch("/api/user/setUserVerified", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    
                    //nickname: nickname,
                    nickname: editedNickname,

                    mobile: phoneNumber,
                    email: emailAddress,
                }),
            });

            const data = await response.json();

            //console.log("data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success(Nickname_saved);

            } else {
                toast.error(You_must_enter_different_nickname);
            }
        }


        setLoadingSetUserUpdated(false);
        
    }


    // 은행명, 계좌번호, 예금주
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");

    const [applying, setApplying] = useState(false);


    const apply = async () => {
      if (applying) {
        return;
      }
  
  
      if (!bankName || !accountNumber || !accountHolder) {
        toast.error('Please enter bank name, account number, and account holder');
        return
    }
  
      setApplying(true);
  
      try {
  
          await fetch('/api/user/updateSeller', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: address,
                sellerStatus: 'confirmed',
                bankName: bankName,
                accountNumber: accountNumber,
                accountHolder: accountHolder,
            }),
          });
          


          await fetch('/api/user/getUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: address,
            }),
          }).then((response) => response.json())
            .then((data) => {
                setSeller(data.result.seller);
            });
  
      } catch (error) {
        toast.error('Failed to send USDT');
      }
  
      setApplying(false);
    };







    // check box edit seller
    const [editSeller, setEditSeller] = useState(false);


    const [otp, setOtp] = useState('');

    const [verifiedOtp, setVerifiedOtp] = useState(true);
  
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
          mobile: phoneNumber,
          email: emailAddress,
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
        


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center space-x-4'>
                        <GearSetupIcon/>
                        <div className="text-2xl font-semibold">
                            {Profile_Settings}
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

                    </div>


                    <div className='w-full flex flex-col gap-5 '>

                        {/* profile */}
                

                        <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>


                            {/* Profile Information */}
                            <span className='text-xl font-semibold'>
                                {Profile_Information}
                            </span>

                            <div className='w-full grid grid-cols-1 xl:grid-cols-2 gap-5 items-start justify-between'>

                                <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                    {userCode && (
                                        <div className='w-full flex flex-row gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>

                                            <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                                {My_Nickname}
                                            </div>

                                            <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                                {nickname}
                                            </div>

                                            
                                            <button
                                                onClick={() => {

                                                    nicknameEdit ? setNicknameEdit(false) : setNicknameEdit(true);

                                                } }
                                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                                            >
                                                {nicknameEdit ? Cancel : Edit}
                                            </button>

                                            <Image
                                                src="/verified.png"
                                                alt="Verified"
                                                width={20}
                                                height={20}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    )}


                                    { (address && (nicknameEdit || !userCode)) && (
                                        <div className='w-full flex flex-col xl:flex-row gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>

                                            <div
                                                className="bg-green-500 text-sm text-zinc-100 p-2 rounded"
                                            >
                                                {My_Nickname}
                                            </div>

                                            <div className='flex flex-col gap-2 items-start justify-between'>
                                                <input
                                                    disabled={!address}
                                                    className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-2xl font-semibold"
                                                    placeholder={Enter_your_nickname}
                                                    
                                                    //value={nickname}
                                                    value={editedNickname}

                                                    type='text'
                                                    onChange={(e) => {
                                                        // check if the value is a number
                                                        // check if the value is alphanumeric and lowercase

                                                        if (!/^[a-z0-9]*$/.test(e.target.value)) {
                                                            toast.error(Nickname_should_be_alphanumeric_lowercase);
                                                            return;
                                                        }
                                                        if ( e.target.value.length > 10) {
                                                            toast.error(Nickname_should_be_at_least_5_characters_and_at_most_10_characters);
                                                            return;
                                                        }

                                                        //setNickname(e.target.value);

                                                        setEditedNickname(e.target.value);

                                                    } }


                                                />
                                                <div className='flex flex-row gap-2 items-center justify-between'>
                                                    <span className='text-xs font-semibold'>
                                                        {Nickname_should_be_5_10_characters}
                                                    </span>
                                                </div>
                                            </div>


                                            <button
                                                disabled={!address || loadingSetUserUpdated}
                                                className={`
                                                    ${!address || loadingSetUserUpdated ? 'bg-gray-300 text-gray-400' : 'bg-green-500 text-zinc-100'}
                                                    p-2 rounded-lg text-sm font-semibold
                                                `}
                                                onClick={() => {
                                                    setUserData();
                                                }}
                                            >
                                                <div className='flex flex-row gap-2 items-center justify-center'>
                                                    <Image
                                                        src="/icon-save.png"
                                                        alt="Save"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <span>
                                                    {loadingSetUserUpdated ? Saving+'...' : Save}
                                                    </span>
                                                </div>
                                            </button>

                                            

                                        </div>
                                    )}

                                </div>

                                {userCode && (
                                    <div className='w-full flex flex-row xl:flex-row gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>

                                        <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                            {My_Profile_Picture}
                                        </div>

                                        <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                            <Uploader
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                        {/*
                        {userCode && (

                            <div className='flex flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                                <div className="bg-red-800 text-sm text-zinc-100 p-2 rounded">
                                    My Referral Code
                                </div>

                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                    {userCode}
                                </div>

 

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(userCode);
                                        toast.success('Referral code copied to clipboard');
                                    }}
                                    className="p-2 bg-blue-500 text-zinc-100 rounded"
                                >
                                    Copy
                                </button>

                                <Image
                                src="/verified.png"
                                alt="Verified"
                                width={20}
                                height={20}
                                className="rounded-lg"
                                />


                            </div>

                        )}
                        */}



                        {userCode && (

                            <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>


                                {/* Bank Payment Information */}
                                <span className='text-xl font-semibold'>
                                    {Bank_Information}
                                </span>

                                <div className='w-full flex flex-col xl:flex-row gap-2 items-start justify-between'>

                                    {seller && (

                                        <div className='w-full flex flex-row gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>

                                            <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                                {Seller}
                                            </div>

                                            <div className="flex flex-col p-5 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold gap-5">
                                                
                                                <div className='flex flex-col xl:flex-row gap-2 items-center justify-between'>
                                                    <span className='text-xs font-semibold'>
                                                        {Bank_Name}
                                                    </span>
                                                    <div className="text-lg font-semibold">
                                                        {seller?.bankInfo?.bankName}
                                                    </div>
                                                </div>
                                                <div className='flex flex-col xl:flex-row gap-2 items-center justify-between'>
                                                    <span className='text-xs font-semibold'>
                                                        {Account_Number}
                                                    </span>
                                                    <div className="text-lg font-semibold">
                                                        {seller?.bankInfo?.accountNumber}
                                                    </div>
                                                </div>
                                                <div className='flex flex-col xl:flex-row gap-2 items-center justify-between'>
                                                    <span className='text-xs font-semibold'>
                                                        {Account_Holder}
                                                    </span>
                                                    <div className="text-lg font-semibold">
                                                        {seller?.bankInfo?.accountHolder}
                                                    </div>
                                                </div>
                                            </div>

                                            {/*
                                            <button
                                                onClick={() => {
                                                    setEditSeller(!editSeller);
                                                }}
                                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                                            >
                                                {editSeller ? Cancel : Edit}
                                            </button>
                                            */}

                                            


                                            <Image
                                                src="/verified.png"
                                                alt="Verified"
                                                width={20}
                                                height={20}
                                                className="rounded-lg"
                                            />


                                        </div>
                                    )}


                                    {/* bank information */}
                                    <div className='w-full flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                    
                                        <div className='w-full flex flex-row gap-2 items-center justify-between'>

                                            <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                                {Seller}
                                            </div>

                                            {!seller && (
                                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                                    {Not_a_seller}
                                                </div>
                                            )}

                                            {applying ? (
                                                <div className="p-2 bg-gray-300 text-gray-400 rounded text-sm font-semibold">
                                                    {Applying}...
                                                </div>
                                            ) : (
                                                <button
                                                    disabled={applying || !verifiedOtp}

                                                    onClick={() => {
                                                        // apply to be a seller
                                                        // set seller to true
                                                        // set seller to false
                                                        // set seller to pending

                                                        apply();

                                                    }}
                                                    className={`
                                                        ${!verifiedOtp ? 'bg-gray-300 text-gray-400'
                                                        : 'bg-green-500 text-zinc-100'}

                                                        p-2 rounded-lg text-sm font-semibold
                                                    `}
                                                >
                                                    {Apply}
                                                </button>
                                            )}

                                        </div>

                                        {/* 은행명, 계좌번호, 예금주 */}
                                        <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                                                                
                                            <input 
                                                disabled={applying}
                                                className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                                placeholder={Enter_your_bank_name}
                                                value={bankName}
                                                type='text'
                                                onChange={(e) => {
                                                    setBankName(e.target.value);
                                                }}
                                            />
                                            <input 
                                                disabled={applying}
                                                className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                                placeholder={Enter_your_account_number}
                                                value={accountNumber}
                                                type='number'
                                                onChange={(e) => {

                                                    // check if the value is a number

                                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');

                                                    setAccountNumber(e.target.value);
                                                }}
                                            />
                                            <input 
                                                disabled={applying}
                                                className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                                placeholder={Enter_your_account_holder}
                                                value={accountHolder}
                                                type='text'
                                                onChange={(e) => {
                                                    setAccountHolder(e.target.value);
                                                }}
                                            />
                                        </div>




                                        {/*
                                        <div className="text-xs font-semibold">
                                            To become a seller, you need to send 1 USDT to the contract address
                                        </div>
                                        */}



                                    

                                        {/* otp verification */}

                                        {/*
                                        {verifiedOtp ? (
                                            <div className="w-full flex flex-row gap-2 items-center justify-center">
                                            <Image
                                                src="/verified.png"
                                                alt="check"
                                                width={30}
                                                height={30}
                                            />
                                            <div className="text-white">
                                                {OTP_verified}
                                            </div>
                                            </div>
                                        ) : (
                                        
                                    
                                            <div className="w-full flex flex-row gap-2 items-start">

                                            <button
                                                disabled={!address || isSendingOtp}
                                                onClick={sendOtp}
                                                className={`
                                                
                                                ${isSendedOtp && 'hidden'}

                                                w-32 p-2 rounded-lg text-sm font-semibold

                                                    ${
                                                    !address || isSendingOtp
                                                    ?'bg-gray-300 text-gray-400'
                                                    : 'bg-green-500 text-white'
                                                    }
                                                
                                                `}
                                            >
                                                {Send_OTP}
                                            </button>

                                            <div className={`flex flex-row gap-2 items-center justify-center ${!isSendedOtp && 'hidden'}`}>
                                                <input
                                                type="text"
                                                placeholder={Enter_OTP}
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
                                                    {Verify_OTP}
                                                </button>
                                            </div>

                                            </div>

                                        )}
                                        */}


                                    </div>

                                    {/* USDT Payment Information */}
                                    {/* my wallet address */}
                                    {/*
                                    <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>
                                        <input 
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="USDT Payment Wallet Address"
                                            value={address}
                                            type='text'
                                            disabled
                                        />
                                        
                                    </div>
                                    */}




                                </div>


                            </div>
                        )}


                        {userCode && (

                            <div className='w-full flex flex-col gap-2 items-start justify-between border border-gray-300 p-4 rounded-lg'>

                                {/* Alipay Payment Information */}
                                <span className='text-xl font-semibold'>
                                    {QR_Code_Payment_Information}
                                </span>



                                <div className='w-full grid grid-cols-2 xl:flex xl:flex-row gap-5 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                            
                                    {/* sq code image update */}
                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                                                            
                                        <span className='w-full text-sm bg-green-500 text-zinc-100 p-2 rounded h-14'>
                                            Alipay QR Code
                                        </span>
                                        <div className='bg-zinc-800 rounded-lg p-2'>
                                            <UploaderAliPay
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>

                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                                                            
                                        <span className='w-full text-sm bg-green-500 text-zinc-100 p-2 rounded h-14'>
                                            Wechat Pay QR Code
                                        </span>
                                        <div className='bg-zinc-800 rounded-lg p-2'>
                                            <UploaderWechatPay
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>

                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>
                                                                            
                                        <span className='w-full text-sm bg-green-500 text-zinc-100 p-2 rounded h-14'>
                                            Union Pay QR Code
                                        </span>
                                        <div className='bg-zinc-800 rounded-lg p-2'>
                                            <UploaderUnionPay
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>

                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>

                                        <span className='w-full text-sm bg-green-500 text-zinc-100 p-2 rounded h-14'>
                                            JD Pay QR Code
                                        </span>
                                        <div className='bg-zinc-800 rounded-lg p-2'>
                                            <UploaderJdPay
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>

                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>

                                        <span className='w-full text-sm bg-green-500 text-zinc-100 p-2 rounded h-14'>
                                            Naver Pay QR Code
                                        </span>
                                        <div className='bg-zinc-800 rounded-lg p-2'>
                                            <UploaderNaverPay
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>

                                    <div className='w-full flex flex-col gap-2 items-start justify-between'>

                                        <span className='w-full text-sm bg-green-500 text-zinc-100 p-2 rounded h-14'>
                                            Kakao Pay QR Code
                                        </span>
                                        <div className='bg-zinc-800 rounded-lg p-2'>
                                            <UploaderKakaoPay
                                                lang={params.lang}
                                                walletAddress={address as string}
                                            />
                                        </div>

                                    </div>
                                    

                                </div>




                            </div>

                        )}









                        {/* update USDT Price */}
                        {address && (
                            address === '0x68B4F181d97AF97d8b111Ad50A79AfeB33CF6be6'
                            || address === '0x91CA2566C3345026647aBbACB56093144eAA4c16'
                        )
                            && (
                            <div className='flex flex-col gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                <div className='flex flex-row gap-2 items-center justify-between'>

                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                        Update USDT Price
                                    </div>

                                    <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xl font-semibold">
                                        1 USDT = {usdtPrice} KRW
                                    </div>

                                    <button
                                        onClick={() => {
                                            setUsdtPriceEdit(!usdtPriceEdit);
                                        }}
                                        className="p-2 bg-blue-500 text-zinc-100 rounded"
                                    >
                                        {usdtPriceEdit ? Cancel : Edit}
                                    </button>


                                </div>

                                {usdtPriceEdit && (
                                    <div className='flex flex-col gap-2 items-center justify-between'>

                                        <input 
                                            className="p-2 w-64 text-zinc-100 bg-zinc-800 rounded text-lg font-semibold"
                                            placeholder="Enter USDT Price"
                                            type='number'
                                            value={editUsdtPrice}
                                            onChange={(e) => {
                                                setEditUsdtPrice(e.target.value as any);
                                            }}
                                        />
                                        <button
                                            disabled={editingUsdtPrice}

                                            className={`
                                                ${editingUsdtPrice ? 'bg-gray-300 text-gray-400' : 'bg-green-500 text-zinc-100'}
                                                p-2 rounded-lg text-sm font-semibold
                                            `}

                                            onClick={async () => {
                                                // api call /api/order/updatePrice

                                                const response = await fetch("/api/order/updatePrice", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        walletAddress: address,
                                                        price: editUsdtPrice,
                                                    }),
                                                })
                                                .then((response) => (

                                                    toast.success('USDT price updated successfully'),
                                                    
                                                    setUsdtPrice(editUsdtPrice)
                                                
                                                ))

                                            } }
                                                
                                        >
                                            {Save}
                                        </button>
                                    </div>
                                )}

                            </div>
                        )}

                    

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
    }: {
      lang: string;
      chain: string;
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
  
          {/* menu */}
          
        </div>
        
        {/*
        <Image
          src={thirdwebIcon}
          alt=""
          className="size-[150px] md:size-[150px]"
          style={{
            filter: "drop-shadow(0px 0px 24px #a726a9a8)",
          }}
        />
        */}
  
  
        
      </header>
    );
  }
  