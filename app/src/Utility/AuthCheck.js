export const AuthCheck = () => {
    try {
        const token = localStorage.getItem("verify")
        const userId = JSON.parse(localStorage.getItem("logData")).id
        if (!token || !userId) {
            return false
        } else {
            const response = {
                token: token,
                userid: userId
            }
            return response
        }

    } catch (e) {
        return false
    }
}