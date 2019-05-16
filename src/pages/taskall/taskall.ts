import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Events, ToastController, LoadingController } from 'ionic-angular';
import { TaskPage } from '../task/task';      

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { TasksearchPage } from '../tasksearch/tasksearch'; 
import { HomePage } from '../home/home';
import { DashboardusrPage } from '../dashboardusr/dashboardusr'; 
import { AddtaskPage } from '../addtask/addtask';   

/**
 * Generated class for the TaskallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taskall',
  templateUrl: 'taskall.html',
})
export class TaskallPage {
        
  createtask

  taskallarr:any;
  tasksrc:any;
  categorywp
  statuswp
  postname

  noarray:boolean = false;

  loadingImg

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public modalCtrl:ModalController, public platform:Platform, public viewController:ViewController,public events: Events,public loadingCtrl: LoadingController, public toastCtrl:ToastController)  {            
    this.tasksrc = this.navParams.get("tasksrc")
    this.taskallarr=[]; 

    this.loadingImg= this.security.LoadingURL()
 
if(this.tasksrc == undefined){
  this.events.publish('userrole:usrrole',localStorage['userid'], Date.now());  
  this.createtask=this.navParams.get("createtask");     
  if(this.createtask =="createtask"){ 
    //this.gettasklistNoLoader();    
    let successModal=this.modalCtrl.create(HomePage, { ParamsTXT:"createtask" });   
    successModal.onDidDismiss(data => {     
      if(data=="createtask"){ 
        console.log("back param=",data); 
        this.gettasklist();   
      }
    })
    successModal.present();
  }   
  else{ 
    this.gettasklist();  
  }
}
else {
this.postname=this.navParams.get("postname");
this.statuswp=this.navParams.get("statuswp");
this.categorywp=this.navParams.get("categorywp");
const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
loader.present();
  this.security.tasklistsrc(this.postname,this.statuswp,this.categorywp).subscribe(result => {         
    if (result.status === 200) { 
      loader.dismiss();  
      console.log("result.final_array 1==",result.final_array)  
      this.taskallarr=result.final_array; 
      if(result.final_array.length == 0 ){
        this.noarray = true;
      }      
      }    
   else {     loader.dismiss();      }
 }, err => {      loader.dismiss();    console.log("err", err);  this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); return;   }
);
}


 // Register for android's system back button
 let backAction =  platform.registerBackButtonAction(() => {
  // this.navCtrl.pop();   
   this.navCtrl.setRoot(DashboardusrPage);
  backAction();    
 },1)  


}

NotifyBtn()   {  
  this.navCtrl.setRoot(DashboardusrPage);    
}


gettasklist() {  
  const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
  loader.present();   
  this.security.tasklist().subscribe(result => {         
    if (result.status === 200) { 
      loader.dismiss();  
      console.log("result.final_array==",result.final_array)  
      this.taskallarr=result.final_array; 
      if(this.createtask == undefined){
        if(result.final_array.length == 0 ){
          this.noarray = true;
          this.navCtrl.setRoot(AddtaskPage);
        }   
        return;
      }     
      }    
   else {       loader.dismiss();     }
 }, err => {       loader.dismiss();   console.log("err", err);  this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); return;    }
);
}

gettasklistNoLoader(){
  this.security.tasklist().subscribe(result => {         
    if (result.status === 200) { 
      console.log("result.final_array==",result.final_array)  
      this.taskallarr=result.final_array; 
      if(this.createtask == undefined){
        if(result.final_array.length == 0 ){
          this.noarray = true;
          this.navCtrl.setRoot(AddtaskPage);
        }   
        return;
      }     
      }    
   else {          }
 }, err => {    console.log("err", err); 
  this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); 
  return;    
  }   
);
}
 

  srcbtn()  {  
    this.navCtrl.push(TasksearchPage);   
  } 


  GoToNext(PostID,PostTitle){
    this.navCtrl.push(TaskPage,{ taskID : PostID, PostTitle: PostTitle } );    
  }


  ionViewDidLoad() {
    this.viewController.showBackButton(false)  
    console.log('ionViewDidLoad TaskallPage');
  }

    
}
