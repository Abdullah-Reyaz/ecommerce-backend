class ApiResponse{
    contructor(statusCode,message="sucess",data){
        this.statusCode=statusCode
        this.message=message
        this.data=data
    }
}

export { ApiResponse}