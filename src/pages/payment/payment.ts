import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'; 

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage { 
  Amounts:any;
  currency:any;

  price:any;
  title:any;   
  constructor( public navCtrl: NavController, public navParams: NavParams,public toastCtrl : ToastController,public payPal: PayPal ) { 
    this.title=this.navParams.get("title");
    this.price=this.navParams.get("price");
    this.Amounts=1;
    this.currency="USD"; 
  }

   
  navigatetoschooldetails() { 

  this.payPal.init({
    PayPalEnvironmentProduction: 'AZ0pKY1B0TdV2NvtihDgaanO22BIHjydaUc55DWGQ8nakr_GQXVJr7Hagr2oStosIinKioa71MB2vQfb',
    PayPalEnvironmentSandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
  }).then(() => {  
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({ 
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal 
    })).then((resrender) => {
      console.log("resrender == ", resrender)    
      let payment = new PayPalPayment(this.Amounts, this.currency, 'LW Connect payment', 'sale'); 
      this.payPal.renderSinglePaymentUI(payment).then((res) => {
        console.log("response == ", res)
        // Successfully paid  
        let paymentid=res.response.id;  
        this.toastCtrl.create({ message: 'Payment success ', duration: 3000, position: 'top' }).present();
        return;
        // Example sandbox response
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, (errdialog) => {
        // payment cancelled   
        console.log("errdialog == ", errdialog);
        this.toastCtrl.create({ message: 'Payment cancelled ', duration: 3000, position: 'top' }).present();
        return;
        // Error or render dialog closed without being successful
      });
    }, (errconfig) => {
      console.log("errconfig == ", errconfig)
      // Error in configuration
      this.toastCtrl.create({ message: 'Error in configuration', duration: 3000, position: 'top' }).present();
      return;
    });
  }, (errinitialization) => {
    console.log("errinitialization == ", errinitialization)
    // Error in initialization, maybe PayPal isn't supported or something else
    this.toastCtrl.create({ message: "Error in initialization, maybe PayPal isn't supported or something else", duration: 3000, position: 'top' }).present();   
    return;
  });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }


   
}
