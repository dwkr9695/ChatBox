let trimName = (obj) => {
    try {
        if (obj === null || obj === undefined) return null;
        return obj.trimRight().trimLeft()
    } catch (error) {
        throw error
    }
}


let passwordValidation = (obj) => {
    try {
        if (obj.length < 7) return false
        return true
    } catch (error) {
        throw error
    }
}
module.exports = {
    trimName,
    passwordValidation
}