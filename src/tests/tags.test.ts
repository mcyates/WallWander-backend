import isNsfw from '../utils/tags';

it('correctly sets nsfw of tags', () => {
	let tagArr = [
		{
			id: '123',
			nsfw: false,
			tag: 'moon'
		}
	];

	expect(isNsfw(tagArr)).toEqual(false);
});
