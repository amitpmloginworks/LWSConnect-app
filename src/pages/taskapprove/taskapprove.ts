import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController, Platform , ViewController, ToastController, LoadingController } from 'ionic-angular'; 

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser'; 
import { FileOpener } from '@ionic-native/file-opener';  

import { FeedbackPage } from '../feedback/feedback';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { TasksegmentPage } from '../tasksegment/tasksegment';  

import { TasksegmentsPage } from '../tasksegments/tasksegments';  


/**
 * Generated class for the TaskapprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-taskapprove',
  templateUrl: 'taskapprove.html',
}) 
export class TaskapprovePage {
   
  taskName:any;  
  PostID:any; 
  ErrMsg:any;

  btnstaus:boolean = false;
  final_array:any;

  PostStatus:any;     
  final_hours:any;
  loadingImg

  LandPage
  LangPageTag
  constructor(public navCtrl: NavController, public navParams: NavParams,private fileChooser: FileChooser,public file:File,private fileOpener: FileOpener,public filetransfer: FileTransfer,public modalCtrl:ModalController, public http:Http, public security:SecurityProvider, public platform: Platform, public viewController:ViewController, public toastCtrl:ToastController,public loadingCtrl: LoadingController) {

    this.LangPageTag=this.navParams.get("LangPageTag"); // Landing Page tag  
    this.LandPage=this.navParams.get("LandPage");  // Landing Page 

    this.loadingImg= this.security.LoadingURL()

    this.final_hours=[];
     // Register for android's system back button
     let backAction =  platform.registerBackButtonAction(() => {
      // this.navCtrl.pop();  
      if(this.LandPage=="tasksegment") {
        this.navCtrl.setRoot(TasksegmentPage,{LangPageTag:this.LangPageTag});
      }
      else{
        this.navCtrl.setRoot(TasksegmentsPage,{LangPageTag:this.LangPageTag});
      } 
      backAction();    
     },1) 
 

    this.PostID=this.navParams.get("PostID");
    this.PostStatus=this.navParams.get("PostStatus");       
     
    if(this.PostStatus == "open") {  this.btnstaus = false;   }
    if(this.PostStatus == "closed") {  this.btnstaus = true;  }

    this.taskName =this.navParams.get("PostTitle");  
    this.GetData();
          
  }

  NotifyBtn()  {      
    if(this.LandPage=="tasksegment") {
      this.navCtrl.setRoot(TasksegmentPage,{LangPageTag:this.LangPageTag});
    }
    else{
      this.navCtrl.setRoot(TasksegmentsPage,{LangPageTag:this.LangPageTag});
    }      
  } 


  GetData()  { 
    const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
    loader.present();      
    this.security.taskapprove(this.PostID).subscribe(result => {  
      loader.dismiss();             
      if(result.wpstatus === 1) { 
         console.log("result==",result);
          this.final_array= result.final_array;
          if(result.final_hours == undefined){
            this.final_hours= [];    
          }     
             else {
              this.final_hours= result.final_hours; 
             }   
        //  if(result.PostStatus == "open") {  this.btnstaus = false;   }
        //  if(result.PostStatus == "closed") {  this.btnstaus = true;  }  
      }    
     else  {     this.ErrMsg=result.message;   }
   }, err => { 
    loader.dismiss();  
     console.log("err", err);  
     this.ErrMsg="No internet connection, Please connect to internet !";     
   }); 
  }

      
  GotoNext1(filepaths,titles,extensions)  {      
    let fileName=''
    let apptypes=''; 
    fileName=titles; 
    if(extensions==".pdf")      {      apptypes= 'application/pdf';     }
    if(extensions==".doc")      {     apptypes = 'application/msword';  }
    if(extensions==".docx")     {   
       apptypes ='application/vnd.openxmlformats-officedocument.wordprocessingml.document'   
    }
    
   if(extensions==".png")     {   
    apptypes ='image/png'   
 }

 if(extensions==".jpg")     {   
  apptypes ='image/jpeg'   
}

if(extensions==".bmp")     {   
  apptypes ='image/bmp'   
}  
    let filespath=this.file.dataDirectory
    const fileTransfer: FileTransferObject = this.filetransfer.create();       
    fileTransfer.download(filepaths,filespath + fileName, true).then((entry) => {
      let url1 =entry.toURL();
      this.fileOpener.open(url1, apptypes).then(() =>  {   }
    ).catch(e => {   } );
    }, (error) => {   
    });
  }

  
  CreateBtn()   {   
    let firewallTypeModal=this.modalCtrl.create(FeedbackPage , { PostID: this.PostID }); 
    firewallTypeModal.onDidDismiss(data => {    
       if(data=="setclosed"){  this.btnstaus = true;   }      
       if(data=="setopen")  {  this.btnstaus = false;  }
    })
    firewallTypeModal.present();  
  }


  ionViewDidLoad() {
    this.viewController.showBackButton(false)     
    console.log('ionViewDidLoad TaskapprovePage');
  }

}
