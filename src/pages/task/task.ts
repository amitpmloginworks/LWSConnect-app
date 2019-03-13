import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, Content, ActionSheetController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'  
import { TimerObservable } from 'rxjs/observable/TimerObservable';   

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';  

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage { 
  @ViewChild(Content) content: Content;     
  chats = [];
  tasklistArr=[]; 
  taskID:any;   
  PostTitle 
  replyarea
  chattimes:any;  
  count:number =0;
  profilepic:any;     
  imgUrl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public loadingCtrl: LoadingController, public toastCtrl:ToastController, public security :SecurityProvider, public http:Http,public filetransfer: FileTransfer,public camera:Camera,public actionSheetCtrl:ActionSheetController,private fileChooser: FileChooser) {
    this.imgUrl=this.security.ImageUrlLink();  
    this.taskID=this.navParams.get("taskID");          
    this.PostTitle = this.navParams.get("PostTitle");
    this.ChatRefresh();       
  }

  ChatRefresh() {  
       this.security.MyTaskDetail(this.taskID).subscribe(result => {    
          if (result.status === 200) {   
            this.tasklistArr=[];
              this.tasklistArr=result.final_array 
              setTimeout(() => {   this.content.scrollToBottom(300);  }, 1000);           
         } 
         else {
         }
       }, err => {
         console.log("err", err);
       }); 
  }

  uploadpicture()
  {
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Image Upload!',
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
      }]
    })
    actionsheet.present(); 
  }

  uploadFile(){
    this.fileChooser.open()
    .then(uri => { console.log(uri);   
      this.profilepic=uri;  
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
    this.profilepic=imageData
  }, (err) => {
  })
  }

ProfileImageUp(imgData,commentID) {
/*
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,    
      mimeType: "multipart/form-data",
      params: { 'upload_preset' :  'wjnegjnc'  }
    }
*/
    /*
    filetransfers.onProgress((e) => {
      this._zone.run(() => {
      this.loadProgress = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
      })  
    });
    */
  /*
    filetransfers.upload(ImgesP,'https://api.cloudinary.com/v1_1/loginworks/upload', options)
      .then((data) => {
         this.profilepic=JSON.parse(data.response).secure_url
      }, (err) => {
       alert('error'+JSON.stringify(err))  
       alert(err)  
      })
  */
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
   
      filetransfers.upload(imgData,this.imgUrl+'/imageUpload',options).then((data) => {
        let imgProfile= JSON.parse(data.response).image;
          console.log(data); 
        alert(data); 
        alert(JSON.parse(data.response));  
        alert(imgProfile);  
        }, (err) => {
          alert('error'+JSON.stringify(err));  
          alert(err);  
        }) 


  }


  GetData() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
    loading.present();    
       this.security.MyTaskDetail(this.taskID).subscribe(result => {    
          loading.dismiss();   
          if (result.status === 200) { 
              this.tasklistArr=result.final_array 
              setTimeout(() => {   this.content.scrollToBottom(300);  }, 1000);           
         } 
         else {
           this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
         }
       }, err => {
         console.log("err", err);
         loading.dismiss();  
         //this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
       }); 
  }


  SendReply() {
    this.count++
  if(this.count%2==0){
    this.SendServer();
  }

  if(this.count%2==1){
    document.getElementById("clmsg").style.display="block";
  }

 }

 SendServer(){
  if(this.replyarea =="" || this.replyarea == undefined){
    //this.toastCtrl.create({ message: `Please enter your message.`, duration: 4000, position: 'top' }).present();
    return; 
    }  
      var taskcontent="<p>"+this.replyarea+"</p>";  
      let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
      loading.present();      
         this.security.MyTaskDetailBtn(this.taskID,taskcontent).subscribe(result => {    
            loading.dismiss();   
            if (result.status === 200) { 
              if(this.profilepic !="" || this.profilepic != undefined){ 
                this.ProfileImageUp(this.profilepic,result.commentID);   
              } 
              document.getElementById("clmsg").style.display="none";  
              this.replyarea = "";
              //this.toastCtrl.create({ message: result.message, duration: 4000, position: 'top' }).present(); 
              this.chattimes =TimerObservable.create(0, (3*1000)).subscribe(t => {  this.ChatRefresh();     }); 
              return;        
           } 
           else {
             this.toastCtrl.create({ message: `Sorry, the app could not connect to our system. Please try in some time.`, duration: 4000, position: 'top' }).present(); return;     
           }
         }, err => {
           console.log("err", err);
           loading.dismiss();  
           //this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
         }); 
 }

  ionViewWillLeave() {   
    this.chattimes.unsubscribe();
  }

  ionViewDidLoad() {   
    console.log('ionViewDidLoad TaskPage');
    // this.chats.push(  
    //   {"styleClass": "chat-message left", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":2 },        
    //   {"styleClass": "chat-message right", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":1 },
    //   {"styleClass": "chat-message left", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":2 } 
    // );
  }

}
