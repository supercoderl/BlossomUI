import { cn } from "@/utils/helpers";
import styles from "../index.module.css";
import { TicketIcon } from "@/components/Icon";
import { Dispatch, SetStateAction, useState } from "react";
import { checkPromotion } from "@/app/[locale]/promotion/api";
import { MessageInstance } from "antd/es/message/interface";
import { PromotionChecker } from "@/types/promotion";
import { Service, ServiceOption } from "@/types/service";
import { getTotalPriceValue } from "@/utils/text";

const Confirmation = ({
    loading,
    messageApi,
    selectedService,
    promotion,
    setPromotion
}: {
    loading: Record<string, boolean>,
    messageApi: MessageInstance,
    selectedService: (Service & {
        type: "service";
    }) | (ServiceOption & {
        type: "option";
    }) | null,
    promotion: PromotionChecker | null,
    setPromotion: Dispatch<SetStateAction<PromotionChecker | null>>
}) => {
    const [code, setCode] = useState('');

    const handleCheck = async () => {
        if (code) {
            await checkPromotion(code).then((res: any) => {
                if (!res.data.isValid) {
                    messageApi.error("Your code is invalid, please input another code");
                    return;
                }

                setPromotion(res.data);
                messageApi.success("Apply promotion successfully!");
            });
            setCode("");
        }
    }

    return (
        <div className="">
            <div className={
                cn(
                    "text-[15px] font-medium text-[#1A2C37] mb-[4px]",
                    styles.fadeIn
                )
            } style={{ animationDelay: '0ms', animationDuration: '600ms' }}>
                <span className="">Summary</span>
            </div>
            <div className={
                cn(
                    "border border-solid border-[rgba(26,_44,_55,_0.2)] rounded-[8px] p-4 mb-4",
                    styles.fadeIn
                )
            } style={{ animationDelay: '100ms', animationDuration: '600ms' }}>
                <div className="">
                    <div className="">
                        <div className={
                            cn(
                                "border border-solid border-[rgba(26,_44,_55,_0.3)] rounded-[8px] p-3",
                                styles.fadeIn
                            )
                        } style={{ animationDelay: '0ms', animationDuration: '600ms' }}>
                            <div className="">
                                <span className="text-[12px] font-medium text-[rgba(26,_44,_55,_0.6)]">Services</span>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-between transition-all duration-300 ease-in-out">
                                    <p className="text-[13px] font-medium text-[#1A2C37] m-0">classNameic Haircut ({getTotalPriceValue(selectedService?.type === "service" ? (selectedService?.price ?? 0) : selectedService?.type === "option" ? selectedService?.priceFrom : 0).label})
                                        <span>x 1 person</span>
                                    </p>
                                    <p className="whitespace-nowrap text-[13px] font-medium text-[#1A2C37] m-0">{getTotalPriceValue(selectedService?.type === "service" ? (selectedService?.price ?? 0) : selectedService?.type === "option" ? selectedService?.priceFrom : 0).label}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-between border-b border-dashed border-[rgba(26,_44,_55,_0.3)] pb-4 mt-4">
                            <span className="text-[14px] font-medium text-[#1A2C37]">Subtotal:</span>
                            <span className="whitespace-nowrap text-[14px] font-medium text-[#1A2C37]">{getTotalPriceValue(selectedService?.type === "service" ? (selectedService?.price ?? 0) : selectedService?.type === "option" ? selectedService?.priceFrom : 0).label}</span>
                        </div>
                        <div className="w-full flex my-4 text-[14px] gap-4 text-[#1A2C37] whitespace-nowrap items-center" >
                            <span className="mr-[3px]">Coupon:</span>
                            <div className="w-full relative">
                                <div className="w-full">
                                    <input
                                        className="w-full h-[32px] text-[15px] border border-solid border-[#D1D5D7] text-[#1A2C37] bg-white rounded-[6px] py-[4px] pr-2 pl-[34px] transition-box-shadow duration-150"
                                        name="code"
                                        type="text"
                                        autoComplete="off"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <span className="inline-flex absolute h-full left-[6px] top-0 text-center text-[#c0c4cc] transition-all duration-300">
                                        <span className="items-center inline-flex">
                                            <TicketIcon className="text-[24px] text-[#1A2C37]" />
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <button
                                id=""
                                className="border border-solid border-black inline-flex items-center justify-center h-[32px] text-[14px] whitespace-nowrap rounded-[6px] py-[6px] px-4 transition-all duration-300 ease-in-out bg-black text-white cursor-pointer"
                                type="button"
                                onClick={handleCheck}
                            >
                                <span className="flex items-center justify-center overflow-hidden">Add</span>
                            </button>
                        </div>
                        <div className="hidden">
                            <div className="el-col el-col-24 el-col-xs-4 el-col-sm-2">
                                <div>
                                    <span className="am-icon-coupon-limit"></span>
                                </div>
                            </div>
                            <div className="el-col el-col-24 el-col-xs-20 el-col-sm-22 am-coupon-limit-col">
                                <div className="am-coupon-limit-text">
                                    <strong>Coupon Limit Reached</strong>
                                    <p>Number of appointments with applied coupon is </p>
                                </div>
                            </div>
                        </div>
                        {
                            promotion && (
                                <div className="flex justify-between text-[15px] font-medium text-[#1A2C37]">
                                    <span>Discount:</span>
                                    <span className="whitespace-nowrap text-[14px] font-medium text-[#1A2C37]">{getTotalPriceValue(selectedService?.type === "service" ? (selectedService?.price ?? 0) : selectedService?.type === "option" ? selectedService?.priceFrom : 0, promotion).discountValue}</span>
                                </div>
                            )
                        }
                        <div className="pt-4 flex justify-between text-[15px] font-medium text-[#1A2C37]">
                            <span>Total Amount:</span>
                            <span className="whitespace-nowrap text-[14px] font-medium text-[#1A2C37]">{getTotalPriceValue(selectedService?.type === "service" ? (selectedService?.price ?? 0) : selectedService?.type === "option" ? selectedService?.priceFrom : 0, promotion).label}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="hidden">Payment Method</p>
            <div className={
                cn(
                    "",
                    styles.fadeIn
                )
            } style={{ animationDelay: '300ms', animationDuration: '600ms' }}>
                <div className="am-fs__payments-main-cards"></div>
            </div>
            <div className={
                cn(
                    "flex justify-center mt-[2px]",
                    styles.fadeIn
                )
            } style={{ animationDelay: '400ms', animationDuration: '600ms' }}>
                <p className="inline-flex text-[14px] font-medium">The payment will be done on-site.</p>
            </div>
            <div className={
                cn(
                    "mt-6",
                    styles.fadeIn
                )
            } style={{ animationDelay: '500ms', animationDuration: '600ms' }}>
                <div className="">
                </div>
            </div>
        </div>
    )
}

export default Confirmation;