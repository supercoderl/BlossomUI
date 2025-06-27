import Icon from "@ant-design/icons";
import { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const CosmetologySvg = () => (
	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 420 420" xmlSpace="preserve">
		<g id="XMLID_291_">
			<polygon id="XMLID_292_" style={{ fill: "#E9A440" }} points="80,0 100,300 100,420 320,420 320,300 340,0 	" />
			<g id="XMLID_293_">
				<path id="XMLID_294_" style={{ fill: "#F6E27D" }} d="M210,205c-24.813,0-45-20.186-45-45s20.187-45,45-45c24.814,0,45,20.186,45,45
			S234.814,205,210,205z"/>
			</g>
			<g id="XMLID_296_">
				<rect id="XMLID_297_" x="270" y="145" style={{ fill: "#F6E27D" }} width="30" height="30" />
			</g>
			<g id="XMLID_298_">

				<rect id="XMLID_299_" x="232.495" y="80.044" transform="matrix(-0.866 -0.5 0.5 -0.866 414.3074 301.1033)" style={{ fill: "#F6E27D" }} width="29.999" height="29.999" />
			</g>
			<g id="XMLID_300_">

				<rect id="XMLID_301_" x="157.501" y="80.043" transform="matrix(-0.5 -0.866 0.866 -0.5 176.4438 291.9535)" style={{ fill: "#F6E27D" }} width="29.999" height="29.999" />
			</g>
			<g id="XMLID_302_">

				<rect id="XMLID_303_" x="157.496" y="209.947" transform="matrix(-0.866 -0.5 0.5 -0.866 209.4048 506.0046)" style={{ fill: "#F6E27D" }} width="29.999" height="29.998" />
			</g>
			<g id="XMLID_304_">

				<rect id="XMLID_305_" x="232.518" y="209.949" transform="matrix(-0.5 -0.866 0.866 -0.5 176.4675 551.7798)" style={{ fill: "#F6E27D" }} width="29.997" height="29.999" />
			</g>
			<polygon id="XMLID_306_" style={{ fill: "#E6972A" }} points="130,420 130,0 80,0 100,300 100,420 	" />
			<polygon id="XMLID_307_" style={{ fill: "#EFC27B" }} points="290,0 290,420 320,420 320,300 340,0 	" />
			<rect id="XMLID_308_" x="290" y="145" style={{ fill: "#F8E99B" }} width="10" height="30" />
			<g id="XMLID_309_">
				<rect id="XMLID_310_" x="119.999" y="145" style={{ fill: "#F6E27D" }} width="29.999" height="30" />
			</g>
			<rect id="XMLID_311_" x="119.999" y="145" style={{ fill: "#F5DC60" }} width="10" height="30" />
			<path id="XMLID_312_" style={{ fill: "#D5851F" }} d="M241.616,345c-5.628-11.814-17.683-20-31.616-20s-25.988,8.186-31.616,20H100v30
		h220v-30H241.616z"/>
			<rect id="XMLID_313_" x="290" y="345" style={{ fill: "#E6972A" }} width="30" height="30" />
			<rect id="XMLID_314_" x="100" y="345" style={{ fill: "#B6731B" }} width="30" height="30" />
		</g>
	</svg>
)

export const CosmetologyIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={CosmetologySvg} {...props} />
);