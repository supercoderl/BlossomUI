export const EmployeeListItemSkeleton = () => {
    return (
        <li className="mb-[5px] border border-solid rounded-[5px] transition-background-color duration-300 ease flex items-center justify-between relative p-2.5 bg-gray-100 border-gray-200 animate-pulse">
            <div className="mr-auto">
                {/* Full name placeholder */}
                <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                {/* Experience placeholder */}
                <div className="flex items-center">
                    <div className="h-3 bg-gray-300 rounded w-8"></div>
                    <div className="h-3 bg-gray-300 rounded w-4 ml-1"></div>
                </div>
            </div>
            <div className="flex">
                {/* Avatar placeholder */}
                <div className="h-[35px] w-[35px] flex items-center justify-center rounded-full border-2 border-solid border-gray-200 bg-gray-300 overflow-hidden">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        </li>
    );
};