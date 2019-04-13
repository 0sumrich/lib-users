import d3Tip from 'd3-tip'

const per1000 = p => Math.round(p.activeCount / (p.population / 1000));

const tipHtml = d => {
	const p = d.profile;
	const res = `
	<p class='legend'>Count: ${p.activeCount}</p>
	<p class ='legend'>Population: ${p.population}</p>
	<p class ='legend'>
		Per 1000 population: 
		${per1000(p)}
	</p> 
	`;
	return res;
};

const tip = d3Tip()
	.attr("class", "d3-tip")
	.html(tipHtml);

export default tip;