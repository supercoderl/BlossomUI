import { cn } from "@/utils/helpers";
import styles from '../index.module.css';

const ConfirmationSkeleton = () => {
    return (
        <div className=" w-full">
            <div className="">
                <div className={
                    cn(
                        "h-[24px] w-[100px]",
                        styles.skeleton
                    )
                }></div>
            </div>
            <div className="items-center py-4">
                <div className="border-b border-dashed border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[28%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[25%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="border-b border-dashed border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[25%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[27%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="border-b border-dashed border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[27%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[25%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="border-b border-dashed border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[27%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[26%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="border-b border-dashed border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[26%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[28%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="border-b border-solid border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[27%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[35%] h-[32px] my-2",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[26%] h-[32px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[26%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[25%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="border-b border-solid border-[rgba(26,_44,_55,_0.2)] py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[28%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[25%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
                <div className="py-[4px] flex justify-between items-center">
                    <div className={
                        cn(
                            "w-[26%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                    <div className={
                        cn(
                            "w-[27%] h-[20px]",
                            styles.skeleton
                        )
                    }>
                    </div>
                </div>
            </div>
            <div className={
                cn(
                    "w-full h-[48px] mt-5",
                    styles.skeleton
                )
            }>
            </div>
            <div className={
                cn(
                    "w-[116px] h-[26px] mt-4",
                    styles.skeleton
                )
            }>
            </div>
            <div className="mt-5 flex justify-between">
                <div className={
                    cn(
                        "w-[30%] h-[48px]",
                        styles.skeleton
                    )
                }>
                </div>
                <div className={
                    cn(
                        "w-[30%] h-[48px]",
                        styles.skeleton
                    )
                }></div>
                <div className={
                    cn(
                        "w-[30%] h-[48px]",
                        styles.skeleton
                    )
                }>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationSkeleton;