import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'; 

import { UpgradeplanmorePage } from '../upgradeplanmore/upgradeplanmore';  
import { UpgradeplanPage } from '../upgradeplan/upgradeplan';
import { NotificationPage } from '../notification/notification';   

import FusionCharts from 'fusioncharts/core'
 
// include chart from viz folder - import ChartType from fusioncharts/viz/[ChartType];
import Column2D from 'fusioncharts/viz/column2d'; 
import Doughnut2d from 'fusioncharts/viz/doughnut2d'; 
import { AddtaskPage } from '../addtask/addtask';

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
 
  CreateBtn() {     
    this.navCtrl.push(AddtaskPage); 
  }
  UpgradeBtn(){
    this.navCtrl.push(UpgradeplanPage);  
  }
  NotifyBtn(){  
    this.navCtrl.push(NotificationPage);
  }  
 
ChartjsCall(){
    // add chart as dependency - FusionCharts.addDep(ChartType);
FusionCharts.addDep(Doughnut2d);  
// instantiate the chart.
var chartInstance = new FusionCharts({
      type: 'doughnut2d',  
      renderAt: 'chart-container',
      width: '100%', 
      height: '50%', 
      dataFormat: 'json',
      dataSource: {
        "chart": {  
          "numberPrefix": "$",
          "bgColor": "#ffffff",
          "startingAngle": "310",
          "showLegend": "1",
          "defaultCenterLabel": "Total revenue: $64.08K",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
       
        },
        "data": [{
          "label": "Food",
          "value": "285040"
        }, {
          "label": "Apparels",
          "value": "146330"
        }]
      }  
  // type: 'doughnut2d', 
  // renderAt: "chart-container", 
  // width: "600",
  // height: "400",
  // dataFormat: "json",
  // dataSource: {
  //     chart: {
  //       caption: "Countries With Most Oil Reserves [2017-18]",
  //       subcaption: "In MMbbl = One Million barrels"
  //     },
  //     data: [
  //       { label: "Venezuela", value: "290000" },
  //       { label: "Saudi", value: "260000" },
  //       { label: "Canada", value: "180000" },
  //       { label: "Iran", value: "140000" },
  //       { label: "Russia", value: "115000" },
  //       { label: "UAE", value: "100000" },
  //       { label: "US", value: "30000" },
  //       { label: "China", value: "30000" }
  //     ]
  //   }




});
// render the chart
chartInstance.render();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardusrPage'); 
   
    let gradient = this.doughnutCanvas.nativeElement.getContext('2d').createLinearGradient(170, 227, 125,0.1);
    gradient.addColorStop(0,'#fff'); 
    gradient.addColorStop(1, 'green');
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["white","Red",],  
        datasets: [{ 
          data: [
            "20","30"    
          ], 
          backgroundColor:["#ffffff",gradient]
        }]    
      },
      options: {
        legend: {
          display: true, 
          position :top
        },
        tooltips: {
          enabled: true
        },
        title: {
          display: false,
          fontStyle: 'bold',
          fontSize: 9    
        },
        cutoutPercentage : 40        
      },
    }); 
    
  }     

  ChartDoughtnut(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            "25","75" 
          ], 
          backgroundColor: [
            '#FFF','linear-gradient(#4DD8A0,#AAE37D)' 
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
        cutoutPercentage : 40        
      },
    });
  }

   



}
