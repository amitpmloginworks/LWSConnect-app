import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  public modal: ModalController) {

    
  }


  GotoNext() {
    let firewallTypeModal=this.modal.create(HomePage);    
    firewallTypeModal.present(); 
  }
 
 BacktoLogin() {
   this.navCtrl.pop();
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }

}
