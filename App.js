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

function findNextPalindromeDate(date) {
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

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (day < 1) {
            if (month === 1) {
                month--;
                day = daysInMonth[month];
            } else {
                month--;
                day = daysInMonth[month - 1];
            }
        }
    }

    if (month < 1) {
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function findPreviousPalindromeDate(date) {

    var previousDate = getPreviousDate(date);
    count = 0;

    while (1) {
        count++;

        var dateStr = convertNumToStr(previousDate);
        var isPalindrome = checkPalindromeForAllDateFormats(dateStr);

        if (isPalindrome === true) {
            break;
        }

        previousDate = getPreviousDate(previousDate);
    }

    return [count, previousDate];
}

const inputDate = document.querySelector("#date-input");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output-div");

function onClickHandler() {

    var dateStr = inputDate.value;

    if (dateStr) {

        output.innerText = "";

        if (dateStr !== '') {
            var dateList = dateStr.split('-');

            var formattedDate = {
                day: Number(dateList[2]),
                month: Number(dateList[1]),
                year: Number(dateList[0])
            };

            var dateStr = convertNumToStr(formattedDate);

            var isPalindrome = checkPalindromeForAllDateFormats(dateStr);

            if (isPalindrome) {
                output.innerText = "Yay! Your birthday is a Palindrome. ????";
            } else {
                var [countNext, nextDate] = findNextPalindromeDate(formattedDate);

                var [countPrevious, previousDate] = findPreviousPalindromeDate(formattedDate);

                var count;

                if (countNext < countPrevious) {
                    count = countNext;
                } else {
                    count = countPrevious;
                }

                var dayOrDays;
                var dayOrDaysNext;
                var dayOrDaysPrev;

                dayOrDays = count === 1 ? "day" : "days";
                dayOrDaysNext = countNext === 1 ? "day" : "days";
                dayOrDaysPrev = countPrevious === 1 ? "day" : "days";

                output.innerText = "Oops! You missed it by " + count + " " + dayOrDays + "! ????" + "\nThe next palindrome date is " + nextDate.month + "-" + nextDate.day + "-" + nextDate.year + "." + " Which is " + countNext + " " + dayOrDaysNext + " ahead." + "\nThe previous palindrome date was " + previousDate.month + "-" + previousDate.day + "-" + previousDate.year + "." + " Which was " + countPrevious + " " + dayOrDaysPrev + " before.";
            }

        }

    } else {
        output.innerText = "Please select your date of birth!";
    }

}

checkBtn.addEventListener("click", onClickHandler);