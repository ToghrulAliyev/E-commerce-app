import React from "react";
import { footerLinks, softradeConditions } from "../../utils/Constants";
import {
  BsAndroid,
  BsApple,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsMessenger,
  BsPinterest,
  BsSnapchat,
  BsTiktok,
  BsTwitterX,
  BsX,
  BsYoutube,
} from "react-icons/bs";
import { DiAndroid } from "react-icons/di";
import PrimaryButton from "../Buttons/PrimaryButton";

type Props = {};

const payments = [
  "aexpress",
  "visa",
  "paypal",
  "venmo",
  "master",
  "maestro",
  "klarna",
  "googlepay",
  "discover",
  "dinersc",
  "applepay",
  "afterpay",
  "affirm",
];

const Footer = (props: Props) => {
  return (
    <footer className="h-min-[378px] h-[500px]  w-full bg-[#fafafa]">
      <div className="max-w-screen-xl  m-auto h-full pt-16 px-12 pb-6 flex">
        <div className="flex flex-col justify-between h-full w-1/2">
          <div className="flex gap-16">
            {footerLinks.map((item) => (
              <div key={item.title}>
                <h6 className="font-bold mb-2">{item.title}</h6>
                <ul>
                  {item.links.map((link) => (
                    <li key={link.title}>{link.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="">
            <div>©2023-2024 Softrade All Rights Reserved</div>
            <div className="flex w-4/5 flex-wrap">
              {softradeConditions.map((item, index) => (
                <div className="flex items-center " key={item.title}>
                  <span className="underline font-medium text-xs leading-7">
                    {item.title}
                  </span>
                  {index === softradeConditions.length - 1 ? null : (
                    <div className="w-[0.1px] h-4 bg-gray-400 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex justify-between font-bold text-xs">
            <div className="w-[30%]">
              <span>FIND US ON</span>
              <div className="my-4 flex gap-4 items-center flex-wrap">
                <BsInstagram className="text-2xl" />
                <BsFacebook className="text-2xl" />
                <BsTwitterX className="text-2xl" />
                <BsYoutube className="text-2xl" />
                <BsPinterest className="text-2xl" />
                <BsTiktok className="text-2xl" />
                <BsLinkedin className="text-2xl" />
                <BsMessenger className="text-2xl" />
              </div>
            </div>
            <div>
              <span>DOWNLOAD SOFTRADE APP TO SAVE MORE!</span>
              <div className="my-4 flex gap-4 items-center">
                <BsApple className="text-2xl" />
                <DiAndroid className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="font-bold mb-4">SIGN UP FOR SHEIN STYLE NEWS</div>
            <div className="flex">
              <input
                className="border  py-2  px-3 border-gray-200 w-full"
                type="email"
                name="email"
                placeholder="Your Email Address"
              />
              <PrimaryButton extraClassName="w-48 bg-[#555] text-white rounded-none hover:text-[#555]">
                Subscribe
              </PrimaryButton>
            </div>
            <p className="w-3/4 mt-6">
              By clicking the SUBSCRIBE button, you are agreeing to our{" "}
              <span className="text-blue-800 underline">
                <a href="#">Privacy & Cookie Policy</a>
              </span>{" "}
              If you want to unsubsribe the marketing email, please proceed to
              our{" "}
              <span className="text-blue-800 underline">
                <a href="#">privacy center</a>
              </span>{" "}
            </p>
            <div>We Accept</div>
            <div className="flex gap-4 mt-4">
              {payments.map((methods, index) => (
                <div key={index} className="w-12 h-8">
                  <img
                    src={`/images/paymentMethods/${methods}.png`}
                    alt="payment methods"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
