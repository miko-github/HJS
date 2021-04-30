import _ from 'lodash';
import dom from './dom';
import html from './html';

// const element = { ...document.htmlTags }; // pson.element.div(...other);
const create = (tag, other) => {
	return from({ tag, ...other });
};
const from = function HTMLPson(props) {
	let tag = html.create(props?.tag);
	const AsChild = ['children', 'html', 'text', 'md', 'from'];
	const AsAttr = ['id', 'class', 'data-', '...attr'];
	// AsAttr
	if (props?.id) dom.id(tag, props.id);
	if (props?.class) dom.class(tag).add(props.class);
	if (props?.data) dom.data(tag).add(props.data);
	if (props?.attrs) dom.attrs(tag, props.attrs);

	// AsChild
	if (props?.children) {
		_.forEach(props.children, (child) => {
			let _child = HTMLPson(child);
			dom.append(tag).with(_child);
		});
	} else if (props?.html) dom.append(tag).from(html.from2(props.html));
	else if (props?.text) dom.append(tag).with(html.text(props.text));
	else if (props?.md) dom.append(tag).with(html.create('div'));
	else if (props?.from) dom.append(tag).from(props.from);

	if (props?.parent) dom.append(props.parent).with(tag);

	return tag;
};

export { create };
export default from;

//# dom.append(tag).with(md.render(props.md));
