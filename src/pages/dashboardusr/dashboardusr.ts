import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'; 

/**
 * Generated class for the DashboardusrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboardusr',
  templateUrl: 'dashboardusr.html',
})
export class DashboardusrPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardusrPage'); 
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [80,50], 
          backgroundColor: [
            '#4BF3F3','#FF6182' 
          ]
        }]    
      },
      options: {
        legend: {
          display: true, 
          position :top
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false,
          fontStyle: 'bold',
          fontSize: 9    
        },
        cutoutPercentage : 75        
      },
    });
  }

}
