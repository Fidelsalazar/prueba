export interface CreateResponse{
    success : boolean,
    message : string,
    data : {
        id: string,
        name : string, 
        descripcion : string
    }
}