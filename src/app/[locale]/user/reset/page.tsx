"use client";

import { useGlobalMessage } from "@/providers/messageProvider";
import { Button } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";
import { resetPassword } from "../api";
import { useApiLoadingStore } from "@/stores/loadingStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = useMemo(() => {
        return searchParams.get('code');
    }, [searchParams]);

    const onSubmit = async () => {
        if (newPassword !== confirmPassword) {
            messageApi.error("Passwords do not match.");
            return;
        }

        if (!code) {
            messageApi.error("Invalid reset code.");
            return;
        }

        try {
            await resetPassword(code, newPassword).then(() => {
                messageApi.success("Password reset successfully. You can now log in with your new password.");
                router.push("/user/login");
            });
        }
        catch (error: any) {
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
                            <h3 className="text-center text-[1.5rem] text-center mb-6 mt-3">Reset password</h3>
                            <p className="text-[rgba(33,_37,_41,_0.75)] text-center mb-6 leading-[1.8]">Enter new password and resubmit it.</p>
                            <form id="forgotForm" method="post">
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="py-[0.81rem] px-[0.96rem] border-[#dae1e3] shadow-[inset_0_0] block w-full text-[1rem] leading-[1.5] text-[#4c4d4d] appearance-none bg-white border border-solid border-[#dee2e6] rounded-[10px] transition-border duration-150 ease-in-out outline-none focus:border-[#0d6efd]"
                                        id="password"
                                        required
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="py-[0.81rem] px-[0.96rem] border-[#dae1e3] shadow-[inset_0_0] block w-full text-[1rem] leading-[1.5] text-[#4c4d4d] appearance-none bg-white border border-solid border-[#dee2e6] rounded-[10px] transition-border duration-150 ease-in-out outline-none focus:border-[#0d6efd]"
                                        id="confirmPassword"
                                        required
                                        placeholder="Enter Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="my-6 grid">
                                    <Button
                                        id="antd-button"
                                        type="primary"
                                        size="large"
                                        className="!h-12 font-medium transition-all duration-500 ease"
                                        onClick={onSubmit}
                                        loading={loading['reset-password']}
                                        disabled={loading['reset-password']}
                                    >
                                        Submit
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