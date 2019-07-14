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
	const urls = {
		url: result.url,
		secureUrl: result.secure_url
	};
	return urls;
};

export default imgUpload;
