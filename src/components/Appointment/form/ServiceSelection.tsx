import {
    DownOutlined
} from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../index.module.css';
import { cn } from '@/utils/helpers';
import { Service, ServiceOption } from '@/types/service';
import { TechnicianInfo } from '@/types/user';
import { getServices } from '@/app/[locale]/service/api';
import { getTechnicians } from '@/app/[locale]/user/api';
import { formatter } from '@/utils/currency';
import { MessageInstance } from 'antd/es/message/interface';

const ServiceSelection = ({
    selectedService,
    setSelectedService,
    selectedEmployee,
    setSelectedEmployee,
    messageApi
}: {
    selectedService: (Service & { type: 'service' }) | (ServiceOption & { type: 'option' }) | null;
    setSelectedService: Dispatch<SetStateAction<(Service & { type: 'service' }) | (ServiceOption & { type: 'option' }) | null>>;
    selectedEmployee: TechnicianInfo | null;
    setSelectedEmployee: Dispatch<SetStateAction<TechnicianInfo | null>>,
    messageApi: MessageInstance
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownEmployeeRef = useRef<HTMLDivElement>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [technicians, setTechnicians] = useState<TechnicianInfo[]>([]);

    const onLoad = async () => {
        try {
            const [serviceRes, technicianRes] = await Promise.all([
                getServices({
                    query: {
                        page: 1,
                        pageSize: 50
                    }
                }),
                getTechnicians({})
            ]);

            const services = serviceRes?.data?.items || [];
            const technicians = technicianRes?.data?.items || [];

            if (services.length > 0) {
                setServices(services);
            }

            if (technicians.length > 0) {
                setTechnicians(technicians);
            }
        }
        catch {
            messageApi.error("Request failed, please reload the page.");
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
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
    };

    const handleSelectEmployeeBoxClick = () => {
        setIsEmployeeOpen(!isOpen);
    };

    const handleEmployeeClick = (employee: TechnicianInfo) => {
        setSelectedEmployee(employee);
    };

    const handleServiceSelect = (serviceOption: ServiceOption) => {
        setSelectedService({ ...serviceOption, type: 'option' });
        setIsOpen(false);
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
                        {selectedService?.type === 'service' ? selectedService?.name : selectedService?.type === 'option' ? selectedService?.variantName : 'Select Service'}
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
                                    <span className="text-sm font-medium text-gray-700">Service</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {services.map(service => (
                                        <div
                                            key={service.id}
                                            className={`px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100 transition-colors ${selectedService?.type === "service" ? selectedService.id : selectedService?.type === "option" ? selectedService.serviceOptionId : "" === service.id ? 'bg-gray-200' : ''
                                                }`}
                                            onClick={() => setSelectedService({ ...service, type: 'service' })}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">{service.name}</span>
                                                <span className={
                                                    cn(
                                                        "text-xs",
                                                        service.options.length <= 0 && Number(service.price ?? 0) > 0 ? "text-black" : "text-gray-400"
                                                    )
                                                }>({service.options.length > 0 ? service.options.length : formatter().format(service?.price ?? 0)})</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Services Column */}
                            <div className="bg-white">
                                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Options</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {selectedService && selectedService?.type === 'service' && selectedService.options.length > 0 ? (
                                        selectedService.options.map((service, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                                onClick={() => handleServiceSelect(service)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-700">{service.variantName}</span>
                                                    <span className="text-sm font-medium text-gray-900">{service.priceFrom}{Number(service.priceTo) > 0 && `/${service.priceTo}`}</span>
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
                        {selectedEmployee?.fullName || 'Select Employee'}
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
                                    {technicians.map(technician => (
                                        <div
                                            key={technician.id}
                                            className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleEmployeeClick(technician)}
                                        >
                                            <div className="flex gap-x-2 items-center">
                                                <img
                                                    src='https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg'
                                                    alt=''
                                                    className='w-[32px] h-[32px] rounded-full'
                                                />
                                                <span className="text-sm text-gray-700">{technician.fullName}</span>
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