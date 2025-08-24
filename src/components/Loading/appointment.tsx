import { Crown, User, Clock, Ellipsis } from "lucide-react";

export const AppointmentCardSkeleton = () => {
    return (
        <div className="p-4 rounded-[5px] bg-gray-200 mb-4 animate-pulse">
            {/* Header section */}
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                    <Crown className="w-[16px] h-[16px] text-gray-400" />
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="flex items-center">
                    <div className="rounded-[8px] relative inline-flex">
                        <Ellipsis className="w-[16px] h-[16px] text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Technician section */}
            <div className="flex gap-1 items-center">
                <User className="w-[16px] h-[16px] text-gray-400" />
                <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>

            {/* Footer section */}
            <div className="mt-4 flex items-center justify-between">
                <div className="h-6 bg-gray-300 rounded w-28"></div>
                <div className="flex items-center">
                    <Clock className="w-[16px] h-[16px] text-gray-400" />
                    <div className="h-3 bg-gray-300 rounded w-20 ml-1"></div>
                </div>
            </div>
        </div>
    );
};