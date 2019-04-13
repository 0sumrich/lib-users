export default function libFix(arr) {
	return arr
		.map(o => {
			const name = o.London_Borough_of_BarnetLabel.replace(
				/(Library)/,
				""
			).slice(0, -1);
			const coordinates = o.coordinate_location
				.split(" ")
				.map(n => +n.replace(/[^\d.-]/g, ""));
			return { name: name, coordinates: coordinates };
		})
		.filter(o => !o.name.includes("Community"));
}