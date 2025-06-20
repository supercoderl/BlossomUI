import { cn } from "@/utils/helpers";
import styles from '../index.module.css';

const RightContentSubmit = () => {
    return (
        <div className="p-4 h-[calc(100%_-_56px)] block overflow-x-hidden">
            <div className="mt-[22px] flex flex-col items-center mb-4">
                <img
                    src="/congratulations.svg"
                    className={
                        cn(
                            'w-[54px] mb-2',
                            styles.slideUp
                        )
                    }
                    style={{ animationDelay: '0ms' }}
                />
                <p className={
                    cn(
                        "mb-[2px] font-medium text-[18px] text-[#33434C]",
                        styles.slideUp
                    )
                }
                    style={{ animationDelay: '100ms' }}
                >Congratulations</p>
                <span className={
                    cn(
                        'text-[rgba(51,_67,_76,_0.4)] text-[13px]',
                        styles.slideUp
                    )
                }
                    style={{ animationDelay: '200ms' }}
                >Appointment ID #1148</span>
            </div>
            <div className="bg-white">
                <div className="">
                    <div className={
                        cn(
                            'flex justify-between text-[14px] mb-3',
                            styles.slideUp
                        )
                    }
                        style={{ animationDelay: '0ms' }}
                    >
                        <span className='text-[rgba(26,_44,_55,_0.4)]'>Date:</span>
                        <span className='text-[#1A2C37]'>June 20, 2025</span>
                    </div>
                    <div className={
                        cn(
                            'flex justify-between text-[14px] mb-3',
                            styles.slideUp
                        )
                    }
                        style={{ animationDelay: '100ms' }}
                    >
                        <span className='text-[rgba(26,_44,_55,_0.4)]'>Local Time:</span>
                        <span className='text-[#1A2C37]'>9:00 AM</span>
                    </div>
                    <div className={
                        cn(
                            'flex justify-between text-[14px] mb-3',
                            styles.slideUp
                        )
                    }
                        style={{ animationDelay: '200ms' }}>
                        <span className='text-[rgba(26,_44,_55,_0.4)]'>Service:</span>
                        <span className='text-[#1A2C37]'>Classic Haircut</span>
                    </div>
                    <div className={
                        cn(
                            'flex justify-between text-[14px] mb-3',
                            styles.slideUp
                        )
                    }
                        style={{ animationDelay: '300ms' }}>
                        <span className='text-[rgba(26,_44,_55,_0.4)]'>Employee:</span>
                        <span className='text-[#1A2C37]'>Helen Simpson</span>
                    </div>
                    <div className={
                        cn(
                            'flex justify-between text-[14px] mb-3',
                            styles.slideUp
                        )
                    }
                        style={{ animationDelay: '400ms' }}>
                        <span className='text-[rgba(26,_44,_55,_0.4)]'>Payment:</span>
                        <span className='text-[#1A2C37]'>$39.00 - On-site</span>
                    </div>
                    <div className={
                        cn(
                            "flex justify-between text-[14px] mb-3 border-t border-solid border-[rgba(26,_44,_55,_0.3)] pt-4",
                            styles.slideUp
                        )
                    }
                        style={{ animationDelay: '500ms' }}>
                        <span className='text-[rgba(26,_44,_55,_0.4)]'>Your Name:</span>
                        <span className='text-[#1A2C37]'>aa aaaa</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightContentSubmit;