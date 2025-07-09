import { cn } from "@/utils/helpers"

export const PreLoader = ({ loading }: { loading: boolean }) => {
    return (
        <div className={
            cn(
                "fixed inset-0 flex items-center justify-center bg-[#fff0f5] transition-opacity duration-200",
                loading ? "opacity-100 visibility-visible z-500" : "opacity-0 visibility-hidden -z-500"
            )
        }>
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin" />
                <span className="text-pink-600 text-lg font-semibold tracking-wide animate-pulse">
                    Beautifying you...
                </span>
            </div>
        </div>
    )
}