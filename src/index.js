import style from "./style.css";
import ages from "./ages/index.js";
import maps from "./maps/index.js";
import libFix from "./maps/libFix.js";

const ageGroups = require("./data/ageGroups").data;
const postcodes = require("./data/postcodes").data;
const libraries = libFix(require("./data/barnetLibraries"));

ages(ageGroups);
maps(libraries, postcodes);
