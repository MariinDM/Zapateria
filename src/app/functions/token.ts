export function checkLocalStorage(){
    let status:any;
    if(localStorage.getItem('token')){
        return status=true;
    }
    else{
        return status=false;
    }
}