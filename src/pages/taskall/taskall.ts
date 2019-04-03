import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskPage } from '../task/task';  

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { TasksearchPage } from '../tasksearch/tasksearch'; 
import { HomePage } from '../home/home';

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
        
  createtask

  taskallarr:any;
  tasksrc:any;
  categorywp
  statuswp
  postname

  noarray:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public modalCtrl:ModalController) {      
    this.tasksrc = this.navParams.get("tasksrc")
    this.taskallarr=[]; 


  if(this.tasksrc == undefined){ 
    this.gettasklist();   
  this.createtask=this.navParams.get("createtask");
  if(this.createtask =="createtask"){   
    let successModal=this.modalCtrl.create(HomePage, { ParamsTXT:"createtask" });   
    successModal.onDidDismiss(data => {     
      if(data=="createtask"){
        console.log("back param=",data); 
        //this.gettasklist()  
      }
    })
    successModal.present();
  }   
  else{
   // this.gettasklist();
  }
}
else {
    
this.postname=this.navParams.get("postname");
this.statuswp=this.navParams.get("statuswp");
this.categorywp=this.navParams.get("categorywp");
  
  this.security.tasklistsrc(this.postname,this.statuswp,this.categorywp).subscribe(result => {         
    if (result.status === 200) { 
      console.log("result.final_array 1==",result.final_array)  
      this.taskallarr=result.final_array; 
      if(result.final_array.length == 0 ){
        this.noarray = true;
      }      
      }    
   else {    }
 }, err => {  console.log("err", err);   }
);
}



}

gettasklist(){     
  this.security.tasklist().subscribe(result => {         
    if (result.status === 200) { 
      console.log("result.final_array==",result.final_array)  
      this.taskallarr=result.final_array;  
      if(result.final_array.length == 0 ){
        this.noarray = true;
      }      
      }    
   else {    }
 }, err => {  console.log("err", err);   }
);
}
 
  srcbtn(){
    this.navCtrl.push(TasksearchPage);   
  }

  GoToNext(PostID,PostTitle){
    this.navCtrl.push(TaskPage,{ taskID : PostID, PostTitle: PostTitle } );    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskallPage');
  }

}
