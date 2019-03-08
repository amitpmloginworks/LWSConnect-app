import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ForgetpassPage } from '../forgetpass/forgetpass';
import { AddlogPage } from '../addlog/addlog'; 
import { DashboardusrPage } from '../dashboardusr/dashboardusr';    

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'


/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {   
  EmailID
  Password
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController, public http:Http, public security:SecurityProvider, public alertCtrl:AlertController) { 
    this.EmailID="chetan.singh@loginworks.com";
    this.Password="wC$tb#Q%%ou%"; 

  }


  ForgetNext(){
    this.navCtrl.push(ForgetpassPage); 
  }


  GotoNext(EmailID,Pass) {          
    let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
    loading.present();    
       this.security.loginCheck(EmailID,Pass).subscribe(result => {    
         console.log("result==",result);
          loading.dismiss();   
          if (result.status === 200) {
              console.log(result.getdata[0].ID)  
              localStorage['loginactive']="loginusr";
                localStorage['userid']=result.getdata[0].ID;        
                  this.navCtrl.setRoot(DashboardusrPage);         
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

   
}
