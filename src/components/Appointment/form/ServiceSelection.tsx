import {
    DownOutlined
} from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../index.module.css';
import { cn } from '@/utils/helpers';

const ServiceSelection = ({
    selectedService,
    setSelectedService,
    selectedEmployee,
    setSelectedEmployee
}: {
    selectedService: string;
    setSelectedService: Dispatch<SetStateAction<string>>;
    selectedEmployee: string;
    setSelectedEmployee: Dispatch<SetStateAction<string>>
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof serviceData | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownEmployeeRef = useRef<HTMLDivElement>(null);

    const serviceData = {
        Hair: [
            { name: 'Classic Haircut', price: '$39.00' },
            { name: 'Clipper Cut', price: '$39.00' },
            { name: 'Signature Haircut', price: '$49.00' }
        ],
        Makeup: [
            { name: 'Natural Makeup', price: '$45.00' },
            { name: 'Glam Makeup', price: '$65.00' }
        ],
        Brows: [
            { name: 'Eyebrow Shaping', price: '$25.00' }
        ],
        Nails: [
            { name: 'Classic Manicure', price: '$30.00' },
            { name: 'Gel Manicure', price: '$45.00' }
        ],
        Cosmetology: [
            { name: 'Facial Treatment', price: '$60.00' },
            { name: 'Chemical Peel', price: '$80.00' }
        ]
    };

    const employeeData = [
        {
            id: 1,
            name: "asdasd",
            avatar: ""
        },
        {
            id: 2,
            name: "asadadasd",
            avatar: ""
        },
        {
            id: 3,
            name: "asbvababdasd",
            avatar: ""
        }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSelectedCategory(null);
            }

            if (dropdownEmployeeRef.current && !dropdownEmployeeRef.current.contains(event.target)) {
                setIsEmployeeOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectBoxClick = () => {
        setIsOpen(!isOpen);
        setSelectedCategory(null);
    };

    const handleSelectEmployeeBoxClick = () => {
        setIsEmployeeOpen(!isOpen);
    };

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
    };

    const handleEmployeeClick = (employee: any) => {
        setSelectedEmployee(employee);
    };

    const handleServiceSelect = (service: any) => {
        setSelectedService(service.name);
        setIsOpen(false);
        setSelectedCategory(null);
    };

    return (
        <>
            <div className={
                cn(
                    "relative mb-6 z-50",
                    styles.slideUp
                )
            } ref={dropdownRef} style={{ animationDelay: '0ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> Service:
                </label>

                {/* Select Box */}
                <div
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center hover:border-gray-400 transition-colors"
                    onClick={handleSelectBoxClick}
                >
                    <span className={selectedService ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedService || 'Select Service'}
                    </span>
                    <DownOutlined className={`text-gray-400 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className={
                        cn(
                            "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-transform duration-300 ease-out transform",
                            styles.fadeIn
                        )
                    }>
                        <div className="grid grid-cols-2">
                            {/* Categories Column */}
                            <div className="bg-gray-50 border-r border-gray-200">
                                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Category</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {Object.entries(serviceData).map(([category, services]) => (
                                        <div
                                            key={category}
                                            className={`px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100 transition-colors ${selectedCategory === category ? 'bg-gray-200' : ''
                                                }`}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">{category}</span>
                                                <span className="text-xs text-gray-400">({services.length})</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Services Column */}
                            <div className="bg-white">
                                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Service</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {selectedCategory && serviceData[selectedCategory] ? (
                                        serviceData[selectedCategory].map((service, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                                onClick={() => handleServiceSelect(service)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-700">{service.name}</span>
                                                    <span className="text-sm font-medium text-gray-900">{service.price}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                            Select a category to view services
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={
                cn(
                    "relative",
                    styles.slideUp
                )
            } ref={dropdownEmployeeRef} style={{ animationDelay: '0ms' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee:
                </label>

                {/* Select Box */}
                <div
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center hover:border-gray-400 transition-colors"
                    onClick={handleSelectEmployeeBoxClick}
                >
                    <span className={selectedEmployee ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedEmployee || 'Select Employee'}
                    </span>
                    <DownOutlined className={`text-gray-400 text-xs transition-transform ${isEmployeeOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown */}
                {isEmployeeOpen && (
                    <div className={
                        cn(
                            "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-hidden transition-transform duration-300 ease-out transform translate-y-2 opacity-0",
                            styles.fadeIn
                        )
                    }>
                        <div className="grid grid-cols-1">
                            {/* Employees Column */}
                            <div className="bg-white">
                                <div className="max-h-64 overflow-y-auto">
                                    {employeeData.map(item => (
                                        <div
                                            key={item.id}
                                            className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleEmployeeClick(item.name)}
                                        >
                                            <div className="flex gap-x-2 items-center">
                                                <img
                                                    src='https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg'
                                                    alt=''
                                                    className='w-[32px] h-[32px] rounded-full'
                                                />
                                                <span className="text-sm text-gray-700">{item.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ServiceSelection;