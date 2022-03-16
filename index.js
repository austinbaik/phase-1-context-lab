/* Your Code Here */


function createEmployeeRecord(fourElementArray) {
    return {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2],
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

}

function createEmployeeRecords(arrayofArrays) {
    return arrayofArrays.map(array => createEmployeeRecord(array))
}

// "YYYY-MM-DD HHMM"
function createTimeInEvent(dateStamp) {
    let hourStamp = parseInt(dateStamp.substring(11, 15))
    let dayStamp = dateStamp.substring(0, 10)
    this.timeInEvents.push( //where does .this come from? 
        {
            type: "TimeIn",
            hour: hourStamp, //calls the earlier defined variable
            date: dayStamp,
        }
    )
    return this
}

function createTimeOutEvent(dateStamp) {
    let hourStamp = parseInt(dateStamp.substring(11, 15))
    let dayStamp = dateStamp.substring(0, 10)
    this.timeOutEvents.push( //where does .this come from? A: passed in the test function (see indexTest.js)
        {
            type: "TimeOut",
            hour: hourStamp, //calls the earlier defined variable
            date: dayStamp,
        }
    )
    return this
}


function hoursWorkedOnDate(dayStamp) {
    const timeIn = this.timeInEvents.find(day => day.date === dayStamp)
    const timeOut = this.timeOutEvents.find(day => day.date === dayStamp)
    return ((timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate(dayStamp) {
    return hoursWorkedOnDate.call(this, dayStamp) * this.payPerHour //why do I have to use .call here? 
//transfering the this property to hoursWorkedOnDate
}
// allWagesFor.call(cRecord) //why would you use .call? 


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    const empObject = srcArray.find(empObject => empObject.firstName === firstName)
    return empObject
}


function calculatePayroll(Array) {
   return Array.map(employee => allWagesFor.call(employee)).reduce((a, b) => a+b, 0)

}