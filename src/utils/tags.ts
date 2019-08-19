interface Tag {
	id: string;
	tag: string;
	nsfw: boolean;
}

export const isNsfw = (tags: Tag[]) => {
	let nsfw = false;

	tags.forEach((tag: Tag) => {
		if (tag.nsfw) {
			nsfw = true;
		}
	});
	return nsfw;
};

export default isNsfw;
