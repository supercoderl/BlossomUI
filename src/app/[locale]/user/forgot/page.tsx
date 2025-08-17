"use client";

import { useGlobalMessage } from "@/providers/messageProvider";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "../api";
import { useApiLoadingStore } from "@/stores/loadingStore";

export default function ForgotPassword() {
    const [identifier, setIdentifier] = useState("");
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    const onSubmit = async () => {
        try {
            await forgotPassword(identifier).then(() => {
                messageApi.success("Password reset link sent to your email.");
            });
        } catch (error: any) {
            console.error('Forgot password error:', error);
            if (error && error.response && error.response.data) {
                const errors = error.response.data.errors;
                if (errors && errors.length > 0) {
                    errors.forEach((error: any) => {
                        messageApi.error(error || 'Request failed');
                    })
                }
            }
            else {
                messageApi.error("Request failed, please try again later");
            }
        }
    }

    return (
        <div id="main-wrapper" className="flex flex-col min-h-screen bg-white">
            <div className="my-auto max-w-[1280px] px-3 mx-auto">
                <div className="flex -mx-3">
                    <div className="my-6 mx-auto w-[85%] px-3">
                        <div className="p-12 rounded-[10px] border border-[#dee2e6] border-solid">
                            <div className="mb-6">
                                <Link className="flex justify-center" href="/" title="Oxyy">
                                    <img className="w-1/2 h-auto" src="/Rimberio.png" alt="Oxyy" />
                                </Link>
                            </div>
                            <h3 className="text-center text-[1.5rem] text-center mb-6 mt-3">Forgot password?</h3>
                            <p className="text-[rgba(33,_37,_41,_0.75)] text-center mb-6 leading-[1.8]">Enter the email address or mobile number associated with your account.</p>
                            <form id="forgotForm" method="post">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="py-[0.81rem] px-[0.96rem] border-[#dae1e3] shadow-[inset_0_0] block w-full text-[1rem] leading-[1.5] text-[#4c4d4d] appearance-none bg-white border border-solid border-[#dee2e6] rounded-[10px] transition-border duration-150 ease-in-out outline-none focus:border-[#0d6efd]"
                                        id="emailAddress"
                                        required
                                        placeholder="Enter Email or Mobile Number"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>
                                <div className="my-6 grid">
                                    <Button
                                        id="antd-button"
                                        type="primary"
                                        size="large"
                                        className="!h-12 font-medium transition-all duration-500 ease"
                                        onClick={onSubmit}
                                        loading={loading['forgot-password']}
                                        disabled={loading['forgot-password']}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </form>
                            <div className="flex items-center mb-6">
                                <hr className="opacity-[0.2] grow-1 my-4 border-t border-solid" />
                                <span className="text-[rgba(33,_37,_41,_0.75)] mx-2">or</span>
                                <hr className="opacity-[0.2] grow-1 my-4 border-t border-solid" />
                            </div>
                            <div className="grid bg-white">
                                <Link
                                    className="py-[0.8rem] px-[2.6rem] text-gray-500 font-medium transition-all duration-500 ease border border-solid border-[#dee2e6] inline-block text-[1rem] leading-[1.5] text-center cursor-pointer rounded-[10px] bg-[rgb(248,_249,_250)] hover:bg-gray-300"
                                    href="/user/login"
                                >
                                    Return to Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}