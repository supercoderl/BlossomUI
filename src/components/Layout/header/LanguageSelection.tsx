export const LanguageSelectionHeader = () => {
    return (
        <div className="transition-all duration-300 ease-in-out h-[40px] w-[40px] flex items-center justify-center relative rounded-[5px]">
            <div>
                <img className="w-[27px] h-[20px]" src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-states-flag-icon.png" alt="flag" />
            </div>
            <div className="right-0 min-w-[150px] transition-all duration-300 ease-in-out mt-[15px] p-2.5 absolute text-left opacity-0 visibility-hidden top-[55px] left-auto bg-white shadow-[0_0_10px_-3px_rgba(0,_0,_0,_0.15)] block z-[9] rounded-[5px]">
                <ul>
                    <li><a href="javascript:void(0)"><img className="flag" src="assets/img/flag/us.png" alt="flag" />English</a></li>
                    <li><a href="javascript:void(0)"><img className="flag" src="assets/img/flag/in.png" alt="flag" />Hindi</a></li>
                    <li><a href="javascript:void(0)"><img className="flag" src="assets/img/flag/de.png" alt="flag" /> Deutsch</a></li>
                    <li><a href="javascript:void(0)"><img className="flag" src="assets/img/flag/it.png" alt="flag" />Italian</a></li>
                    <li><a href="javascript:void(0)"><img className="flag" src="assets/img/flag/jp.png" alt="flag" />Japanese</a></li>
                </ul>
            </div>
        </div>
    )
}