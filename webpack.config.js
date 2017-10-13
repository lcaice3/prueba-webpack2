var webpack = require('webpack');
//var S3Plugin = require('webpack-s3-plugin');
//var htmlWebpackPluging = require('html-webpack-pluging');
var  S3Uploader  = require ( ' webpack-s3-uploader ' ); 



const config = {   
 //context : path.resolve( __dirname , ' .. ' ) ,  

 output: { 
   path :'./dist/**', 
   publicPath : 'http://bdb-qa-ejemplo-libranza.s3-website-us-east-1.amazonaws.com' , 
 } ,

 plugins : [ 
   new htmlWebpackPluging({
    template: './src/index.html'

   }),
   new S3Uploader( {
    s3Options: { 
       accessKeyId : process.env.AKIAJMATONQHVB4NPI2Q, 
       secretAccessKey : process.env.tQnr3cU7UYjBlSH5bNfxRzj6NMYig85rtxbEZ8MA, 
       region : 'us-east-1' 
     } ,
     s3UploadOptions : { 
      Bucket: 'bdb-qa-ejemplo-libranza' 
     } ,
   } )
 ]
 //'./dist/**'
 //  ..otra configuración 
}
