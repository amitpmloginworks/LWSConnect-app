import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
   
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let Arrfinal =[
      {
          "umeta_id": 3610,
          "user_id": 135,
          "meta_key": "nickname",
          "meta_value": "test31"
      },
      {
          "umeta_id": 3611,
          "user_id": 135,
          "meta_key": "first_name",
          "meta_value": "Amit"
      },
      {
          "umeta_id": 3612,
          "user_id": 135,
          "meta_key": "last_name",
          "meta_value": ""
      },
      {
          "umeta_id": 3613,
          "user_id": 135,
          "meta_key": "description",
          "meta_value": ""
      },
      {
          "umeta_id": 3614,
          "user_id": 135,
          "meta_key": "rich_editing",
          "meta_value": "true"
      },
      {
          "umeta_id": 3615,
          "user_id": 135,
          "meta_key": "syntax_highlighting",
          "meta_value": "true"
      },
      {
          "umeta_id": 3616,
          "user_id": 135,
          "meta_key": "comment_shortcuts",
          "meta_value": "false"
      },
      {
          "umeta_id": 3617,
          "user_id": 135,
          "meta_key": "admin_color",
          "meta_value": "fresh"
      },
      {
          "umeta_id": 3618,
          "user_id": 135,
          "meta_key": "use_ssl",
          "meta_value": "0"
      },
      {
          "umeta_id": 3619,
          "user_id": 135,
          "meta_key": "show_admin_bar_front",
          "meta_value": "true"
      },
      {
          "umeta_id": 3620,
          "user_id": 135,
          "meta_key": "locale",
          "meta_value": ""
      },
      {
          "umeta_id": 3621,
          "user_id": 135,
          "meta_key": "wp_capabilities",
          "meta_value": "a:2:{s:8:\"customer\";b:1;s:13:\"fast_customer\";b:1;}"
      },
      {
          "umeta_id": 3622,
          "user_id": 135,
          "meta_key": "wp_user_level",
          "meta_value": "0"
      },
      {
          "umeta_id": 3625,
          "user_id": 135,
          "meta_key": "last_update",
          "meta_value": "1551108488"
      },
      {
          "umeta_id": 3626,
          "user_id": 135,
          "meta_key": "billing_first_name",
          "meta_value": "Amit"
      },
      {
          "umeta_id": 3627,
          "user_id": 135,
          "meta_key": "billing_email",
          "meta_value": "test3@testttt.com"
      },
      {
          "umeta_id": 3628,
          "user_id": 135,
          "meta_key": "billing_phone",
          "meta_value": "8076863026"
      },
      {
          "umeta_id": 3629,
          "user_id": 135,
          "meta_key": "shipping_method",
          "meta_value": ""
      },
      {
          "umeta_id": 3630,
          "user_id": 135,
          "meta_key": "wc_last_active",
          "meta_value": "1553644800"
      },
      {
          "umeta_id": 3632,
          "user_id": 135,
          "meta_key": "_woocommerce_persistent_cart_1",
          "meta_value": "a:1:{s:4:\"cart\";a:1:{s:32:\"46ba9f2a6976570b0353203ec4474217\";a:11:{s:3:\"key\";s:32:\"46ba9f2a6976570b0353203ec4474217\";s:10:\"product_id\";i:284;s:12:\"variation_id\";i:0;s:9:\"variation\";a:0:{}s:8:\"quantity\";i:1;s:9:\"data_hash\";s:32:\"b5c1d5ca8bae6d4896cf1807cdf763f0\";s:13:\"line_tax_data\";a:2:{s:8:\"subtotal\";a:0:{}s:5:\"total\";a:0:{}}s:13:\"line_subtotal\";d:30;s:17:\"line_subtotal_tax\";i:0;s:10:\"line_total\";d:30;s:8:\"line_tax\";i:0;}}}"
      },
      {
          "umeta_id": 3633,
          "user_id": 135,
          "meta_key": "_ticket_count",
          "meta_value": "1"
      },
      {
          "umeta_id": 4113,
          "user_id": 135,
          "meta_key": "_order_count",
          "meta_value": "1"
      },
      {
          "umeta_id": 4114,
          "user_id": 135,
          "meta_key": "_money_spent",
          "meta_value": "30"
      },
      {
          "umeta_id": 5728,
          "user_id": 135,
          "meta_key": "_attachments",
          "meta_value": "http://182.156.204.228:3555/assets/img/user_136.png"
      },
      {
          "umeta_id": 6782,
          "user_id": 135,
          "meta_key": "billing_address_1",
          "meta_value": "D-64"
      },
      {
          "umeta_id": 6783,
          "user_id": 135,
          "meta_key": "billing_country",
          "meta_value": "India"
      },
      {
          "umeta_id": 6784,
          "user_id": 135,
          "meta_key": "billing_state",
          "meta_value": "New Delhi"
      },
      {
          "umeta_id": 6785,
          "user_id": 135,
          "meta_key": "billing_postcode",
          "meta_value": "110002"
      }
  ]
  

  var BillPostArr =  Arrfinal.filter(function(hero) { return hero.meta_key == "billing_postcode";  });
  if(BillPostArr.length != 0){ this.zipcode=BillPostArr[0].meta_value;  }

  var BillStateArr =  Arrfinal.filter(function(hero) { return hero.meta_key == "billing_state";  });
  if(BillStateArr.length != 0){ this.states=BillStateArr[0].meta_value;  }

  var BillCountryArr =  Arrfinal.filter(function(hero) { return hero.meta_key == "billing_country";  });
  if(BillCountryArr.length != 0){ this.CountrySelect=BillCountryArr[0].meta_value;  this.onCountry=true;   }
 
  var BillAddArr =  Arrfinal.filter(function(hero) { return hero.meta_key == "billing_address_1";  });
  if(BillAddArr.length != 0){ this.addresss=BillAddArr[0].meta_value;  }
  
  var BillMobArr =  Arrfinal.filter(function(hero) { return hero.meta_key == "billing_phone";  });
  if(BillMobArr.length != 0){ this.mobile=BillMobArr[0].meta_value;  }     

  }
  onChangeCountry(){
    this.onCountry=true; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
