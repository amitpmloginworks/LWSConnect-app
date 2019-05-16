import { Injectable } from '@angular/core';
import{ENV}from'../../app/env'
import { Type } from '@angular/compiler/src/output/output_ast';
import { Http, Request, Response, Headers, RequestOptions, RequestMethod, HttpModule } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the SecurityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class SecurityProvider { 

  constructor(public http: Http) {       
    console.log('Hello SecurityProvider Provider');
  }
      
  ImageUrlLink()  {  
    return ENV.mainApi;
  }

  LoadingURL()  {  
    return '<img src="assets/LW-Connect-1.gif" style="width: 50%;" class="loadingimg">';       
  }      

loginCheck(username,password)  {  
  
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({  emailid:username, password:password   }) 
  return this.http.post(ENV.mainApi + '/login',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json(); 
  },  err => {  console.error('Oops:', err.message);  }
  )

}

MyTaskDetail(postid)  {        
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({  postid:postid, userid:localStorage['userid']  })   
  return this.http.post(ENV.mainApi + '/mytask',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json(); 
  },  err => {  console.error('Oops:', err.message);  }
  )
}

MyTaskDetailBtn(postid,postcontent)  {    
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({  postid:postid, userid:localStorage['userid'],postcontent:postcontent  })   
  return this.http.post(ENV.mainApi + '/mytaskreply',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json(); 
  },  err => {  console.error('Oops:', err.message);  }
  )
}

Categorylist()  {    
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ userid:localStorage['userid'] })    
  return this.http.post(ENV.mainApi + '/taskcat',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json(); 
  },  err => {  console.error('Oops:', err.message);  }
  )
}

CreateTask(postcontent,posttitle,postcat)  {   

  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ userid:localStorage['userid'],postcontent:postcontent,posttitle:posttitle,postcat:postcat })    
  return this.http.post(ENV.mainApi + '/taskcreate',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json(); 
  },  err => {  console.error('Oops:', err.message);  }
  )
}


tasklist(){    
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ userid:localStorage['userid'] })    
  return this.http.post(ENV.mainApi + '/tasklist',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();   
  },  err => {  console.error('Oops:', err.message);  }
  )
}
               
tasklistsrc(postname,statuswp,categorywp){    
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ userid:localStorage['userid'], postname:postname, status:statuswp, category:categorywp })    
  return this.http.post(ENV.mainApi + '/tasksrc',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();   
  },  err => {  console.error('Oops:', err.message);  }
  )
}

taskactiveDash(){      
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ userid:localStorage['userid'] })     
  return this.http.post(ENV.mainApi + '/taskactivedash',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();   
  },  err => {  console.error('Oops:', err.message);  }
  )
}

taskactive(){    
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ userid:localStorage['userid'] })     
  return this.http.post(ENV.mainApi + '/taskactive',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();   
  },  err => {  console.error('Oops:', err.message);  }
  )
}
  
resetpass(emailid){      
  let headers = new Headers({ 'content-type': 'application/json'})
  let requestOptions=new RequestOptions({headers:headers})
  let param=JSON.stringify({ emailid:emailid })      
  return this.http.post(ENV.mainApi + '/forgetpass',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}


dashboard(){       
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({ userid:localStorage['userid'] });    
  return this.http.post(ENV.mainApi + '/dashboard',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}   

taskoncomwp(status)  {           
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({ userid:localStorage['userid'], status:status });       
  return this.http.post(ENV.mainApi + '/taskoncomp',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}

taskrightside(taskid)  {           
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({ userid:localStorage['userid'], taskid:taskid });            
  return this.http.post(ENV.mainApi + '/taskrightside',param,requestOptions).timeout(ENV.timeout).map((data)=>{  
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}

taskfeedback(taskid,fbrate,fbcontent)  {       
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'],postid:taskid,fbrate:fbrate,fbcontent:fbcontent});
  return this.http.post(ENV.mainApi + '/taskfeedback',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}

taskapprove(taskid)  {          
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'],postid:taskid});   
  return this.http.post(ENV.mainApi + '/taskapprove',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}



    
payment(PaypalTxnID,OrderItem,BalHours,TotalHours,OrderAmt,PaidDate,fullname,mob,emailid)  {         
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'],PaypalTxnID:PaypalTxnID,OrderItem:OrderItem,BalHours:BalHours,TotalHours:TotalHours,OrderAmt:OrderAmt,PaidDate:PaidDate,fullname:fullname,mobno:mob,emailid:emailid});          
  return this.http.post(ENV.mainApi + '/payment',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}  
 


PayFailure(paymode,failreson,amount,planname,paystatus,paymentid,PaidDate)  {                            
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'], paymode:paymode,failreson:failreson,amount:amount,planname:planname,paystatus:paystatus, paymentid:paymentid , PaidDate:PaidDate });        
  return this.http.post(ENV.mainApi + '/payfail',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();      
  },  err => {  console.error('Oops:', err.message);  }
  )
}



buyadditional()  {                 
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid']});   
  return this.http.post(ENV.mainApi + '/buyadditional',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}


getprofile()  {                     
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid']});   
  return this.http.post(ENV.mainApi + '/getprofile',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}


upprofileimg()  {                         
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid']});      
  return this.http.post(ENV.mainApi + '/profileimg',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}

     

updateprofile(billAdd,billCountry,billState,billPin,billingPhone)  {                      
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'],billAdd:billAdd,billCountry:billCountry,billState:billState,billPin:billPin,billingPhone:billingPhone});      
  return this.http.post(ENV.mainApi + '/upprofile',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}


upplayerID()  {                             
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'], playerID:localStorage["pushusrid"]});        
  return this.http.post(ENV.mainApi + '/uponesignal',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();          
  },  err => {  console.error('Oops:', err.message);  }
  )
}

getnotify()  {                             
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'] });      
  return this.http.post(ENV.mainApi + '/getnotify',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}

getcountry()  {                             
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'] });        
  return this.http.post(ENV.mainApi + '/getcountry',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}


tasknotifyup(postid,notifystatus)   {         
  let headers = new Headers({ 'content-type': 'application/json'});
  let requestOptions=new RequestOptions({headers:headers});
  let param=JSON.stringify({userid:localStorage['userid'],postid:postid, notifystatus:notifystatus});        
  return this.http.post(ENV.mainApi + '/tasknotifyup',param,requestOptions).timeout(ENV.timeout).map((data)=>{
    return data.json();    
  },  err => {  console.error('Oops:', err.message);  }
  )
}
 



}
