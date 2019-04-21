import barnet from "../data/barnet.json";
import { geoMercator } from "d3";
import { geoPath } from "d3-geo";
import { tile } from "d3-tile";
const geo = barnet.data;

const margin = { top: 50, right: 140, bottom: 0, left: 0 };
const width = 1050 - margin.left - margin.right;
const height = 900 - margin.top - margin.bottom;
const tau = 2 * Math.PI;

const mapPadding = {
	left: 20,
	top: 20
};

const extent = [
	[mapPadding.left, mapPadding.top],
	[width - mapPadding.left, height - mapPadding.top]
];

const projection = geoMercator().fitExtent(extent, geo);

const path = geoPath().projection(projection);

const tiles = tile()
	.size([width, height])
	.scale(projection.scale() * tau)
	.translate(projection.translate())();

const midSvg = (height + margin.top + margin.bottom) / 2;
const legX = width + 0.1 * margin.right;
const spacing = 25;
const xSpacing = 15;

export {
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
};
