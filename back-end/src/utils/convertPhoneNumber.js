
function convertPhoneNumberWithDash(number) {

    const convert = []
    let store = []
    let count = 0
    for (let i = 0; i < number.length; i++) {
        store.push(number[i])
        if (store.length % 3 === 0 && count <= 1) {
            convert.push(store.join(''))
            store = []
            count++
        }



    }
    return convert.push(store.join(''))

}


module.exports = convertPhoneNumberWithDash




