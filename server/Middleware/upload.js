import multer from "multer";

export const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, './uploads/images');
        },
        filename(req, file, cb) {
          cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
      }),
      limits: {
        fileSize: 5000000
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|JPG)$/)) {
          return cb(
            new Error(
              'only upload files with jpg, jpeg, png,JPG'
            )
          );
        }
        cb(undefined, true);
      }
});