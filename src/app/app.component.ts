import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { ForgetpassPage } from '../pages/forgetpass/forgetpass';
import { AddlogPage } from '../pages/addlog/addlog';  
import { DashboardPage } from '../pages/dashboard/dashboard';   
import { NotificationPage } from '../pages/notification/notification';   

import { AddtaskPage } from '../pages/addtask/addtask';   
import { AddtasknewPage } from '../pages/addtasknew/addtasknew';
import { DashboardusrPage } from '../pages/dashboardusr/dashboardusr';  

import { HourslogPage } from '../pages/hourslog/hourslog';   
import { UpgradeplanPage } from '../pages/upgradeplan/upgradeplan'; 
import { TaskPage } from '../pages/task/task';   
 
import { TaskallPage } from '../pages/taskall/taskall';    
import { TasksearchPage } from '../pages/tasksearch/tasksearch';     

@Component({   
  templateUrl: 'app.html'
})
export class MyApp {   
  rootPage:any = TaskallPage;                                              
  //    https://xd.adobe.com/spec/3234571d-52da-4f25-74c0-ab1f150a5bea-4405/          // agent
  //      https://xd.adobe.com/spec/65ae4756-638a-4422-75bf-25cbe38ea275-139f/         // user
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

