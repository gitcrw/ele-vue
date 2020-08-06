

function lcStorage(method,params){
    let {name,value={}} = params
    
    // return localStorage[`${method}Item`](name,value={})
    if(method.toLowerCase()=='set'){
        (value instanceof Object)?
        localStorage.setItem(name,JSON.stringify(value)):
        localStorage.setItem(name,value)
    }else if(method.toLowerCase()=='get'){
        if(value instanceof Object){
            return JSON.parse(localStorage.getItem(name))
        }else{
            return localStorage.getItem(name)
        }
        
    }
}

let global ={
    lcStorage
}

export default global