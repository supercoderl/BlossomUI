import {
    AppleOutlined,
    CheckCircleOutlined,
    FacebookOutlined,
    FlagOutlined,
    GoogleOutlined,
    YahooOutlined
} from '@ant-design/icons';
import styles from '../index.module.css';
import { cn } from '@/utils/helpers';

const LeftContentSubmit = ({
    isCollapsed
}: {
    isCollapsed: boolean
}) => {
    const socials = [
        {
            icon: GoogleOutlined,
            name: "Google"
        },
        {
            icon: FacebookOutlined,
            name: "Facebook"
        },
        {
            icon: YahooOutlined,
            name: "Yahoo"
        },
        {
            icon: AppleOutlined,
            name: "Apple"
        }
    ]
    return (
        <div>
            <div className={
                cn(
                    isCollapsed ? 'hidden' : 'block'
                )
            }>
                <p className="text-center text-[14px] mb-4">Add to Calendar</p>
                <div className="flex flex-wrap justify-center">
                    <div className="grid grid-cols-2 gap-2 items-center justify-center">
                        {
                            socials.map((item, index) => (
                                <a
                                    href=""
                                    target="_blank"
                                    key={index}
                                    className="flex flex-col text-black justify-center items-center w-[86px] border border-solid border-[rgba(0,_0,_0,_0.1)] rounded-[4px] bg-[rgba(0,_0,_0,_0.05)] py-4 pb-2 shadow-[0_1px_1px_#7386a90f]"
                                >
                                    <div className="flex h-[24px] items-center">
                                        <item.icon className='text-[24px]' />
                                    </div>
                                    <p className='font-medium text-[15px] m-0'>{item.name}</p>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={cn(
                styles.slideRight,
                isCollapsed ? 'block' : 'hidden'
            )} style={{ animationDelay: '0ms', animationDuration: '0.4s' }}>
                <div className="flex items-center justify-between">
                    <div className="relative w-6 h-5 !text-2xl">
                        <FlagOutlined className="block absolute top-1/2 left-1/2 -translate-1/2" />
                    </div>
                    <div className="w-[16px] h-[16px] absolute -bottom-[4px] -right-[4px] border-2 flex items-center justify-center bg-white rounded-full border-solid border-black transition-border duration-300 ease-in-out ml-auto">
                        <CheckCircleOutlined className="absolute w-[14px] h-[14px] !text-[20px] p-[4px] rounded-full bg-red text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftContentSubmit;