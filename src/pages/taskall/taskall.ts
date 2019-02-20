import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskPage } from '../task/task';  

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  GoToNext(){
    this.navCtrl.push(TaskPage); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskallPage');
  }

}
