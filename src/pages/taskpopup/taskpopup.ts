import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TaskpopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taskpopup',
  templateUrl: 'taskpopup.html',
})
export class TaskpopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
     
  }
   
  ok()  {     
    //this.viewCtrl.dismiss("complete");   
  }

  taskbtn() {     
    this.viewCtrl.dismiss("complete");    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskpopupPage');
  }

}
