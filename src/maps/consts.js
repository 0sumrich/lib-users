import * as d3 from "d3-geo";
import { tile } from "d3-tile";
d3.tile = tile;
const geo = require("../data/barnet.json").data;

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

const projection = d3.geoMercator().fitExtent(extent, geo);

const path = d3.geoPath().projection(projection);

const tiles = d3.tile()
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
