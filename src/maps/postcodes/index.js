import * as d3 from "d3";
import postcodeFilter from "./postcodeFilter";
import filterClick from "./filterClick";
import {
	margin,
	width,
	height,
	tau,
	mapPadding,
	extent,
	geo,
	projection,
	path,
	tiles,
	midSvg, 
	legX,
	spacing,
	xSpacing
} from "../consts";

/*
const midSvg = (height + margin.top + margin.bottom) / 2;
	const legX = width + 0.1 * margin.right;
	const spacing = 25;
	const xSpacing = 15;
	*/

export default function postcodes(libraries, postcodes) {
	const svg = d3
		.select("#postcodes")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	const map = svg
		.append("g")
		.attr("class", "map")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	map.append("clipPath")
		.attr("id", "mask")
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height);

	map.selectAll("image")
		.data(tiles)
		.enter()
		.append("image")
		.attr("xlink:href", d => {
			const url = `https://${"abc"[d.y % 3]}.tile.openstreetmap.org/${
				d.z
			}/${d.x}/${d.y}.png`;
			return url;
		})
		.attr("x", d => (d.x + tiles.translate[0]) * tiles.scale)
		.attr("y", d => (d.y + tiles.translate[1]) * tiles.scale)
		.attr("width", tiles.scale)
		.attr("height", tiles.scale)
		.attr("clip-path", "url(#mask)");

	map.selectAll(".ward")
		.data(geo.features)
		.enter()
		.append("path")
		.attr("class", d => `ward ${d.properties.NAME}`)
		.attr("d", path)
		.attr("fill", "red")
		.attr("fill-opacity", 0.1)
		.attr("stroke", "black");

	map.selectAll("circle")
		.data(postcodes.filter(postcodeFilter))
		.enter()
		.append("circle")
		.attr(
			"class",
			d => `postcode ${d.type == "active" ? "active" : "expired"}`
		)
		//.attr('class', 'postcode')
		.attr("cx", d => projection([d.long, d.lat])[0])
		.attr("cy", d => projection([d.long, d.lat])[1])
		.attr("r", 2)
		.attr("fill", d => (d.type == "active" ? "green" : "red"));

	map.selectAll(".library")
		.data(libraries)
		.enter()
		.append("circle")
		.attr("class", "library")
		.attr("cx", d => projection(d.coordinates)[0])
		.attr("cy", d => projection(d.coordinates)[1])
		.attr("r", 4)
		.attr("fill", "yellow");

	document
		.querySelectorAll(".filter")
		.forEach(btn => (btn.onclick = filterClick));

	//map1 legend

	const title = "Active and Expired Library Membership In Barnet";

	svg.append("text")
		.attr("x", (width + margin.left + margin.right) / 2)
		.attr("y", margin.top / 2)
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "middle")
		.text(title);

	svg.append("circle")
		.attr("cx", legX)
		.attr("cy", midSvg - spacing)
		.attr("r", 2)
		.attr("fill", "green");

	svg.append("text")
		.attr("class", "legend")
		.attr("x", legX + xSpacing)
		.attr("y", midSvg - spacing)
		.attr("alignment-baseline", "middle")
		.text("Active Users");

	svg.append("circle")
		.attr("cx", legX)
		.attr("cy", midSvg)
		.attr("r", 2)
		.attr("fill", "red");

	svg.append("text")
		.attr("class", "legend")
		.attr("x", legX + xSpacing)
		.attr("y", midSvg)
		.attr("alignment-baseline", "middle")
		.text("Expired Users");

	svg.append("circle")
		.attr("cx", legX)
		.attr("cy", midSvg + spacing)
		.attr("r", 4)
		.attr("fill", "yellow");

	svg.append("text")
		.attr("class", "legend")
		.attr("x", legX + xSpacing)
		.attr("y", midSvg + spacing)
		.attr("alignment-baseline", "middle")
		.text("Barnet Libraries");
}
