import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController, Platform } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';   

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { TasksegmentsPage } from '../tasksegments/tasksegments';   
import { TasksegmentPage } from '../tasksegment/tasksegment';  
import { DashboardusrPage } from '../dashboardusr/dashboardusr';  

/**
 * Generated class for the BuyadditionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyadditional',
  templateUrl: 'buyadditional.html',
})
export class BuyadditionalPage {
  ErrMsg="";
  getresult;
  loadingImg
  
  pagenavTO
  LangPageTag
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider, public toastCtrl:ToastController,public loadingCtrl: LoadingController,public viewController: ViewController, public platform:Platform) {

    this.pagenavTO=this.navParams.get("pagenav"); // Landing Page
    this.LangPageTag=this.navParams.get("LangPageTag"); // Landing Page tag  
          

    this.loadingImg= this.security.LoadingURL()

     // Register for android's system back button
     let backAction =  platform.registerBackButtonAction(() => {
      if(this.pagenavTO == "tasksegments"){
       this.navCtrl.setRoot(TasksegmentsPage);
      } 
      else if(this.pagenavTO == "tasksegment"){
       this.navCtrl.setRoot(TasksegmentPage,{LangPageTag:this.LangPageTag});
      }      
       else {
         this.navCtrl.setRoot(DashboardusrPage);
       }
      backAction();    
     },1)   


    this.GetData();
  }

  NotifyBtn() {    
    if(this.pagenavTO == "tasksegments"){
      this.navCtrl.setRoot(TasksegmentsPage,{LangPageTag:this.LangPageTag});
     } 
     else if(this.pagenavTO == "tasksegment"){
      this.navCtrl.setRoot(TasksegmentPage,{LangPageTag:this.LangPageTag});
     } 
      else {
        this.navCtrl.setRoot(DashboardusrPage);
      }  
  } 

    
  GetData() {  
    this.ErrMsg=""; 
    const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
    loader.present();  
    this.security.buyadditional().subscribe(result => {    
      console.log("result==",result);
      loader.dismiss();  
       if (result.wpstatus === 1) {   
           this.getresult=result.final_array; 
       }
      else {  
        this.ErrMsg=result.message;          
      }
    }, err => {  
      loader.dismiss();  
      console.log("err", err); 
      this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present();
       return; 
    }); 
  }      

  GotoNext(title,price,balance,total,ItemPrice)  {            
    this.navCtrl.push(PaymentPage,{ title:title,price:price,balance:balance,total:total,ItemPrice:ItemPrice });    
  }  

  ionViewDidLoad() {
    this.viewController.showBackButton(false);        
    console.log('ionViewDidLoad BuyadditionalPage');
  }




}
