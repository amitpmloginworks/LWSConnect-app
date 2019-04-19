import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  onCountry:boolean=false;
  email
  mobile
  addresss
  CountrySelect
  states
  zipcode

  pimg
   
  Arrfinal=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider) {  
    
    this.pimg ="assets/imgs/newimg/group550.png";     
    
    this.security.getprofile().subscribe(result => {            
        if (result.status === 200) { 
          console.log("result.final_array==",result.getdata)  
          this.Arrfinal=result.getdata;  

    var EmailArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_email";  });
  if(EmailArr.length != 0){ this.email=EmailArr[0].meta_value;  }   

  var BillPostArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_postcode";  });
  if(BillPostArr.length != 0){ this.zipcode=BillPostArr[0].meta_value;  }

  var BillStateArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_state";  });
  if(BillStateArr.length != 0){ this.states=BillStateArr[0].meta_value;  }

  var BillCountryArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_country";  });
  if(BillCountryArr.length != 0){ this.CountrySelect=BillCountryArr[0].meta_value;  this.onCountry=true;   }
 
  var BillAddArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_address_1";  });
  if(BillAddArr.length != 0){ this.addresss=BillAddArr[0].meta_value;  }
  
  var BillMobArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_phone";  });
  if(BillMobArr.length != 0){ this.mobile=BillMobArr[0].meta_value;  }   
  
  var imgArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "_attachments";  });
  if(imgArr.length != 0){ this.pimg=imgArr[0].meta_value;  }           

          }    
       else {    }
     }, err => {  console.log("err", err);   }
    ); 
  }
  onChangeCountry(){
    this.onCountry=true; 
  }

  GotoNext(){
    this.security.updateprofile(this.addresss,this.CountrySelect,this.states,this.zipcode,this.mobile).subscribe(result => {            
        if (result.status === 200) { 
          console.log("result==",result)    
          }    
       else {    }
     }, err => {  console.log("err", err);   }
    ); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
