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
 * Generated class for the TasksegmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasksegments',
  templateUrl: 'tasksegments.html',
})
export class TasksegmentsPage {

  createtask

  taskongoing:any;
  taskcomp:any;

  tasksrc:any;
  categorywp
  statuswp
  postname

  onTaskPower:boolean=false; 

  chooseOptions:any;
  taskreview:any=[];
  loadingImg
     
  taskreviewCom:boolean=false;
  taskcompCom:boolean =false;
  taskongoingCom:boolean =false;
  taskreviewseg:boolean = false;

  LangPageTag:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public modalCtrl:ModalController, public platform: Platform, public viewController:ViewController, public toastCtrl:ToastController,public loadingCtrl: LoadingController) {  
    this.taskreview=[];    
    this.LangPageTag ="forreview";
    this.loadingImg= this.security.LoadingURL()

  // Register for android's system back button
  let backAction =  platform.registerBackButtonAction(() => {
    this.navCtrl.pop();       
    this.navCtrl.setRoot(DashboardusrPage);
   backAction();    
  },1)        

this.tasksrc = this.navParams.get("tasksrc")

this.taskongoing=[];    
this.taskcomp=[]; 

if(this.navParams.get("LangPageTag") != undefined ) {
  this.LangPageTag=this.navParams.get("LangPageTag");       
}
else {
  this.LangPageTag="forreview"
}
console.log("this.LangPageTag==",this.LangPageTag)  
this.chooseOptions=this.LangPageTag;   

if(this.LangPageTag=='forreview') {   
  this.gettasklist("open"); 
}
 else if(this.LangPageTag=='gotask'){
   this.gettasklist("open"); 
 }
 else {  
   this.gettasklist("closed");  
 }


//if(this.navParams.get("ShowPopup") !=undefined)   {
  if(localStorage['showtaskpopup']=="" || localStorage['showtaskpopup']==null ) {
let successModal=this.modalCtrl.create(TaskpopupPage);  
localStorage['showtaskpopup']="yes";  
successModal.onDidDismiss(data => {     
})         
successModal.present();
}   
//}
 
// if(this.taskreview !=0 ) {
//   this.taskreviewseg=false;    
//   this.chooseOptions="forreview";  
// }

// if(this.taskreview ==0 ) {
//   this.taskreviewseg=true;  
//   this.chooseOptions="gotask";   
// }
  
}


NotifyBtn() {     
this.navCtrl.setRoot(DashboardusrPage);    
} 

GotoNext() {  
this.navCtrl.setRoot(AddtaskPage,{ pagenav:"tasksegments",LangPageTag:this.LangPageTag });            
}
  
UpgradeBtn(){  
this.navCtrl.setRoot(BuyadditionalPage,{ pagenav:"tasksegments",LangPageTag:this.LangPageTag });        
}


NextNav(PostID,PostTitle,PostStatus) {  
console.log("PostStatus==",PostStatus);        
 this.navCtrl.push(TaskapprovePage,{PostID:PostID,PostTitle:PostTitle,PostStatus:PostStatus,LandPage:"tasksegments",LangPageTag:this.LangPageTag});         
}
 
segmentChanged(event)  { 
  this.LangPageTag=event.value      
 console.log(event.value)
 if(event.value=='forreview') {   
  this.gettasklist("open"); 
}
 else if(event.value=='gotask'){
   this.gettasklist("open"); 
 }
 else {  
   this.gettasklist("closed");  
 }
} 
 
onChangeTaskPower() { this.onTaskPower=true;   } 

gettasklist(status)  {     
  const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
  loader.present();  
this.security.taskoncomwp(status).subscribe(result => { 
  loader.dismiss();          
 if (result.status === 200) {  
   this.taskreviewCom=true;
   this.taskcompCom=true;
  this.taskongoingCom =true;  
   console.log("result.final_array==",result.final_array)
   if(status=='open'){ 
    this.taskreview=result.final_array.filter((mitem) => {
      return (mitem.reviewStatus.toLowerCase().indexOf("closed".toLowerCase()) > -1);
     }) 
     console.log("result.taskreview==",this.taskreview)   
     this.taskongoing=result.final_array.filter((mitem) => {
      return (mitem.reviewStatus.toLowerCase().indexOf("open".toLowerCase()) > -1);
     });        
   }  
   if(status=='closed') {
    this.taskreview=result.final_array.filter((mitem) => {
      return (mitem.reviewStatus.toLowerCase().indexOf("closed".toLowerCase()) > -1);
     }) 
     this.taskcomp=result.final_array;       
   }     
   }    
else {    }
}, err => {   loader.dismiss();   
   console.log("err", err);   
   this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); 
   return;  
  }  
);
}


ionViewDidLoad() {
    this.viewController.showBackButton(false)   
    console.log('ionViewDidLoad TasksegmentsPage');
  }

}
