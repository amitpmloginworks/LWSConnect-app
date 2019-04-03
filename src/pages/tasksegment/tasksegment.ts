import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { TaskpopupPage } from '../taskpopup/taskpopup';  

import { TaskapprovePage } from '../taskapprove/taskapprove';   

/**
 * Generated class for the TasksegmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasksegment',
  templateUrl: 'tasksegment.html',
})
export class TasksegmentPage {

  createtask

  taskongoing:any;
  taskcomp:any;

  tasksrc:any;
  categorywp
  statuswp
  postname

  onTaskPower:boolean=false; 

  chooseOptions:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public modalCtrl:ModalController) {

    this.chooseOptions="gotask";   

    this.tasksrc = this.navParams.get("tasksrc")

    this.taskongoing=[];    
    this.taskcomp=[]; 
   
    this.gettasklist("open");   

    let successModal=this.modalCtrl.create(TaskpopupPage);   
    successModal.onDidDismiss(data => {     
    
    })      
    successModal.present();


  }
 
  NextNav(PostID){
      this.navCtrl.push(TaskapprovePage,{PostID:PostID});         
  }
  segmentChanged(event) {   
      console.log(event.value)
      if(event.value=='gotask'){
        this.gettasklist("open"); 
      }
      else{
        this.gettasklist("closed");  
      }
  }
      
  onChangeTaskPower() { this.onTaskPower=true;   } 
   
  gettasklist(status){

    this.security.taskoncomwp(status).subscribe(result => {         
      if (result.status === 200) { 
        console.log("result.final_array==",result.final_array)
        if(status=='open'){
          this.taskongoing=result.final_array;   
        }  
        if(status=='closed'){
          this.taskcomp=result.final_array;       
        }     
        }    
     else {    }
   }, err => {  console.log("err", err);   }
  );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksegmentPage');
  }

}
