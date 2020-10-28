const multer  = require('multer');
const path = require('path');

// Set storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const filename = path.basename(file.originalname);
         cb(null,filename);
    }
  })
   
  var upload = multer({ 
      storage: storage,
    //   fileFilter: function (req, file, cb) {
    //       if(file.mimetype =="image/png" || file.mimetype =="image/jpg"){
    //           cb(null, true);
    //       }
    //       else{
    //           console.log("Only File .png .jpg");
    //           cb(null, false);
    //       }
    //   }, 
    //   limits :{
    //       fileSize: 2048*2048*2,
    //   }
 })
 module.exports = upload;