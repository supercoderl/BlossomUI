import { CosmetologyIcon } from "@/components/Icon/cosmetology";
import { HairIcon } from "@/components/Icon/hair";
import { MakeUpIcon } from "@/components/Icon/makeup";
import { PolishIcon } from "@/components/Icon/polish";

export const services = [
    {
        id: 1,
        label: 'Hair',
        icon: (
            <HairIcon className="w-12 h-12" />
        ),
        href: '#service1'
    },
    {
        id: 2,
        label: 'Makeup',
        icon: (
            <MakeUpIcon className="w-12 h-12" />
        ),
        href: '#service2'
    },
    {
        id: 3,
        label: 'Nails',
        icon: (
            <PolishIcon className="w-12 h-12" />
        ),
        href: '#service4'
    },
    {
        id: 4,
        label: 'Cosmetology',
        icon: (
            <CosmetologyIcon className="w-12 h-12" />
        ),
        href: '#service5'
    }
]