import uuid from "uuid";
import path from "path";
import fs from "fs";

const staticResourcePath = "../../static/imgs";

class FileService {
    async saveFile(file) {
        try {
            const fileName = uuid.v4() + path.extname(file.originalname);
            const filePath = path.resolve(staticResourcePath, fileName);

            if (!fs.existsSync(staticResourcePath)) {
                await fs.mkdir("../../static/imgs");
            }

            file.mv(filePath);

            return filePath;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    async removeFile(pathToFile) {
        try {
            await fs.unlink(pathToFile);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export { FileService };
