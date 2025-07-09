import Icon from "@ant-design/icons";
import { GetProps } from "antd";
import { HairIcon } from "./hair";
import { MakeUpIcon } from "./makeup";
import { PolishIcon } from "./polish";
import { CosmetologyIcon } from "./cosmetology";

type CustomIconComponentProps = GetProps<typeof Icon>;

const TicketSvg = () => (
    <svg fill="#000000" width="1em" height="1em" viewBox="0 0 24 24" id="ticket" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" className="icon line-color">
        <path id="secondary" d="M10,5V7m0,10v2m0-6V11" style={{ fill: 'none', stroke: 'rgb(44, 169, 188)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></path>
        <path id="primary" d="M18,12a3,3,0,0,0,3,3v3a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V15A3,3,0,0,0,3,9V6A1,1,0,0,1,4,5H20a1,1,0,0,1,1,1V9A3,3,0,0,0,18,12Z" style={{ fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 1.5 }}></path>
    </svg>
)

export const TicketIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={TicketSvg} {...props} />
);

export const iconMap: Record<string, React.ElementType> = {
  HairIcon,
  MakeUpIcon,
  PolishIcon,
  CosmetologyIcon
};