import { MoonStar, Sun } from "lucide-react"

export const ThemeChangerHeader = ({
    toggleTheme,
    curTheme
} : {
    toggleTheme: () => void,
    curTheme: boolean
}) => {
    return (
        <a
            className="flex w-[40px] h-[40px] items-center justify-center rounded-[5px] transition-all duration-300 ease-in-out hover:bg-gray-200"
            href="javascript:void(0)"
            onClick={toggleTheme}
        >
            {
                curTheme ?
                    <Sun className='w-[20px] h-[20px] text-[#485568]' />
                    :
                    <MoonStar className='w-[20px] h-[20px] text-[#485568]' />
            }
        </a>
    )
}