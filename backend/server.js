const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const uploadFolder = 'D:/Code/VSCode_HTML/vue/Learning-collaborative-platform/backend/uploads';

// 确保目录存在
fs.mkdirSync(uploadFolder, { recursive: true });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

const app = express();

app.use(cors());

app.options('/your-upload-endpoint', cors(), (req, res) => {
    res.sendStatus(200);
});

app.post('/your-upload-endpoint', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('文件上传成功');
});

app.get('/your-get-endpoint', (req, res) => {
    res.send('这是 GET 请求响应');
});

// 添加文件下载处理
app.get('/your-file-endpoint', (req, res) => {
    // 这里是一个文件路径示例，你需要替换为你自己要发送的文件路径
    const file = path.join(uploadFolder, '/file-1708609335102.jpg');
    res.download(file); // 设置响应头以便浏览器知道这是一个需要下载的文件
});
  
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});