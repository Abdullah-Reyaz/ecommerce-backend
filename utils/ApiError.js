// There is a Error class in Node js 

class ApiError extends Error{ // Creating a custom class

    constructor(statusCode,message,error=[],stack=""){
        // This is constructor in which there a statusCode,message,error=[] beacuse different types of error,stack=""
        super(message) // calling constructor of Error class and passing parameter message to print message
        this.statusCode=statusCode // Store the status code inside the current ApiError object.
        this.message=message // Store the message inside the current ApiError object.
        this.error=error
        if(stack){
         this.stack=stack   
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}

/*
  ApiError
   |
   | super("User not found")
   ↓
Error
   |
   ↓
message = "User not found"

*/