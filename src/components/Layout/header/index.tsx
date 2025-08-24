import { UserCookieInfo } from '@/types/user';
import { useState } from 'react';
import { SearchBarHeader } from './SearchBar';
import { LanguageSelectionHeader } from './LanguageSelection';
import { AppsMenuHeader } from './AppsMenu';
import { FullscreenButtonHeader } from './FullscreenButton';
import { NotificationHeader } from './Notification';
import { ThemeChangerHeader } from './ThemeChanger';
import { UserMenuHeader } from './UserMenu';
import { Notification } from '@/types/notification';

export const AdminHeader = ({
    curTheme,
    userInfo,
    ref,
    toggleTheme,
    loading,
    notifications
}: {
    curTheme: boolean,
    userInfo?: UserCookieInfo | null,
    ref: React.RefObject<HTMLDivElement>,
    toggleTheme: () => void,
    loading: boolean,
    notifications: Notification[]
}) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(!!document.fullscreenElement);

    const toggleFullscreen = () => {
        if (ref.current) {
            if (isFullscreen) {
                document.exitFullscreen?.();
                setIsFullscreen(false);
            } else {
                ref.current.requestFullscreen?.();
                setIsFullscreen(true);
            }
        }
    };

    return (
        <div className="px-3 w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="relative">
                        {/* Search bar */}
                        <SearchBarHeader />
                    </div>
                </div>
                <div className="h-[70px] flex items-center space-x-2">
                    {/* Language selection */}
                    <LanguageSelectionHeader />

                    {/* Apps menu */}
                    <AppsMenuHeader />

                    {/* Fullscreen button */}
                    <FullscreenButtonHeader
                        toggleFullscreen={toggleFullscreen}
                        isFullscreen={isFullscreen}
                    />

                    {/* Notification */}
                    <NotificationHeader
                        notifications={notifications}
                    />

                    {/* Theme changer */}
                    <ThemeChangerHeader
                        toggleTheme={toggleTheme}
                        curTheme={curTheme}
                    />

                    <div className="ml-[5px]">
                        {/* User menu */}
                        <UserMenuHeader
                            userInfo={userInfo}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}