import { width, height, projection } from "../consts";

export default function postcodeFilter(o) {
	const pos = projection([o.long, o.lat]);
	if (pos[0] >= 0 && pos[0] <= width && (pos[1] >= 0 && pos[1] <= height)) {
		return true;
	} else {
		return false;
	}
}
