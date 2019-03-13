import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TaskallPage } from '../taskall/taskall';  
import { FileChooser } from '@ionic-native/file-chooser';  


/**
 * Generated class for the AddtaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {
  onTask:boolean = false;  
  onTaskPower:boolean = false; 
  SelectArr:any=[];
  title:any;  
  contents:any;
  PowerSelect:any;

  imgUrl:any;
  profilepic;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public filetransfer: FileTransfer,public camera:Camera,public actionSheetCtrl:ActionSheetController,private fileChooser: FileChooser) {
  console.log("profilepic==",this.profilepic); 
    this.imgUrl=this.security.ImageUrlLink();

      this.security.Categorylist().subscribe(result => {      
          if (result.status === 200) { 
            console.log("result.final_array==",result.final_array)  
            this.SelectArr=result.final_array;  
            }    
         else {    }
       }, err => {  console.log("err", err);   }
      ); 

  }

  onChangeTask()  { this.onTask=true;    }  

  onChangeTaskPower() { this.onTaskPower=true;   } 

  uploadpicture() {
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Choose file or image Upload',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
       this.gallery()
        },
      },
      {
        text: 'Take A Snap',
        handler: () => {
         this.camera1()
        }
      },
      {
        text: 'Upload File',
        handler: () => {
         this.uploadFile()
        }
      }
    ]
    })
    actionsheet.present(); 
  }

  uploadFile()  {  
    this.fileChooser.open()
    .then(uri => { console.log(uri);   this.profilepic=uri; 
    })  
    .catch(e => console.log(e));
  }

  gallery() {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {  
      console.log(imageData);
      this.profilepic=imageData
    }, (err) => { 
    })
  }
  
  
  
  camera1(){
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    console.log(imageData);
    this.profilepic=imageData
  }, (err) => {
  })
  }

      ProfileImageUp(imgData,commentID) { 
        const filetransfers: FileTransferObject = this.filetransfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: imgData,      
         // mimeType: "multipart/form-data", 
          params: {
            userid:localStorage['userid'],
            commentID : commentID,
            image : imgData
          }  
        }
        filetransfers.upload(imgData,this.imgUrl+'/taskcreateimg',options).then((data) => {
          console.log(data)
          console.log(JSON.parse(data.response))
          let imgProfile= JSON.parse(data.response).image;
          }, (err) => {
          }) 
      }

  GotoNext()  {
    
    let postcontent="<p>"+this.contents+"<p>";
    this.security.CreateTask(postcontent,this.title,this.PowerSelect).subscribe(result => {      
      if (result.status === 200) { 
        console.log(result);
        console.log("this.profilepic=",this.profilepic); 
        if(this.profilepic != undefined){  
          this.ProfileImageUp(this.profilepic,result.commentID);    
        }  
         this.onTaskPower=false;
         this.title="";
         this.PowerSelect="";
         this.contents=""; 
         this.navCtrl.push(TaskallPage); 
      }    
     else {    }
   }, err => {  console.log("err", err);   }
  ); 



  }
   

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskPage');
  }

  
}