import * as d3 from "d3";
import {
	width,
	height,
	margin,
	geo,
	path,
	projection,
	midSvg,
	legX,
	spacing,
	xSpacing
} from "../consts";
import tip from "./tip";

export default function perCapMap(libraries) {
	const svg = d3
		.select("#percap")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	const map = svg
		.append("g")
		.attr("class", "map")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	map.call(tip);

	const activePerCapArray = geo.features.map(
		o => o.profile.activeCount / o.profile.population
	);

	const color = d3
		.scaleLinear()
		.domain([d3.min(activePerCapArray), d3.max(activePerCapArray)])
		.range([0, 1]);

	const centroid = d =>
		projection(d3.polygonCentroid(d.geometry.coordinates[0]));

	map.selectAll(".ward2")
		.data(geo.features)
		.enter()
		.append("path")
		.attr("class", d => `ward2 ${d.properties["NAME"]}`)
		.attr("d", path)
		.attr("fill", d => {
			const o = d.profile;
			const input = o.activeCount / o.population;
			const res = d3.interpolateReds(color(input));
			return res;
		})
		.attr("stroke", "black")
		.on("mouseover", function(d) {
			d3.select(this).style("stroke-width", 2);
			tip.show(d, this);
		})
		.on("mouseout", function(d) {
			d3.select(this).style("stroke-width", 1);
			tip.hide(d, this);
		});

	map.selectAll("ward-label")
		.data(geo.features)
		.enter()
		.append("text")
		.attr(
			"class",
			d => `ward-label ${d.properties["NAME"].replace(/\s+/g, "")}`
		)
		.attr("x", d => centroid(d)[0])
		.attr("y", d => centroid(d)[1])
		.style("text-anchor", "middle")
		.text(d => d.properties.NAME);

	map.selectAll(".library2")
		.data(libraries)
		.enter()
		.append("circle")
		.attr("class", "library2")
		.attr("cx", d => projection(d.coordinates)[0])
		.attr("cy", d => projection(d.coordinates)[1])
		.attr("r", 3)
		.attr("fill", "yellow");

	const westFinchley = d3.select(".ward-label.WestFinchley");
	const wfX = +westFinchley.attr("x");
	westFinchley.attr("x", wfX - 15);

	const woodhouse = d3.select(".ward-label.Woodhouse");
	const woodX = +woodhouse.attr("x");
	woodhouse.attr("x", woodX + 15);

	svg.append("circle")
		.attr("cx", legX)
		.attr("cy", midSvg)
		.attr("r", 3)
		.attr("fill", "yellow")
		.attr("stroke", "black");

	svg.append("text")
		.attr("class", "legend")
		.attr("x", legX + xSpacing)
		.attr("y", midSvg)
		.attr("alignment-baseline", "middle")
		.text("Barnet Libraries");

	const title = "Active Library Members per 1000 residents";

	svg.append("text")
		.attr("x", (width + margin.left + margin.right) / 2)
		.attr("y", margin.top / 2)
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "middle")
		.text(title);
}
