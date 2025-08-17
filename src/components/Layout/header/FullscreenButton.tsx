import { Maximize, Minimize } from "lucide-react"

export const FullscreenButtonHeader = ({
    toggleFullscreen,
    isFullscreen
} : {
    toggleFullscreen: () => void,
    isFullscreen: boolean
}) => {
    return (
        <a
            className="flex w-[40px] h-[40px] items-center justify-center rounded-[5px] transition-all duration-300 ease-in-out hover:bg-gray-200"
            href="javascript:void(0)"
            onClick={toggleFullscreen}
        >
            {
                isFullscreen ?
                    <Minimize className='w-[20px] h-[20px] text-[#485568]' />
                    :
                    <Maximize className='w-[20px] h-[20px] text-[#485568]' />
            }
        </a>
    )
}