import perCapMap from './perCapMap/index.js';
import postcodesMap from './postcodes/index.js'

export default function maps(libraries, postcodes){
	postcodesMap(libraries, postcodes);
	perCapMap(libraries);
}