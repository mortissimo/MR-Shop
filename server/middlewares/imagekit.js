const axios = require('axios').default;
const FormData = require('form-data');
const ImageKit = require("imagekit");
    

function toImageKit(req, res, next){
    if(req.file ){
        console.log(req.file.size);
        if(req.file.originalname.match(/\.(jpg|jpeg|png)$/)){
            if(req.file.size <= 255000){
                try{
                    let api_key = Buffer.from(process.env.PRIVATE_KEY, 'utf8').toString("base64");
                    console.log("MASUK", req.file.buffer);
                    const file = req.file.buffer.toString("base64");
                    const fileName = req.file.originalname;
                
                    const data = new FormData();
                    data.append('file', file);
                    data.append('fileName', fileName);
                    axios({
                        url:'https://upload.imagekit.io/api/v1/files/upload',
                        method:'POST',
                        headers: {
                            Authorization : `Basic ${api_key}`,
                            ...data.getHeaders()
                        },
                        data:data
                    })
                    .then(({data}) => {
                        req.body.imgUrl = data.url;
                        console.log("file uploaded")
                        next();
                    })
                }catch(error){
                    next({
                        name: "InternalServerError",
                        message: err.message
                    })
                }  
            }else{
                next({
                    name: "Exceed size limit",
                    message: `File must < 255 kb`
                });
            }
        }else{
            next({
                name: "Unauthorized",
                message: `File must either JPEG, JPG, and PNG`
            });
        }
    }else{
        next();
    }    
}
module.exports = toImageKit;