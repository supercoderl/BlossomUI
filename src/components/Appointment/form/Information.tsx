import { cn } from "@/utils/helpers";
import styles from '../index.module.css';
import { Dispatch, SetStateAction, useState } from "react";
import {
    DownOutlined
} from '@ant-design/icons'

const Information = ({
    information, setInformation
}: {
    information: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    },
    setInformation: Dispatch<SetStateAction<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }>>
}) => {
    const [selectedCountry, setSelectedCountry] = useState({
        code: 'VN',
        dialCode: '+84',
        flag: '🇻🇳',
        name: 'Vietnam'
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const countries = [
        { code: 'VN', dialCode: '+84', flag: '🇻🇳', name: 'Vietnam' },
        { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
        { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
        { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
        { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
        { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: 'KR', dialCode: '+82', flag: '🇰🇷', name: 'South Korea' },
        { code: 'CN', dialCode: '+86', flag: '🇨🇳', name: 'China' },
        { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
        { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' }
    ];

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <div className={
                cn(
                    "block text-[15px] mb-6 w-full",
                    styles.fadeIn
                )
            } style={{ animationDelay: '0ms', animationDuration: '600ms' }}>
                <label htmlFor="firstName" className="relative pl-2.5 text-left text-[15px] m-0 before:absolute before:top-0 before:left-0 before:text-[#B4190F] before:content-['*'] before:mr-[4px]">
                    <span className="inline-block font-medium mb-[4px]">First Name:</span>
                </label>
                <div className="flex flex-wrap items-center relative text-[15px] min-w-0">
                    <div className="w-full relative">
                        <div className="w-full min-w-full max-w-full">
                            <input
                                className="w-full h-[40px] text-[15px] border border-solid border-[#D1D5D7] text-[#1A2C37] bg-white rounded-[6px] py-2 px-3 transition-box-shadow duration-150"
                                value={information.firstName}
                                onChange={(e) => setInformation(prev => ({ ...prev, firstName: e.target.value }))}
                                name="firstName"
                                type="text"
                                autoComplete="off"
                                aria-label=""
                                placeholder="Enter first name"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={
                cn(
                    "block text-[15px] mb-6 w-full relative",
                    styles.fadeIn
                )
            } style={{ animationDelay: '100ms', animationDuration: '600ms' }}>
                <label htmlFor="lastName" className="relative pl-2.5 text-left text-[15px] m-0 before:absolute before:top-0 before:left-0 before:text-[#B4190F] before:content-['*'] before:mr-[4px]">
                    <span className="inline-block font-medium mb-[4px]">Last Name:</span>
                </label>
                <div className="flex flex-wrap items-center relative text-[15px] min-w-0">
                    <div className="w-full relative">
                        <div className="w-full min-w-full max-w-full">
                            <input
                                className="w-full h-[40px] text-[15px] border border-solid border-[#D1D5D7] text-[#1A2C37] bg-white rounded-[6px] py-2 px-3 transition-box-shadow duration-150"
                                value={information.lastName}
                                onChange={(e) => setInformation(prev => ({ ...prev, lastName: e.target.value }))}
                                name="lastName"
                                type="text"
                                autoComplete="off"
                                aria-label=""
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={
                cn(
                    "block text-[15px] mb-6 w-full relative",
                    styles.fadeIn
                )
            } style={{ animationDelay: '200ms', animationDuration: '600ms' }}>
                <label htmlFor="email" className="relative pl-2.5 text-left text-[15px] m-0">
                    <span className="inline-block font-medium mb-[4px]">Email:</span>
                </label>
                <div className="flex flex-wrap items-center relative text-[15px] min-w-0">
                    <div className="w-full relative">
                        <div className="w-full min-w-full max-w-full">
                            <input
                                className="w-full h-[40px] text-[15px] border border-solid border-[#D1D5D7] text-[#1A2C37] bg-white rounded-[6px] py-2 px-3 transition-box-shadow duration-150"
                                name="email"
                                type="email"
                                value={information.email}
                                onChange={(e) => setInformation(prev => ({ ...prev, email: e.target.value }))}
                                autoComplete="off"
                                aria-label=""
                                placeholder="Enter email"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={
                cn(
                    "z-10 mb-6 block text-[15px] w-full",
                    styles.fadeIn
                )
            } style={{ animationDelay: '300ms', animationDuration: '600ms' }}>
                <label htmlFor="phone" className="relative pl-2.5 text-left text-[15px] m-0">
                    <span className="inline-block font-medium mb-[4px]">Phone:</span>
                </label>
                <div className="flex flex-wrap items-center relative text-[15px] min-w-0">
                    <div className="relative w-full">
                        <div className={`
                            flex border rounded-lg overflow-hidden transition-all duration-200
                            ${isFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'}
                            hover:border-gray-400
                        `}>
                            {/* Country Selector */}
                            <div className="">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex gap-1 items-center px-3 py-2 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors duration-200 h-full"
                                >
                                    <span className="text-xs font-medium text-gray-700">
                                        {selectedCountry.dialCode}
                                    </span>
                                    <DownOutlined
                                        className={`text-[8px] text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* Dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {countries.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                onClick={() => handleCountrySelect(country)}
                                                className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors duration-150"
                                            >
                                                <span className="text-lg mr-3">{country.flag}</span>
                                                <div className="flex-1 text-left">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {country.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {country.dialCode}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Phone Input */}
                            <div className="flex-1 relative">
                                <input
                                    type="tel"
                                    value={information.phone}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                                        setInformation(prev => ({ ...prev, phone: value }))
                                    }}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Enter phone number"
                                    className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information;