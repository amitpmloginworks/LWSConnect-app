import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, Platform, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TaskallPage } from '../taskall/taskall';  
import { FileChooser } from '@ionic-native/file-chooser';  
import { HomePage } from '../home/home';
import { FileOpener } from '@ionic-native/file-opener';
import { DashboardusrPage } from '../dashboardusr/dashboardusr'; 
import { FilePath } from '@ionic-native/file-path';

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms' 


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

  validation:FormGroup

  onTask:boolean = false;  
  onTaskPower:boolean = false; 
  SelectArr:any=[];
  title:any;  
  contents:any;
  PowerSelect:any;

  imgUrl:any;
  profilepic;
  imgmetatitle:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public filetransfer: FileTransfer,public camera:Camera,public actionSheetCtrl:ActionSheetController,private fileChooser: FileChooser, public modalCtrl: ModalController, public file:File,private fileOpener: FileOpener, public platform:Platform,public viewController: ViewController,public filePath: FilePath,public formbuilder:FormBuilder) {
  console.log("profilepic==",this.profilepic); 
    this.imgUrl=this.security.ImageUrlLink();

    this.validation=formbuilder.group({      
      PowerSelect:['',Validators.compose([Validators.maxLength(500), Validators.required])], 
      title:['',Validators.compose([Validators.required, Validators.maxLength(20),this.noWhitespaceValidator ])], 
      contents:['',Validators.compose([Validators.required, Validators.maxLength(500),this.noWhitespaceValidator ])]
      })

      this.security.Categorylist().subscribe(result => {      
          if (result.status === 200) { 
            console.log("result.final_array==",result.final_array)  
            this.SelectArr=result.final_array;  
            }    
         else {    }
       }, err => {  console.log("err", err);   }
      ); 

          // Register for android's system back button
          let backAction =  platform.registerBackButtonAction(() => {
            this.navCtrl.pop(); 
            this.navCtrl.setRoot(DashboardusrPage);
           backAction();    
          },1)   

  }

  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
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

  // uploadFile()  {  
  //   this.fileChooser.open()
  //   .then(uri => { console.log(uri);   this.profilepic=uri; 
  //   })  
  //   .catch(e => console.log(e));
  // }

  uploadFile()  {  
    this.fileChooser.open()
    .then(uri => { 
      console.log("uri",uri);    
        // get file path
		this.filePath.resolveNativePath(uri)
		.then(file => {
      console.log("file==",file)    
			//alert('file'+JSON.stringify(file));
      let filePath: string = file;
      this.profilepic=filePath;   
      this.imgmetatitle=file.split('file:///storage/emulated/0/Download/')[1]; 
		})
    .catch(err => console.log(err));
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

      NotifyBtn() { 
        this.navCtrl.pop(); 
        this.navCtrl.setRoot(DashboardusrPage);    
      }
       
  GotoNext()  {
    if(this.title =="" || this.title == undefined || this.PowerSelect == "" || this.PowerSelect==undefined || this.contents =="" || this.contents == undefined) 
    return;
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
         this.navCtrl.pop();   
         this.navCtrl.push(TaskallPage,{ createtask:"createtask" }); 
      }    
     else {    }
   }, err => {  console.log("err", err);   }
  );      
}

GotoNext1(){
  let fileName=''
  let apptypes='';
  apptypes= 'application/pdf'; 
  fileName="demo.pdf"; 
  //if(extensions==".pdf")      {    fileName=titles+".pdf";  apptypes= 'application/pdf';     }
  //if(extensions==".doc")      {    fileName=titles+".doc";   apptypes = 'application/msword';  }
  //if(extensions==".docx")     {   
     //fileName=titles+".docx";
     //  apptypes ='application/vnd.openxmlformats-officedocument.wordprocessingml.document'   
  //}

  let filespath=this.file.dataDirectory
  const fileTransfer: FileTransferObject = this.filetransfer.create();       
  fileTransfer.download("http://loginworks.net/portal/demowordfortms.pdf",filespath + fileName, true).then((entry) => {
    let url1 =entry.toURL();
    this.fileOpener.open(url1, apptypes).then(() =>  {   }
  ).catch(e => {   } );
  }, (error) => {   
  });
}
   


  ionViewDidLoad() {
    this.viewController.showBackButton(false)  
    console.log('ionViewDidLoad AddtaskPage');
  }

  
}