function reverseStr(str) {
    var charList = str.split('');

    var reversedList = charList.reverse();

    var reversedStr = reversedList.join('');

    return reversedStr;
}

function isPalindrome(str) {
    var reversedStr = reverseStr(str);

    if (str === reversedStr) {
        return true;
    } else {
        return false;
    }
}

function convertNumToStr(date) {

    var dateInStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateInStr.day = '0' + date.day;
    } else {
        dateInStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateInStr.month = '0' + date.month;
    } else {
        dateInStr.month = date.month.toString()
    }

    dateInStr.year = date.year.toString();

    return dateInStr;
}

function dateInAllFormats(date) {
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfDates = dateInAllFormats(date);

    var flag = false;

    for (let i = 0; i < listOfDates.length; i++) {
        if (isPalindrome(listOfDates[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function findNextPallindromeDate(date) {
    var nextDate = getNextDate(date);
    count = 0;

    while (1) {
        count++;

        var dateStr = convertNumToStr(nextDate);
        var isPalindrome = checkPalindromeForAllDateFormats(dateStr);

        if (isPalindrome === true) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];
}

const inputDate = document.querySelector("#date-input");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output-div");

function onClickHandler() {
    
    var dateStr = inputDate.value;

    output.innerText = "";

    if(dateStr !== '') {
        var dateList = dateStr.split('-');

        var formattedDate = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        } ;

        var dateStr = convertNumToStr(formattedDate);

        var isPalindrome = checkPalindromeForAllDateFormats(dateStr);

        if(isPalindrome) {
            output.innerText = "Yay! Your birthday is a Palindrome. 🥳";
        }
        else {
            var [count, nextDate] = findNextPallindromeDate(formattedDate);

            output.innerText = "Oops! You missed it by " + count + " days! 😔 The next palindrome date is " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year + ".";
        }
        
    }
}

checkBtn.addEventListener("click", onClickHandler);