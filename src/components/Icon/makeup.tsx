import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const MakeUpSvg = () => (
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 512 512" xmlSpace="preserve">
		<circle style={{ fill: "#FF9690" }} cx="218.762" cy="266.66" r="170.862" />
		<circle style={{ fill: "#FD3B6D" }} cx="218.762" cy="266.66" r="124.527" />
		<g>
			<circle style={{ fill: "#FF738E" }} cx="151.831" cy="284.789" r="11.584" />
			<circle style={{ fill: "#FF738E" }} cx="190.868" cy="314.073" r="11.584" />
		</g>
		<path style={{ fill: "#FC7576" }} d="M47.903,107.387h341.724C389.627-35.796,47.903-35.796,47.903,107.387z" />
		<path style={{ fill: "#FFD37D" }} d="M339.574,512c-68.663,0-124.525-55.862-124.525-124.525s55.862-124.525,124.525-124.525
	c68.665,0,124.525,55.862,124.525,124.525S408.239,512,339.574,512z"/>
	</svg>
)

export const MakeUpIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={MakeUpSvg} {...props} />
);