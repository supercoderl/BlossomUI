export const PreLoader = () => {
    return (
        <div className="fixed inset-0 z-500 flex items-center justify-center bg-[#fff0f5]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin" />
                <span className="text-pink-600 text-lg font-semibold tracking-wide animate-pulse">
                    Beautifying you...
                </span>
            </div>
        </div>
    )
}