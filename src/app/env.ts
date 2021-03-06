
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
	    mainApi:'http://10.0.0.67:3555',  
	    timeout: HTTP_TIMEOUT  
    }

    export const LiveLocal:Enviroment={    
	    mainApi:'http://182.156.204.228:3555',  
	    timeout: HTTP_TIMEOUT  
    }
   
    export const Livetest:Enviroment={   
	    mainApi:'http://ec2-18-223-235-36.us-east-2.compute.amazonaws.com:3555',   
	    timeout: HTTP_TIMEOUT  
    }

    export const Livefinal:Enviroment={    
	    mainApi:'http://ec2-3-15-11-19.us-east-2.compute.amazonaws.com:3555',   
	    timeout: HTTP_TIMEOUT  
    }
    
    export const ENV:Enviroment=Livefinal;   