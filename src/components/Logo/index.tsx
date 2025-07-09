import { cn } from "@/utils/helpers"

export const Logo = ({ isDark }: { isDark: boolean }) => {
    return (
        <p className={
            cn(
                "text-2xl group-hover:text-black",
                isDark ? "text-black" : "text-white"
            )
        }>Blossom Nails</p>
    )
}