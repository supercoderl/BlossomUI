import {
    AppleOutlined,
    FacebookOutlined,
    GoogleOutlined,
    YahooOutlined
} from '@ant-design/icons';

const LeftContentSubmit = () => {
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
            <div className="">
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
        </div>
    )
}

export default LeftContentSubmit;