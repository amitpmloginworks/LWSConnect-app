import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForgetpassPage } from '../forgetpass/forgetpass';
import { AddlogPage } from '../addlog/addlog';  

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ForgetNext(){
    this.navCtrl.push(ForgetpassPage); 
  }

  GotoNext(user,pass) {  
    this.navCtrl.setRoot(AddlogPage);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
