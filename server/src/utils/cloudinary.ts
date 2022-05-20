import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export const uploadImage = async (file: any) => {
  // The Upload scalar return a a promise
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  return new Promise<cloudinary.UploadApiResponse | undefined>(
    (resolve, reject) => {
      const cloudStream = cloudinary.v2.uploader.upload_stream(function (
        err,
        fileUploaded
      ) {
        // In case something hit the fan
        if (err) {
          reject(err);
        }

        // All good :smile:
        resolve(fileUploaded);
      });

      fileStream.pipe(cloudStream);
    }
  );
};

export const destroyImage = async (public_id: string): Promise<any> => {
  return await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
    if (err) console.log(err);
    return result;
  });
};
