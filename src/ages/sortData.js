const sortData = (data, type) =>
	data.map(o => {
		return {
			age: o.age,
			count: type == "active" ? o.activeCount : o.expiredCount,
			type: type
		};
	});

export default sortData;
