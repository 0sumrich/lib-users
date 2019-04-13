import * as d3 from "d3-selection";
import postCodeHider from "./postCodeHider";

const active = "pure-button-active";

function filterClick(e) {
	const filStr = "filter-";
	const ageStr = "agetype-";
	const shortId = el =>
		d3
			.select(el)
			.attr("id")
			.slice(filStr.length);
	const id = shortId(this);
	let ids = [];
	const removeClass = str =>
		d3.select(`#${filStr + str}`).classed(active, false);
	if (id == "all") {
		d3.selectAll(".filter").classed(active, false);
	} else if (id == "active") {
		removeClass("all");
		removeClass("expired");
	} else if (id == "expired") {
		removeClass("all");
		removeClass("active");
	} else if (id == "children") {
		removeClass("all");
		removeClass("working");
		removeClass("65up");
	} else if (id == "working") {
		removeClass("all");
		removeClass("children");
		removeClass("65up");
	} else if (id == "65up") {
		removeClass("all");
		removeClass("children");
		removeClass("working");
	}
	d3.select(this).classed(active, true);
	d3.selectAll(".pure-button-active").each(function() {
		ids.push(shortId(this));
	});
	postCodeHider(ids);
}

export default filterClick;
