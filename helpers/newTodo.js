module.exports = function (obj, arr) {
    const newObj = {
        todo: obj.todo,
        isComplete: false,
        id: arr.length + 1
    }
    return newObj
}