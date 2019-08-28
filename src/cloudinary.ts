// @ts-ignore
import cloudinary, { uploader } from 'cloudinary/lib/v2';

cloudinary.config({
	cloud_name: `${process.env.CLOUDINARY_NAME}`,
	api_key: `${process.env.CLOUDINARY_API}`,
	api_secret: `${process.env.CLOUDINARY_SECRET}`
});

interface File {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	path: string;
	buffer: Buffer;
}

const imgUpload = async (file: File) => {
	const result = await cloudinary.uploader
		.upload(file.path, (error: any, result: any) => {
			return result;
		})
		.catch((e: Error) => console.error(e));
	// console.log(result);
	const image = {
		url: result.url,
		secureUrl: result.secure_url,
		width: result.width,
		height: result.height,
		format: result.format,
		title: result.public_id
	};
	return image;
};

export const imgDelete = async (public_id: string) => {
	const res = await cloudinary.uploader
		.destroy(public_id, (error: any, result: any) => {
			return;
		})
		.catch((e: any) => console.log(e));
	return res;
};

export default imgUpload;
