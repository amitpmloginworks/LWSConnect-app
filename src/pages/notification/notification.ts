import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, LoadingController, Platform } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { DashboardusrPage } from '../dashboardusr/dashboardusr'; 
  

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifyArr:any
  ComeServer:boolean=false;
  loadingImg
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public events: Events, public toastCtrl: ToastController,public loadingCtrl: LoadingController, public platform:Platform)   {     

         // Register for android's system back button
         let backAction =  platform.registerBackButtonAction(() => {
          // this.navCtrl.pop();   
           this.navCtrl.setRoot(DashboardusrPage);
          backAction();    
         },1)   


    this.loadingImg= this.security.LoadingURL()
    this.notifyArr=[];
    const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
    loader.present();  
    this.security.getnotify().subscribe(result => {              
      if (result.status === 200) { 
        loader.dismiss();  
          this.notifyArr=result.getdata;
          this.ComeServer=true;     
          this.events.publish('userrole:usrrole',localStorage['userid'], Date.now())        
        }    
     else {    }
   }, err => {    loader.dismiss();   console.log("err", err); 
   this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); return; 
  } 
  );
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
