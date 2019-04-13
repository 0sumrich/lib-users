import d3Tip from "d3-tip";

const tipHtml = d => {
	const txt = d.type == "active" ? " active customers" : " lapsed customers";
	const res = `
	<p class='tt'>Age: ${d.age}</p>
	<p class ='tt'>Count: ${d.count + txt} 
	`;
	return res;
};

const tip = 
	d3Tip()
	.attr("class", "d3-tip")
	.html(d => tipHtml(d));

export default tip;