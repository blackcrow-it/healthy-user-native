export function PasswordMeter(password: string) {
    let point = (
        pointCountCharacters(password) +
        pointUppercaseLetters(password) +
        pointLowercaseLetters(password) +
        pointNumber(password) +
        pointSymbols(password) +
        pointMiddleNumbersSymbols(password) +
        pointLettersOnly(password) +
        pointNumberOnly(password) +
        pointConsecutiveUppercase(password) +
        pointConsecutiveLowercase(password) +
        pointConsecutiveNumber(password)
        )
    if (point < 0) {
        return 0
    } else {
        return point;
    }
}

function pointCountCharacters(text: string) {
    return (text.length)*4
}

function pointUppercaseLetters(text: string) {
    let count = (text.match(/[A-Z]/g) || []).length;
    return (text.length - count)*2
}

function pointLowercaseLetters(text: string) {
    let count = (text.match(/[a-z]/g) || []).length;
    return (text.length - count)*2
}

function pointNumber(text: string) {
    let count = (text.match(/[0-9]/g) || []).length;
    return (count)*4
}

function pointSymbols(text: string) {
    let count = (text.match(/[0-9]|[a-zA-Z]|\s/g) || []).length;
    return (text.length - count)*4
}

function pointMiddleNumbersSymbols(text: string) {
    let count = (text.match(/[0-9]|[a-zA-Z]|\s/g) || []).length;
    return (text.length - count)*4
}

function pointLettersOnly(text: string) {
    let count = (text.match(/[a-zA-Z]/g) || []).length;
    if (count == text.length) {
        return -count
    } else {
        return 0
    }
}

function pointNumberOnly(text: string) {
    let count = (text.match(/[0-9]/g) || []).length;
    if (count == text.length) {
        return -count
    } else {
        return 0
    }
}

function pointConsecutiveUppercase(text: string) {
    let count = (text.match(/([A-Z]){2}/g) || []).length;
    return -(count*2)
}

function pointConsecutiveLowercase(text: string) {
    let count = (text.match(/([a-z]){2}/g) || []).length;
    return -(count*2)
}

function pointConsecutiveNumber(text: string) {
    let count = (text.match(/([0-9]){2}/g) || []).length;
    return -(count*2)
}