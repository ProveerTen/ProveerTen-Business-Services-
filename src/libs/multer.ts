import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { dataDecoded } from '../middlewares/auth-token';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, dataDecoded.id + '_' + uuidv4() + path.extname(file.originalname));
    }
});

export default multer({ storage });