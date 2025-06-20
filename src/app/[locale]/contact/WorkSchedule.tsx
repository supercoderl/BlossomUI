const WorkSchedule = () => {
    return (
        <section className="py-[100px] relative">
            <div className="h-full w-full absolute top-0 left-0"></div>
            <div className="max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="flex relative w-full flex-wrap content-start">
                        <div className="mb-2.5 w-full">
                            <div className="">
                                <div className="grid grid-cols-3 text-center">
                                    <div className="mb-[50px]">
                                        <div className="mb-[19px]">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="11.5" y="2.5" width="24" height="43" rx="1.5" fill="#F6EBE7" stroke="black"></rect><rect x="20" y="7" width="7" height="1" fill="black"></rect><circle cx="23.5" cy="39.5" r="1.5" fill="black"></circle></svg>
                                        </div>
                                        <h6 className="mb-2.5 text-[20px] font-medium">Contact</h6>
                                        <div className="text-center text-[16px]">
                                            <p className="m-0">T: 070 9485 7568<br />info@beautysalon.com</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px]">
                                        <div className="mb-[19px]">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24.5" cy="24.5" r="19" fill="#F6EBE7" stroke="black"></circle><path d="M24 12.5V25.5L30 31.5" stroke="black"></path></svg>
                                        </div>
                                        <h6 className="mb-2.5 text-[20px] font-medium">Hours</h6>
                                        <div className="text-center text-[16px]">
                                            <p className="m-0">Mon to Fri: 7:30 am — 1:00 am<br />Sat: 9:00 am — 1:00 am<br />Sun: 9:00 am — 11:30 pm</p>
                                        </div>
                                    </div>
                                    <div className="mb-[50px]">
                                        <div className="mb-[19px]">
                                            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M39.5 18.5C39.5 22.9086 37.6893 26.8697 34.714 31.1637C32.7635 33.9788 30.3434 36.8965 27.6388 40.1573C26.3183 41.7493 24.93 43.4232 23.4953 45.2068C22.2962 43.7506 21.1349 42.3668 20.022 41.0407C16.9832 37.4197 14.3051 34.2285 12.2027 31.1656C9.2574 26.8745 7.5 22.9121 7.5 18.5C7.5 9.66344 14.6634 2.5 23.5 2.5C32.3366 2.5 39.5 9.66344 39.5 18.5Z" fill="#F6EBE7" stroke="black"></path><circle cx="23.5" cy="17.5" r="6" fill="white" stroke="black"></circle></svg>
                                        </div>
                                        <h6 className="mb-2.5 text-[20px] font-medium">Location</h6>
                                        <div className="text-center text-[16px]">
                                            <p className="m-0">85 Royal Mint Street,<br />London, E1 8LG, UK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <div className="">
                                <div className="text-center">
                                    <a href="" className="text-[14px] font-medium text-center uppercase inline-block border border-solid border-black text-black py-[14px] px-[31px] bg-transparent transition duration-300 hover:bg-black hover:text-white">Book Appointment</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkSchedule;