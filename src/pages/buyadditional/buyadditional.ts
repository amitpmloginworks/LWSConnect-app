import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';      

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  GotoNext(title,price)  { 
    this.navCtrl.push(PaymentPage,{ title:title,price:price });    
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyadditionalPage');
  }

}
