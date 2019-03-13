import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskPage } from '../task/task';  

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

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
        
  taskallarr:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider) {

    this.security.tasklist().subscribe(result => {         
      if (result.status === 200) { 
        console.log("result.final_array==",result.final_array)  
        this.taskallarr=result.final_array;       
        }    
     else {    }
   }, err => {  console.log("err", err);   }
  ); 
  
  }

  GoToNext(PostID,PostTitle){
    this.navCtrl.push(TaskPage,{ taskID : PostID, PostTitle: PostTitle } );    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskallPage');
  }

}
