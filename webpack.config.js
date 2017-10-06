/*var webpack = require('webpack');
var htmlWebpackPluging = require('html-webpack-pluging');
var  S3Uploader  = require ( ' webpack-s3-uploader ' ); 



const config = {   
 context : path . resolver ( __dirname , ' .. ' ) ,  

 salida : { 
   path : path . resolver ( __dirname , ' ../build/public/assets ' ) ,  
   publicPath : ' your_cdn_url ' , 
 } ,

 plugins : [ 
   new htmlWebpackPluging({
    template: './src/index.html'

   })
   nuevo S3Uploader  ( {
     s3Opciones : { 
       accessKeyId : proceso . env . AWS_ACCESS_KEY_ID , 
       secretAccessKey : proceso . env . AWS_SECRET_ACCESS_KEY , 
       región : ' us-west-1 ' 
     } ,
     s3UploadOptions : { 
       Cubo : ' MyBucket ' 
     } ,
   } )
 ]
 //  ..otra configuración 
}
*/