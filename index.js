function createEmployeeRecord(employee) {
    const employeeObj = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

function createEmployeeRecords(employee) {
    return employee.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ")

    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })

    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ")

    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })

    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    const timeInEvent = employeeObj.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeObj.timeOutEvents.find(event => event.date === date);

    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;

    return parseInt(timeOutHour - timeInHour) / 100;
}

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
}

function allWagesFor(employeeObj) {
    const datesWorked = employeeObj.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
        const wagesEarned = wagesEarnedOnDate(employeeObj, date);
        return total + wagesEarned;
    }, 0);
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employee) => {
        const datesWorked = employee.timeInEvents.map(event => event.date);
        const wages = datesWorked.reduce((acc, date) => {
            const wagesEarned = wagesEarnedOnDate(employee, date);
            return acc + wagesEarned;
        }, 0);
        return total + wages;
    }, 0);
    return totalPayroll;
}




