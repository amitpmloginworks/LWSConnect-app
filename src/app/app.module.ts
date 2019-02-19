import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    ForgetpassPage,
    AddlogPage,
    DashboardPage,
    NotificationPage,
    AddtaskPage,
    AddtasknewPage,
    DashboardusrPage,
    HourslogPage,
    UpgradeplanPage,
    TaskPage,
    TaskallPage,
    TasksearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    ForgetpassPage,
    AddlogPage,
    DashboardPage,
    NotificationPage,
    AddtaskPage,
    AddtasknewPage,
    DashboardusrPage ,
    HourslogPage ,
    UpgradeplanPage ,
    TaskPage ,
    TaskallPage,
    TasksearchPage   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
