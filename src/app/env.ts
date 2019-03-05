
const HTTP_TIMEOUT: number = 60000;

    export interface Enviroment{
        mainApi:string,
        timeout:number
    }

    export const Test:Enviroment={
	        mainApi:'http://localhost:5000', 
	        timeout: HTTP_TIMEOUT  
    }

    export const Live:Enviroment={   
	    mainApi:'http://10.0.0.67:5000', 
	    timeout: HTTP_TIMEOUT  
    }
  
    export const ENV:Enviroment=Live;   
