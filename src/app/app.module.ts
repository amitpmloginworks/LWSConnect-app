import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'; 
import { HttpModule } from '@angular/http'; 

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
import { PaymentPage } from '../pages/payment/payment';    
import { ProfilePage } from '../pages/profile/profile'; 
import { UpgradeplanmorePage } from '../pages/upgradeplanmore/upgradeplanmore';
import { WelcomescreenPage } from '../pages/welcomescreen/welcomescreen'; 
import { WlchourpopPage } from '../pages/wlchourpop/wlchourpop'; 

import { SecurityProvider } from '../providers/security/security';   

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
    TasksearchPage,
    PaymentPage,
    ProfilePage,
    UpgradeplanmorePage,
    WelcomescreenPage,
    WlchourpopPage
  ],
  imports: [
    BrowserModule,
    HttpModule,  
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
    TasksearchPage , 
    PaymentPage,
    ProfilePage,
    UpgradeplanmorePage,
    WelcomescreenPage ,
    WlchourpopPage      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityProvider
  ]
})
export class AppModule {}
