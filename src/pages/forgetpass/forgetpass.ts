import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'  
import { TimerObservable } from 'rxjs/observable/TimerObservable'; 

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'

import { LoginworksurlPage } from '../loginworksurl/loginworksurl';   

/**
 * Generated class for the ForgetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {

  validation:FormGroup

  emailid:any;

  ErrMsg:any;
  loadingImg
  constructor(public navCtrl: NavController, public navParams: NavParams,  public modal: ModalController, public security :SecurityProvider, public http:Http,public formbuilder:FormBuilder, public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.loadingImg= this.security.LoadingURL()
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Email validation 


    this.validation=formbuilder.group({
      EmailID:['',Validators.compose([Validators.maxLength(50),this.noWhitespaceValidator, Validators.pattern(emailRegex), Validators.required])], 
      })   
       
  }

  
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  GotoNext() {
    const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
    loader.present();   
    this.security.resetpass(this.emailid).subscribe(result => {      
      if (result.status === 200) { 
        if(result.wpstatus == 1){
          loader.dismiss(); 
          let firewallTypeModal=this.modal.create(HomePage, { ParamsTXT:"forgetpass" }); 
          firewallTypeModal.onDidDismiss(data => {  if(data=="forgetpass"){  this.navCtrl.pop(); }  })
          firewallTypeModal.present();  
        }  
        else {     loader.dismiss();  this.ErrMsg=result.message;   }     
      }    
     else {     loader.dismiss();  this.ErrMsg=result.message;   }       
   }, err => {    loader.dismiss();   console.log("err", err); this.ErrMsg="Please check your internet connection and try again";  }
  ); 
}
 
 BacktoLogin() {
   this.navCtrl.pop();
 }

 GotoLoginworks(){ 
  this.navCtrl.push(LoginworksurlPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }

}
