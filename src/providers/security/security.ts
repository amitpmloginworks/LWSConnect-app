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



}
