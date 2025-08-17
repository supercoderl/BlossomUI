import { userOptions } from "@/data/dashboard"
import { UserCookieInfo } from "@/types/user"
import { LogOut } from "lucide-react"
import Link from "next/link"

export const UserMenuHeader = ({
    userInfo
} : {
    userInfo?: UserCookieInfo | null
}) => {
    return (
        <div className="group transition-all duration-300 ease-in-out h-[40px] w-[40px] flex items-center justify-center relative rounded-[5px]">
            <div>
                <img className="w-[35px] h-[35px] rounded-[5px]" src={userInfo?.avatarUrl ?? 'https://cdn1.iconfinder.com/data/icons/emoticon-of-avatar-woman/128/08_woman_mocking_avatar_emoticon_smiley_people_user-512.png'} alt="user" />
            </div>
            <div className="right-0 transition-all duration-300 ease-in-out min-w-[200px] mt-[15px] p-2.5 absolute text-left opacity-0 visibility-hidden top-[55px] left-auto bg-white shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] block z-[-1] rounded-[5px] group-hover:opacity-100 group-hover:visibility group-hover:z-[9] group-hover:top-[35px]">
                <div className="pt-2.5 px-2.5">
                    <h6 className='m-0 text-[13px] font-semibold leading-normal'>
                        {userInfo?.firstName + ' ' + userInfo?.lastName}
                    </h6>
                    <p className='m-0 text-[12px] text-[#777] leading-[28px]'>
                        {userInfo?.email ?? "admin@gmail.com"}
                    </p>
                </div>
                <ul className="mt-[15px] pt-2.5 border-t border-solid border-[#eee]">
                    {
                        userOptions.map(item => (
                            <li
                                key={item.id}
                                className='text-[#777] text-[14px] leading-[21px] tracking-[0.03rem] rounded-[5px] transition-all duration-300 ease-in-out hover:bg-gray-200'
                            >
                                <a
                                    href={item.url}
                                    className='w-full py-[5px] px-2.5 flex rounded-[5px] text-[#777] text-[13px] items-center'
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <ul className="mt-[15px] pt-2.5 border-t border-solid border-[#eee]">
                    <li className='text-[14px] text-[#777] leading-[21px] tracking-[0.03rem] rounded-[5px] transition-all duration-300 ease-in-out hover:bg-gray-200'>
                        <Link
                            href="user/login"
                            className='w-full py-[5px] px-2.5 flex rounded-[5px] text-[#777] text-[13px] items-center'
                        >
                            <LogOut className='w-[16px] h-[16px] mr-[5px]' />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}