import { Search } from "lucide-react"

export const SearchBarHeader = () => {
    return (
        <div>
            <a
                href="javascript:void(0)"
                className="hidden"
            >
                <i className="ri-search-line"></i>
            </a>
            <form className="bg-transparent">
                <input
                    className="min-w-[300px] h-[40px] px-[15px] border border-solid border-[#eee] rounded-[5px] bg-white outline-none"
                    type="text"
                    placeholder="Search..."
                />
                <a
                    href="javascript:void(0)"
                    className="w-[30px] h-[30px] absolute top-1/2 right-[5px] flex items-center -translate-y-1/2"
                >
                    <Search className='w-[18px] h-[18px] text-[#9799a7]' />
                </a>
            </form>
        </div>
    )
}