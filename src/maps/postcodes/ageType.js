export default function ageType(num) {
	if (num < 18) {
		return "children";
	} else if (num > 17 && num < 66) {
		return "working";
	} else if (num > 65) {
		return "65up";
	}
};