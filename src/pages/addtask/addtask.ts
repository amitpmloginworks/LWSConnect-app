import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

/**
 * Generated class for the AddtaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {
  onTask:boolean = false;  
  onTaskPower:boolean = false; 
  SelectArr:any=[];
  title:any;  
  contents:any;
  PowerSelect:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider) {
  
      this.security.Categorylist().subscribe(result => {      
          if (result.status === 200) { 
            console.log("result.final_array==",result.final_array)  
            this.SelectArr=result.final_array;  
            }    
         else {    }
       }, err => {  console.log("err", err);   }
      ); 

  }

  onChangeTask()  { this.onTask=true;    }  

  onChangeTaskPower() { this.onTaskPower=true;   } 

  GotoNext()  {
    let postcontent="<p>"+this.contents+"<p>";
    this.security.CreateTask(postcontent,this.title,this.PowerSelect).subscribe(result => {      
      if (result.status === 200) { 
        this.onTaskPower=false;
        this.title="";
        this.PowerSelect="";
        this.contents=""; 
      }    
     else {    }
   }, err => {  console.log("err", err);   }
  ); 
  }
   

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskPage');
  }

  
}