import { languages } from "@/data/language"

export const LanguageSelectionHeader = () => {
    return (
        <div className="group transition-all duration-300 ease-in-out h-[40px] w-[40px] flex items-center justify-center relative rounded-[5px] hover:bg-gray-200">
            <div>
                <img className="w-[27px] h-[20px]" src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-states-flag-icon.png" alt="flag" />
            </div>
            <div className="right-0 min-w-[150px] transition-all duration-300 ease-in-out mt-[15px] p-2.5 absolute text-left opacity-0 visibility-hidden top-[55px] left-auto bg-white shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] block z-[-1] rounded-[5px] group-hover:opacity-100 group-hover:visibility-visible group-hover:top-[35px] group-hover:z-[9]">
                <ul>
                    {
                        languages.map(item => (
                            <li
                                className="text-[#777] text-[14px] leading-[21px] hover:bg-gray-200 rounded-[5px] transition-all duration-300 ease-in-out"
                                key={item.id}
                            >
                                <a href="javascript:void(0)" className="w-full py-[5px] px-2.5 flex rounded-[5px] text-[#777] text-[13px] items-center">
                                    <img
                                        className="w-[20px] h-full mr-2.5 border border-solid border-[#eee]"
                                        src={item.icon}
                                        alt="flag"
                                    />
                                    {item.title}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}