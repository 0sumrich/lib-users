import style from "./style.css";
import ages from "./ages/index.js";
import maps from "./maps/index.js";
import libFix from "./maps/libFix.js";

import ageGroups from "./data/ageGroups.json";
import postcodes from "./data/postcodes.json";
import libraries from "./data/barnetLibraries.json";

ages(ageGroups.data);
maps(libFix(libraries), postcodes.data);

