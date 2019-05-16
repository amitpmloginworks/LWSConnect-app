import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, ToastController, LoadingController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { TaskpopupPage } from '../taskpopup/taskpopup';  

import { TaskapprovePage } from '../taskapprove/taskapprove';   
import { AddtaskPage } from '../addtask/addtask';
import { BuyadditionalPage } from '../buyadditional/buyadditional';   
import { DashboardusrPage } from '../dashboardusr/dashboardusr';     
  

/**
 * Generated class for the TasksegmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasksegment',
  templateUrl: 'tasksegment.html',
})
export class TasksegmentPage {

  createtask

  taskongoing:any;
  taskcomp:any;

  tasksrc:any;
  categorywp
  statuswp
  postname

  onTaskPower:boolean=false; 
  taskreview:any=[];
  chooseOptions:any;  
  loadingImg

  taskcompCom:boolean =false;
  taskongoingCom:boolean =false;

  LangPageTag:any="gotask";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public modalCtrl:ModalController, public platform: Platform, public viewController:ViewController, public toastCtrl:ToastController,public loadingCtrl: LoadingController ) {    
  this.taskreview=[]; 
  
  if(this.navParams.get("LangPageTag") != undefined ) {
    this.LangPageTag=this.navParams.get("LangPageTag");       
  }
  else {
    this.LangPageTag="gotask"
  }


  this.loadingImg= this.security.LoadingURL()  

       // Register for android's system back button
       let backAction =  platform.registerBackButtonAction(() => {
         this.navCtrl.pop();       
         this.navCtrl.setRoot(DashboardusrPage);
        backAction();    
       },1)  

    this.chooseOptions=this.LangPageTag;      

    this.tasksrc = this.navParams.get("tasksrc")

    this.taskongoing=[];    
    this.taskcomp=[]; 
   
     
    if(this.LangPageTag=='gotask'){
      this.gettasklist("open"); 
    }
    else{
      this.gettasklist("closed");  
    }  
    
    

 if(this.navParams.get("ShowPopup") !=undefined)  {  
  if(localStorage['showtaskpopup']=="" || localStorage['showtaskpopup']==null ) {
    let successModal=this.modalCtrl.create(TaskpopupPage); 
    localStorage['showtaskpopup']="yes"; 
    successModal.onDidDismiss(data => {       
    })         
    successModal.present();
  }    
 }
       



  }
 
     
  NotifyBtn() {     
    this.navCtrl.setRoot(DashboardusrPage);    
  } 

  GotoNext()  {             
    this.navCtrl.setRoot(AddtaskPage ,{ pagenav:"tasksegment",LangPageTag:this.LangPageTag });        
  }

  UpgradeBtn() {                  
    this.navCtrl.setRoot(BuyadditionalPage ,{ pagenav:"tasksegment",LangPageTag:this.LangPageTag });        
  }


  NextNav(PostID,PostTitle,PostStatus) {  
    console.log("PostStatus==",PostStatus);       
      this.navCtrl.push(TaskapprovePage,{PostID:PostID,PostTitle:PostTitle,PostStatus:PostStatus,LandPage:"tasksegment",LangPageTag:this.LangPageTag});            
  }
  segmentChanged(event) {   
      console.log(event.value)
      this.LangPageTag=event.value;
      if(event.value=='gotask'){
        this.gettasklist("open"); 
      }
      else{
        this.gettasklist("closed");  
      }
  } 
      
  onChangeTaskPower() { this.onTaskPower=true;   } 
   
  gettasklist(status){
    const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
    loader.present();  
    this.security.taskoncomwp(status).subscribe(result => {
      loader.dismiss();            
      if (result.status === 200) { 
        this.taskcompCom=true;
        this.taskongoingCom =true;  
        console.log("result.final_array==",result.final_array)
        if(status=='open'){
        
              this.taskreview=result.final_array.filter((mitem) => {
               return (mitem.reviewStatus.toLowerCase().indexOf("closed".toLowerCase()) > -1);
              })
              console.log("taskreview==",this.taskreview);  
          this.taskongoing=result.final_array.filter((mitem) => {
            return (mitem.reviewStatus.toLowerCase().indexOf("open".toLowerCase()) > -1);
           });   
        }  
        if(status=='closed'){
          this.taskcomp=result.final_array;       
        }     
        }    
     else {    }
   }, err => {    loader.dismiss();    console.log("err", err);  this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); return;    }
  );

  }

  ionViewDidLoad() {
    this.viewController.showBackButton(false)  
    console.log('ionViewDidLoad TasksegmentPage');
  }

}
