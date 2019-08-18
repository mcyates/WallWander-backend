export const isNsfw = (tags) => {
	let nsfw = false;

	tags.forEach((tag) => {
		if (tag.nsfw) {
			nsfw = true;
		}
	});
	return nsfw;
};

export default isNsfw;
