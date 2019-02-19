import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the UpgradeplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upgradeplan',
  templateUrl: 'upgradeplan.html',
})
export class UpgradeplanPage {
  @ViewChild(Slides) slides: Slides; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


slideChanged() {
  let currentIndex = this.slides.getActiveIndex();
  console.log(currentIndex) 
}

showImage() {
 
}    


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeplanPage');
  }

}
