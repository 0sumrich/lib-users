import * as d3 from "d3-selection";
import ageType from "./ageType";

export default function postCodeHider(arr) {
	const l = arr.length;
	const hide = className => d3.selectAll(className).classed("hide", true);
	const show = className => d3.selectAll(className).classed("hide", false);
	const showActive = () => {
		show(".active");
		hide(".expired");
	};
	const showExpired = () => {
		show(".expired");
		hide(".active");
	};

	const ageTypeCondition = (d, filterType) => ageType(d.age) !== filterType;
	const typeCondition = (d, filterType) => d.type !== filterType;

	if (l == 1) {
		const filterType = arr[0];
		if (filterType == "all") {
			show(".postcode");
		} else if (filterType == "active" || filterType == "expired") {
			filterType == "active" ? showActive() : showExpired();
		} else if (
			filterType == "children" ||
			filterType == "working" ||
			filterType == "65up"
		) {
			d3.selectAll(".postcode").each(function(d) {
				ageTypeCondition(d, filterType)
					? d3.select(this).classed("hide", true)
					: d3.select(this).classed("hide", false);
			});
		}
	} else if (l == 2) {
		d3.selectAll(".postcode").each(function(d) {
			const test = [
				typeCondition(d, arr[0]),
				ageTypeCondition(d, arr[1])
			];
			typeCondition(d, arr[0]) || ageTypeCondition(d, arr[1])
				? d3.select(this).classed("hide", true)
				: d3.select(this).classed("hide", false);
		});
	}
}
