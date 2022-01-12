export const RemoveLocalStorage = ()=>{
    try {
        localStorage.removeItem("logData")
        localStorage.removeItem("verify")
    }catch (e) {
        
    }
}