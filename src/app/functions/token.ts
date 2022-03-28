export function checkLocalStorage(){
    let status:any;
    if(localStorage.getItem('token')){
        return status=true;
    }
    else{
        return status=false;
    }
}
export function checkAccessID(){
    let accessid:any;
    if(localStorage.getItem('access')){
        accessid=localStorage.getItem('access')
        return accessid
    }
}