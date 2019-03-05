import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'    

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
  chats = [];
  tasklistArr=[]; 
  taskID:any;   
  myString 
  replyarea
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public loadingCtrl: LoadingController, public toastCtrl:ToastController, public security :SecurityProvider, public http:Http) {
    localStorage['userid']=135  
    this.taskID="665";     
    this.myString = "Pipes are super cool";
    this.GetData();      
  }

  GetData() {
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
    loading.present();    
       this.security.MyTaskDetail(this.taskID).subscribe(result => {    
          loading.dismiss();   
          if (result.status === 200) { 
              this.tasklistArr=result.final_array          
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

  SendReply(){   
  if(this.replyarea =="" || this.replyarea == undefined){
  this.toastCtrl.create({ message: `Please enter your message.`, duration: 4000, position: 'top' }).present();
  return; 
  }  
    var taskcontent="<p>"+this.replyarea+"</p>";  
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
    loading.present();    
       this.security.MyTaskDetailBtn(this.taskID,taskcontent).subscribe(result => {    
          loading.dismiss();   
          if (result.status === 200) {  
            this.replyarea = "";
            this.toastCtrl.create({ message: result.message, duration: 4000, position: 'top' }).present(); return;     
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

  ionViewDidLoad() {   
    console.log('ionViewDidLoad TaskPage');
    // this.chats.push(  
    //   {"styleClass": "chat-message left", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":2 },        
    //   {"styleClass": "chat-message right", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":1 },
    //   {"styleClass": "chat-message left", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":2 } 
    // );
  }

}
