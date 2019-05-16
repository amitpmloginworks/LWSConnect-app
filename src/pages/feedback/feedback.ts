import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {  

  validation:FormGroup

  rate:number=0

  images=["assets/imgs/yellow_star_rating.png",    
  "assets/imgs/yellow_star_rating.png",
  "assets/imgs/yellow_star_rating.png",
  "assets/imgs/yellow_star_rating.png",
  "assets/imgs/yellow_star_rating.png",
  ] 
 
ratevalidator:boolean = false;
PostID:any;
contents:any;

ErrMsg:any="";
ErrMsgvalidator:boolean = false;
loadingImg  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public formbuilder:FormBuilder, public http:Http, public security:SecurityProvider, public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.PostID=this.navParams.get("PostID");
    this.loadingImg= this.security.LoadingURL()
    this.validation=formbuilder.group({
      EmailID:['',Validators.compose([Validators.required, Validators.maxLength(1000),this.noWhitespaceValidator ])] 
    }) 
  }

  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true } 
  }

giveRating(i)   {     
    //var imageStr=  (<HTMLImageElement>document.querySelector("image_"+i)).src    
var imageStr= (<HTMLInputElement>document.getElementById("image_"+i)).src   
var ratingImage=imageStr.search("yellow_star.png");  
console.log("this.images.length==",this.images.length)     
console.log("i==",i);    
if(ratingImage!=-1){
  this.rate=i;        
  for(var j=5; j>i; j--){ 
    var setindex = j-1;     
    //console.log("for loop==",j);         
    //console.log("for loop setindex ==",setindex);      
   (<HTMLInputElement>document.getElementById("image_"+setindex)).src = "assets/imgs/yellow_star_rating.png";
    //document.getElementById('img').setAttribute( 'src', 'assets/imgs/myconnection/yellow_star_rating.png' );
  }
}
else{
  this.rate=i+1;
  console.log("this.images.length==",this.images.length)   
  console.log("i==",i)   
  for(var j=0; j<i+1; j++){         
    //console.log("for loop==",j);      
    (<HTMLInputElement>document.getElementById("image_"+j)).src = "assets/imgs/yellow_star.png";
   // document.getElementById('img').setAttribute( 'src', 'assets/imgs/myconnection/star.png' );
  }
}
 
if(this.rate == 0){
  this.ratevalidator = true;
}
}

cancel(){
  this.viewCtrl.dismiss("setopen"); 
}

   
ok() { 
  if(this.rate == 0) {    
    this.ratevalidator = true;  
    return;
  }  
  const loader = this.loadingCtrl.create({ spinner: 'hide', content: this.loadingImg , cssClass: 'transparent' });         
  loader.present();  
  this.security.taskfeedback(this.PostID,this.rate,this.contents).subscribe(result => { 
    loader.dismiss();     
     if(result.wpstatus === 1) {   this.viewCtrl.dismiss("setclosed");  }   
    else  {     this.ErrMsg=result.message;  this.ErrMsgvalidator=true;  }
  }, err => {     loader.dismiss();  
    console.log("err", err);  
    this.ErrMsg="No internet connection, Please connect to internet !";  
    this.ErrMsgvalidator=true;      
  }); 
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}
