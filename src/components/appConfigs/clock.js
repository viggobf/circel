import * as cUniUX from 'cuniux'
import ReactDom from 'react-dom'
import * as React from 'react'

var changeTime;
var appDataObj = null
var timeZone
var use24Hour = true
var timezonesArray = [{ name: 'GMT', offset: 0.000000000001 }, { name: 'UTC', offset: 0.000000000001 }, { name: 'ECT', offset: 1 }, { name: 'EET', offset: 2 }, { name: 'ART', offset: 2 }, { name: 'EAT', offset: 3 }, { name: 'MET', offset: 3.5 }, { name: 'NET', offset: 4 }, { name: 'PLT', offset: 5 }, { name: 'IST', offset: 5.5 }, { name: 'BST', offset: 6 }, { name: 'VST', offset: 7 }, { name: 'CTT', offset: 8 }, { name: 'JST', offset: 9 }, { name: 'ACT', offset: 9.5 }, { name: 'AET', offset: 10 }, { name: 'SST', offset: 11 }, { name: 'NST', offset: 12 }, { name: 'MIT', offset: -11 }, { name: 'HST', offset: -10 }, { name: 'AST', offset: -9 }, { name: 'PST', offset: -8 }, { name: 'PNT', offset: -7 }, { name: 'MST', offset: -7 }, { name: 'CST', offset: -6 }, { name: 'EST', offset: -5 }, { name: 'IET', offset: -5 }, { name: 'PRT', offset: -4 }, { name: 'CNT', offset: -3.5 }, { name: 'AGT', offset: -3 }, { name: 'BET', offset: -3 }, { name: 'CAT', offset: -1 }]
var timezonesDropdownArray = ['GMT (UTC)', 'UTC (UTC)', 'ECT (UTC + 1)', 'EET (UTC + 2)', 'ART (UTC + 2)', 'EAT (UTC + 3)', 'MET (UTC + 3.5)', 'NET (UTC + 4)', 'PLT (UTC + 5)', 'IST (UTC + 5.5)', 'BST (UTC + 6)', 'VST (UTC + 7)', 'CTT (UTC + 8)', 'JST (UTC + 9)', 'ACT (UTC + 9.5)', 'AET (UTC + 10)', 'SST (UTC + 11)', 'NST (UTC + 12)', 'MIT (UTC - 11)', 'HST (UTC - 10)', 'AST (UTC - 9)', 'PST (UTC - 8)', 'PNT (UTC - 7)', 'MST (UTC - 7)', 'CST (UTC - 6)', 'EST (UTC - 5)', 'IET (UTC - 5)', 'PRT (UTC - 4)', 'CNT (UTC - 3.5)', 'AGT (UTC - 3)', 'BET (UTC - 3)', 'CAT (UTC - 1)']
var timezoneSelected = null
var useSecondsVal = null
var otherTimeZoneCardsArray = []
var timerCardsArray = []
var clockFont = 'Inter'
var hourMinColonAppearanceVar = "unset"

setInterval(function () {
    if (hourMinColonAppearanceVar === 'unset') {
        hourMinColonAppearanceVar = 'hidden'
    } else {
        hourMinColonAppearanceVar = 'unset'
    }
}, 1000)

var date = new Date()

function refreshTimezones() {
    otherTimeZoneCardsArray = []

    appDataObj.timezones.forEach(function (item, index) {
        if (item.offset.toString().replace('-', '') !== item.offset.toString()) {
            var timeZoneOffset = item.offset.toString().replace('-', ' - ')
        } else {
            var timeZoneOffset = ' + ' + item.offset.toString()
        }

        timeZone = 'UTC' + timeZoneOffset.replace('1e - 9', '')

        otherTimeZoneCardsArray.push(
            <cUniUX.EventWrapper contextMenu={[['Remove Timezone', function () { appDataObj.timezones.splice(index, 1); cUniUX.updateAppData(appDataObj); refreshTimezones() }], ['Add or Edit Custom Name', function () {
                var newNameRef = React.createRef()
                cUniUX.dialog("Add or Edit Custom Name for your '" + item.name + "' Timezone", <span>
                    <span className={cUniUX.styles.minorText}>Enter a new name for your '{item.name}' timezone. It will be displayed at the top-left
                        of the time. The time of the timezone is not affected.</span><br /><br />

                    <input placeholder='Timezone Name' ref={newNameRef} />
                </span>, [['Change Name', function () {
                    appDataObj.timezones[index].name = newNameRef.current.value
                    cUniUX.updateAppData(appDataObj)
                    refreshTimezones()
                }]])
            }]]}>
                <cUniUX.SmallCard style={{ paddingTop: '1px !important', paddingBottom: '0px !important', width: '330px' }} name={<span className={cUniUX.styles.minorText}><strong>{item.name}</strong><span style={{ fontWeight: '400' }}>&ensp;{timeZone}</span></span>}>
                    <h1 style={{ fontFamily: clockFont, fontSize: '65px', marginBottom: '0px !important', textAlign: 'center' }} id='primaryTime'>
                        <Time useSeconds={appDataObj.settings.useSeconds} use24Hour={use24Hour} clockStyle={appDataObj.settings.clockStyle} timezoneOffset={item.offset} />
                    </h1>

                    <span style={{ float: 'right', fontSize: 'small', marginBottom: '12px' }} className={cUniUX.styles.miniTextButton} onClick={function () { appDataObj.timezones.splice(index, 1); cUniUX.updateAppData(appDataObj); refreshTimezones() }}><cUniUX.FontAwesomeIcon icon={cUniUX.icons.faTrash} /></span>
                </cUniUX.SmallCard>
            </cUniUX.EventWrapper>
        )
    })

    ReactDom.render(otherTimeZoneCardsArray, document.getElementById('otherTimeZoneCards'))
}

function refreshTimers() {
    timerCardsArray = []
    appDataObj.timers.forEach(function (item, index) {


        timerCardsArray.push(
            <TimerTime timerItem={item} timerIndex={index} />
        )
    })

    ReactDom.render(null, document.getElementById('timerCards'))
    setTimeout(function () { ReactDom.render(timerCardsArray, document.getElementById('timerCards')) }, 2)

    if (timerCardsArray.length === 0) {
        var timerNoText = 'No timers'
    } else if (timerCardsArray.length === 1) {
        var timerNoText = '1 timer'
    } else {
        var timerNoText = timerCardsArray.length + ' timers'
    }
    ReactDom.render(timerNoText, document.getElementById('timerCountNo'))
}

// put the time zone offset into a user-readable time zone
if ((date.getTimezoneOffset() / 60).toString().replace('-', '') !== (date.getTimezoneOffset() / 60).toString()) {
    var timeZoneOffset = (date.getTimezoneOffset() / 60).toString()
} else {
    var timeZoneOffset = '+' + (date.getTimezoneOffset() / 60).toString()
}


if (timeZoneOffset.replace('+', ' - ') !== timeZoneOffset) {
    timeZone = 'UTC' + timeZoneOffset.replace('+', ' - ')
} else if (timeZoneOffset.replace('-', ' + ') !== timeZoneOffset) {
    timeZone = 'UTC' + timeZoneOffset.replace('-', ' + ')
}

class TimerTime extends React.Component {
    hoursRemaining = null
    minutesRemaining = null
    secondsRemaining = null
    endLabel = ''
    finishesText = ''
    pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPause} />
    pauseStatus = false
    timerItemObj = null
    pauseStartTime = 0
    totalPauseTime = 0

    constructor(props) {
        super(props)
        this.timerItemObj = this.props.timerItem
        this.totalPauseTime = this.timerItemObj.pauseStatus.totalPauseTimeMs
        this.pauseStartTime = this.timerItemObj.pauseStatus.currentPauseStartTimeEpoch

        var endLabelDate = new Date()
        endLabelDate.setTime(this.timerItemObj.endTimeEpoch + this.timerItemObj.pauseStatus.totalPauseTimeMs)
        if (use24Hour) {
            if (!endLabelDate.getHours().toString()[1]) {
                var hourNo = '0' + endLabelDate.getHours().toString()
            } else {
                var hourNo = endLabelDate.getHours()
            }
            var amPmForTime = ''
        } else {
            if (endLabelDate.getHours() === 0){
                var hourNo = '12'
                var amPmForTime = ' AM'
            } else if (endLabelDate.getHours() === 12) {
                var hourNo = '12'
                var amPmForTime = ' PM'
            } else if (endLabelDate.getHours() > 12) {
                var hourNo = (endLabelDate.getHours() - 12).toString()
                var amPmForTime = ' PM'
            } else {
                var hourNo = endLabelDate.getHours().toString()
                var amPmForTime = ' AM'
            }
        }
        if (!endLabelDate.getMinutes().toString()[1]) {
            var minuteNo = '0' + endLabelDate.getMinutes().toString()
        } else {
            var minuteNo = endLabelDate.getMinutes()
        }

        // do some nice math to work out the remaining time of the timer
        var date = new Date()
        var currentDate = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + (3600000 * 0))
        if (this.timerItemObj.pauseStatus.pausedNow) {
            var addedTime = this.totalPauseTime + (currentDate.getTime() - this.timerItemObj.pauseStatus.currentPauseStartTimeEpoch)
        } else {
            var addedTime = this.totalPauseTime
        }

        currentDate.setTime(this.timerItemObj.endTimeEpoch - currentDate.getTime() + addedTime)
        var remainingTime = currentDate.getHours() + ':' + ''

        if (this.timerItemObj.endTimeEpoch + this.totalPauseTime < date.getTime()) {
            this.finishesText = 'Finished'
            this.endLabel = cUniUX.convertTimeMsToTimeText((date.getTime() + (date.getTimezoneOffset() * 60000) + (3600000 * 0)) - this.timerItemObj.endTimeEpoch)
            this.state = { time: <span style={{ color: 'var(--lightGray)' }}>Finished</span>, endTimeLabel: this.finishesText + ' ' + this.endLabel, pauseBtnIcon: null, paused: null }
        } else {
            this.finishesText = 'Finishes'
            this.endLabel = hourNo + ':' + minuteNo + amPmForTime
            if (!currentDate.getHours().toString()[1]) {
                this.hoursRemaining = '0' + currentDate.getHours().toString()
            } else {
                this.hoursRemaining = currentDate.getHours()
            }
            if (!currentDate.getMinutes().toString()[1]) {
                this.minutesRemaining = '0' + currentDate.getMinutes().toString()
            } else {
                this.minutesRemaining = currentDate.getMinutes()
            }
            if (!currentDate.getSeconds().toString()[1]) {
                this.secondsRemaining = '0' + currentDate.getSeconds().toString()
            } else {
                this.secondsRemaining = currentDate.getSeconds()
            }

            if (this.timerItemObj.pauseStatus.pausedNow) {
                this.pauseStatus = true
                this.pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPlay} />
                this.finishesText = 'Paused'
                this.endLabel = ''
            } else {
                this.pauseStatus = false
            }
            this.state = { time: <span><cUniUX.GradientedText>{this.hoursRemaining}:{this.minutesRemaining}</cUniUX.GradientedText><span style={{ color: 'var(--minorTextColor)' }}>:{this.secondsRemaining}</span></span>, endTimeLabel: this.finishesText + ' ' + this.endLabel, pauseBtnIcon: this.pauseBtnIconVal, paused: this.pauseStatus }
        }





        setInterval(() => {
            if (this.state.paused) {
                this.setState({ time: <span><cUniUX.GradientedText>{this.hoursRemaining}:{this.minutesRemaining}</cUniUX.GradientedText><span style={{ color: 'var(--minorTextColor)' }}>:{this.secondsRemaining}</span></span>, endTimeLabel: 'Paused', pauseBtnIcon: this.pauseBtnIconVal, paused: this.pauseStatus })
            } else {
                var endLabelDate = new Date()
                endLabelDate.setTime(this.timerItemObj.endTimeEpoch + this.timerItemObj.pauseStatus.totalPauseTimeMs)
                if (use24Hour) {
                    if (!endLabelDate.getHours().toString()[1]) {
                        var hourNo = '0' + endLabelDate.getHours().toString()
                    } else {
                        var hourNo = endLabelDate.getHours()
                    }
                    var amPmForTime = ''
                } else {
                    if (endLabelDate.getHours() === 0){
                        var hourNo = '12'
                        var amPmForTime = ' AM'
                    } else if (endLabelDate.getHours() === 12) {
                        var hourNo = '12'
                        var amPmForTime = ' PM'
                    } else if (endLabelDate.getHours() > 12) {
                        var hourNo = (endLabelDate.getHours() - 12).toString()
                        var amPmForTime = ' PM'
                    } else {
                        var hourNo = endLabelDate.getHours().toString()
                        var amPmForTime = ' AM'
                    }
                }
                if (!endLabelDate.getMinutes().toString()[1]) {
                    var minuteNo = '0' + endLabelDate.getMinutes().toString()
                } else {
                    var minuteNo = endLabelDate.getMinutes()
                }


                // do some nice math to work out the remaining time of the timer
                var date = new Date()
                // if (this.state.paused){
                //     var timeToAdd = this.currentPauseStartTimeEpoch
                // }
                var currentDate = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + (3600000 * 0))
                currentDate.setTime(this.timerItemObj.endTimeEpoch - currentDate.getTime() + this.totalPauseTime)

                setTimeout(() => {

                    if (this.timerItemObj.endTimeEpoch + this.totalPauseTime <= date.getTime()) {
                        if ((date.getTime() - (this.timerItemObj.endTimeEpoch + this.totalPauseTime) <= 1000)) {
                            if (appDataObj.settings.alertWhenTimerUp){
                                cUniUX.dialog('Timer Finished', <span className={cUniUX.styles.minorText}>Your {this.timerItemObj.name} timer has finished.</span>, [['Delete Timer', () => {
                                    appDataObj.timers.splice(this.props.timerIndex, 1); cUniUX.updateAppData(appDataObj); refreshTimers()
                                }], ['Dismiss', function () { }]])
                            }
                        }
                        this.finishesText = 'Finished'
                        this.endLabel = cUniUX.convertTimeMsToTimeText((date.getTime() + (date.getTimezoneOffset() * 60000) + (3600000 * 0)) - this.timerItemObj.endTimeEpoch)
                        this.setState({ time: <span style={{ color: 'var(--lightGray)' }}>Finished</span>, endTimeLabel: this.finishesText + ' ' + this.endLabel, pauseBtnIcon: null, paused: null })
                    } else {
                        if (!this.pauseStatus) {
                            this.finishesText = 'Finishes'
                            this.endLabel = hourNo + ':' + minuteNo + amPmForTime
                        }
                        if (!currentDate.getHours().toString()[1]) {
                            this.hoursRemaining = '0' + currentDate.getHours().toString()
                        } else {
                            this.hoursRemaining = currentDate.getHours()
                        }
                        if (!currentDate.getMinutes().toString()[1]) {
                            this.minutesRemaining = '0' + currentDate.getMinutes().toString()
                        } else {
                            this.minutesRemaining = currentDate.getMinutes()
                        }
                        if (!currentDate.getSeconds().toString()[1]) {
                            this.secondsRemaining = '0' + currentDate.getSeconds().toString()
                        } else {
                            this.secondsRemaining = currentDate.getSeconds()
                        }

                        if (this.pauseStatus) {
                            this.pauseStatus = true
                            this.pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPlay} />
                        } else {
                            this.pauseStatus = false
                        }
                        this.setState({ time: <span><cUniUX.GradientedText>{this.hoursRemaining}:{this.minutesRemaining}</cUniUX.GradientedText><span style={{ color: 'var(--minorTextColor)' }}>:{this.secondsRemaining}</span></span>, endTimeLabel: this.finishesText + ' ' + this.endLabel, finishesLabelText: this.finishesText, pauseBtnIcon: this.pauseBtnIconVal, paused: this.pauseStatus })
                    }
                }, 1)
            }


        }, 1000)
    }

    render() {
        return <cUniUX.EventWrapper contextMenu={[['Pause/Resume Timer', () => {
            if (this.state.paused) {
                var dateNow = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + (3600000 * 0))

                appDataObj.timers[this.props.timerIndex].pauseStatus.pausedNow = false
                appDataObj.timers[this.props.timerIndex].pauseStatus.totalPauseTimeMs += dateNow.getTime() - this.pauseStartTime
                this.totalPauseTime += dateNow.getTime() - this.pauseStartTime
                cUniUX.updateAppData(appDataObj)

                this.pauseStatus = false

                var currentState = this.state
                currentState.paused = false
                this.pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPause} />
                currentState.pauseBtnIcon = this.pauseBtnIconVal
                this.setState(currentState)
            } else {
                appDataObj.timers[this.props.timerIndex].pauseStatus.pausedNow = true
                var dateNow = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + (3600000 * 0))
                appDataObj.timers[this.props.timerIndex].pauseStatus.currentPauseStartTimeEpoch = dateNow.getTime()
                this.pauseStartTime = dateNow.getTime()

                cUniUX.updateAppData(appDataObj)

                this.pauseStatus = true

                var currentState = this.state
                currentState.paused = true
                currentState.endTimeLabel = 'Paused'
                this.pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPlay} />
                currentState.pauseBtnIcon = this.pauseBtnIconVal
                this.setState(currentState)
            }
        }], ['Rename Timer', () => {
            var newNameRef = React.createRef()
            cUniUX.dialog("Add or Edit Custom Name for your '" + this.timerItemObj.name + "' Timer", <span>
                <span className={cUniUX.styles.minorText}>Enter a new name for your '{this.timerItemObj.name}' timer. It will be displayed at the top-left
                    of the timer. The duration and elapsed time of the timer are not affected.</span><br /><br />

                <input placeholder='Timer Name' ref={newNameRef} />
            </span>, [['Change Name', () => {
                appDataObj.timers[this.props.timerIndex].name = newNameRef.current.value
                cUniUX.updateAppData(appDataObj)
                refreshTimers()
            }]])
        }], ['Cancel Timer', () => {
            appDataObj.timers.splice(this.props.timerIndex, 1); cUniUX.updateAppData(appDataObj); refreshTimers()
        }]]}>
            <cUniUX.SmallCard style={{ paddingTop: '1px !important', paddingBottom: '0px !important', width: '330px' }} name={<span className={cUniUX.styles.minorText}><strong style={{ float: 'left' }}>{this.timerItemObj.name}</strong><span style={{ fontWeight: '400', float: 'right' }}> {this.state.endTimeLabel}</span></span>}>
                <h1 style={{ fontFamily: clockFont, fontSize: '65px', marginBottom: '0px !important', textAlign: 'center' }} id='primaryTime'>
                    {this.state.time}
                </h1>

                <span style={{ float: 'right', fontSize: 'small', marginBottom: '12px' }} className={cUniUX.styles.miniTextButton} onClick={() => { appDataObj.timers.splice(this.props.timerIndex, 1); cUniUX.updateAppData(appDataObj); refreshTimers() }}><cUniUX.FontAwesomeIcon icon={cUniUX.icons.faTrash} /></span>

                <span style={{ float: 'right', fontSize: 'small', marginBottom: '12px', marginRight: '8px' }} className={cUniUX.styles.miniTextButton} onClick={() => {
                    if (this.state.paused) {
                        var dateNow = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + (3600000 * 0))

                        appDataObj.timers[this.props.timerIndex].pauseStatus.pausedNow = false
                        appDataObj.timers[this.props.timerIndex].pauseStatus.totalPauseTimeMs += dateNow.getTime() - this.pauseStartTime
                        this.totalPauseTime += dateNow.getTime() - this.pauseStartTime
                        cUniUX.updateAppData(appDataObj)

                        this.pauseStatus = false

                        var currentState = this.state
                        currentState.paused = false
                        this.pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPause} />
                        currentState.pauseBtnIcon = this.pauseBtnIconVal
                        this.setState(currentState)
                    } else {
                        appDataObj.timers[this.props.timerIndex].pauseStatus.pausedNow = true
                        var dateNow = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + (3600000 * 0))
                        appDataObj.timers[this.props.timerIndex].pauseStatus.currentPauseStartTimeEpoch = dateNow.getTime()
                        this.pauseStartTime = dateNow.getTime()

                        cUniUX.updateAppData(appDataObj)

                        this.pauseStatus = true

                        var currentState = this.state
                        currentState.paused = true
                        currentState.endTimeLabel = 'Paused'
                        this.pauseBtnIconVal = <cUniUX.FontAwesomeIcon icon={cUniUX.icons.faPlay} />
                        currentState.pauseBtnIcon = this.pauseBtnIconVal
                        this.setState(currentState)
                    }
                }}>{this.state.pauseBtnIcon}</span>
            </cUniUX.SmallCard>
        </cUniUX.EventWrapper>
    }
}



class Time extends React.Component {
    dateHours = null
    dateMinutes = null
    dateSeconds = null
    clockTime = null
    amOrPm = null
    useSeconds = 1
    hourMinColonAppearance = 'unset'
    constructor(props) {
        super(props)


        this.useSeconds = this.props.useSeconds

        if (!this.props.timezoneOffset) {
            if (this.props.use24Hour) {
                if (!date.getHours().toString()[1]) {
                    this.dateHours = '0' + date.getHours().toString()
                } else {
                    this.dateHours = date.getHours()
                }
            } else {
                if (date.getHours() === 0) {
                    this.dateHours = '12'
                    this.amOrPm = 'AM'
                } else if (date.getHours() > 12) {
                    this.dateHours = (date.getHours() - 12).toString()
                    this.amOrPm = 'PM'
                } else {
                    this.dateHours = date.getHours().toString()
                    this.amOrPm = 'AM'
                }

                if (date.getHours() === 12) {
                    this.amOrPm = 'PM'
                }
            }
            if (!date.getMinutes().toString()[1]) {
                this.dateMinutes = '0' + date.getMinutes().toString()
            } else {
                this.dateMinutes = date.getMinutes()
            }
            if (this.useSeconds === 0) {
                if (!date.getSeconds().toString()[1]) {
                    this.dateSeconds = ':' + '0' + date.getSeconds().toString()
                } else {
                    this.dateSeconds = ':' + date.getSeconds()
                }
            }
        } else {
            var alteredDate = new Date((date.getTime() + (date.getTimezoneOffset() * 60000)) + (3600000 * this.props.timezoneOffset))

            if (this.props.use24Hour) {
                if (!alteredDate.getHours().toString()[1]) {
                    this.dateHours = '0' + alteredDate.getHours().toString()
                } else {
                    this.dateHours = alteredDate.getHours()
                }
            } else {
                if (alteredDate.getHours() === 0) {
                    this.dateHours = '12'
                    this.amOrPm = 'AM'
                } else if (alteredDate.getHours() > 12) {
                    this.dateHours = (alteredDate.getHours() - 12).toString()
                    this.amOrPm = 'PM'
                } else {
                    this.dateHours = alteredDate.getHours().toString()
                    this.amOrPm = 'AM'
                }

                if (alteredDate.getHours() === 12) {
                    this.amOrPm = 'PM'
                }
            }
            if (!alteredDate.getMinutes().toString()[1]) {
                this.dateMinutes = '0' + alteredDate.getMinutes().toString()
            } else {
                this.dateMinutes = alteredDate.getMinutes()
            }
            if (this.useSeconds === 0) {
                if (!alteredDate.getSeconds().toString()[1]) {
                    this.dateSeconds = ':' + '0' + alteredDate.getSeconds().toString()
                } else {
                    this.dateSeconds = ':' + alteredDate.getSeconds()
                }
            }
        }


        if (this.useSeconds === 1) {
            this.hourMinColonAppearance = hourMinColonAppearanceVar
        } else {
            this.hourMinColonAppearance = 'unset'
        }


        this.state = { hours: this.dateHours, minutes: this.dateMinutes, seconds: this.dateSeconds, amOrPm: this.amOrPm, hourMinColonAppearance: this.hourMinColonAppearance }


        setInterval(() => {
            date = new Date()
            if (!this.props.timezoneOffset) {
                if (this.props.use24Hour) {
                    if (!date.getHours().toString()[1]) {
                        this.dateHours = '0' + date.getHours().toString()
                    } else {
                        this.dateHours = date.getHours()
                    }
                } else {
                    if (date.getHours() === 0) {
                        this.dateHours = '12'
                        this.amOrPm = 'AM'
                    } else if (date.getHours() > 12) {
                        this.dateHours = (date.getHours() - 12).toString()
                        this.amOrPm = 'PM'
                    } else {
                        this.dateHours = date.getHours().toString()
                        this.amOrPm = 'AM'
                    }

                    if (date.getHours() === 12) {
                        this.amOrPm = 'PM'
                    }
                }
                if (!date.getMinutes().toString()[1]) {
                    this.dateMinutes = '0' + date.getMinutes().toString()
                } else {
                    this.dateMinutes = date.getMinutes()
                }
                if (this.useSeconds === 0) {
                    if (!date.getSeconds().toString()[1]) {
                        this.dateSeconds = ':' + '0' + date.getSeconds().toString()
                    } else {
                        this.dateSeconds = ':' + date.getSeconds()
                    }
                }
            } else {
                var alteredDate = new Date((date.getTime() + (date.getTimezoneOffset() * 60000)) + (3600000 * this.props.timezoneOffset))
                if (this.props.use24Hour) {
                    if (!alteredDate.getHours().toString()[1]) {
                        this.dateHours = '0' + alteredDate.getHours().toString()
                    } else {
                        this.dateHours = alteredDate.getHours()
                    }
                } else {
                    if (alteredDate.getHours() === 0) {
                        this.dateHours = '12'
                        this.amOrPm = 'AM'
                    } else if (alteredDate.getHours() > 12) {
                        this.dateHours = (alteredDate.getHours() - 12).toString()
                        this.amOrPm = 'PM'
                    } else {
                        this.dateHours = alteredDate.getHours().toString()
                        this.amOrPm = 'AM'
                    }

                    if (alteredDate.getHours() === 12) {
                        this.amOrPm = 'PM'
                    }
                }
                if (!alteredDate.getMinutes().toString()[1]) {
                    this.dateMinutes = '0' + alteredDate.getMinutes().toString()
                } else {
                    this.dateMinutes = alteredDate.getMinutes()
                }
                if (this.useSeconds === 0) {
                    if (!alteredDate.getSeconds().toString()[1]) {
                        this.dateSeconds = ':' + '0' + alteredDate.getSeconds().toString()
                    } else {
                        this.dateSeconds = ':' + alteredDate.getSeconds()
                    }
                }
            }

            if (this.useSeconds === 1) {
                this.hourMinColonAppearance = hourMinColonAppearanceVar
            } else {
                this.hourMinColonAppearance = 'unset'
            }


            this.setState({ hours: this.dateHours, minutes: this.dateMinutes, seconds: this.dateSeconds, amOrPm: this.amOrPm, hourMinColonAppearance: this.hourMinColonAppearance })
        }, 1000)
    }

    render() {
        return <span><span><cUniUX.GradientedText>{this.state.hours}<span style={{ visibility: this.state.hourMinColonAppearance }}>:</span>{this.state.minutes}</cUniUX.GradientedText><span style={{ color: 'var(--minorTextColor)' }}>{this.state.seconds}</span><span className={cUniUX.styles.minorText}>{this.state.amOrPm}</span></span></span>
        // return <span><span><cUniUX.GradientedText>Nero</cUniUX.GradientedText><span style={{ color: 'var(--minorTextColor)' }}>UI</span></span></span>
    }
}


const appConfig = {
    name: 'Clock',
    appCode: 'CLK',
    icon: cUniUX.icons.faClock,
    rootURL: 'clock',
    initialAppData: {
        settings: {
            timerTone: 'default',
            use24Hour: 1,
            useSeconds: 1,
            clockStyle: 0,
            autoStartTimers: true,
            alertWhenTimerUp: true
        },
        timezones: [],
        timers: []
    },
    design: {
        accentColour: cUniUX.colourPacks.black
    },

    pageConfigs: {
        indexPage: {
            name: 'World Clock',
            icon: cUniUX.icons.faGlobe,
            url: '',
            pageOptionButtons: [['Add Timezone', cUniUX.icons.faPlus, 'accentColour', function () {
                var citySelected = null
                cUniUX.dialog('Add Timezone to World Clock', <span>
                    <span className={cUniUX.styles.minorText}>Select a timezone to add to World Clock.</span><cUniUX.LargeBr />

                    <cUniUX.Dropdown placeholder='Select a Timezone' itemsArray={timezonesDropdownArray} changeFunction={function (status) {
                        timezoneSelected = timezonesArray[status]
                    }} />
                </span>, [['Add Timezone', function () {
                    appDataObj.timezones.push(timezoneSelected)
                    cUniUX.updateAppData(appDataObj)

                    refreshTimezones()
                }]])
            }]],
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    appDataObj = fbObj.appData
                    if (fbObj.appData.settings.use24Hour === 0) {
                        use24Hour = false
                    } else {
                        use24Hour = true
                    }

                    // put the time zone offset into a user-readable time zone
                    if ((date.getTimezoneOffset() / 60).toString().replace('-', '') !== (date.getTimezoneOffset() / 60).toString()) {
                        var timeZoneOffset = (date.getTimezoneOffset() / 60).toString()
                    } else {
                        var timeZoneOffset = '+' + (date.getTimezoneOffset() / 60).toString()
                    }

                    if (timeZoneOffset.replace('+', ' - ') !== timeZoneOffset) {
                        timeZone = 'UTC' + timeZoneOffset.replace('+', ' - ')
                    } else if (timeZoneOffset.replace('-', ' + ') !== timeZoneOffset) {
                        timeZone = 'UTC' + timeZoneOffset.replace('-', ' + ')
                    }

                    if (appDataObj.settings.clockStyle === 0) {
                        clockFont = 'Inter'
                    } else {
                        clockFont = 'JetBrains Mono'
                    }

                    ReactDom.render(
                        <cUniUX.FullWidthBarCard style={{ paddingTop: '1px !important', paddingBottom: '0px !important' }}>
                            <span className={cUniUX.styles.minorText} style={{ textAlign: 'right' }}><strong>Current Time</strong>&ensp;{timeZone}</span>
                            <h1 style={{ fontFamily: clockFont, fontSize: '80px', marginBottom: '0px !important', marginTop: '22px', textAlign: 'center', fontWeight: '900' }} id='primaryTime'></h1>
                        </cUniUX.FullWidthBarCard>,

                        document.getElementById('primaryTimeZoneCard'))
                    ReactDom.render(<Time use24Hour={use24Hour} useSeconds={appDataObj.settings.useSeconds} clockStyle={fbObj.appData.settings.clockStyle} />, document.getElementById('primaryTime'))

                    refreshTimezones()

                }
            },

            content: <span>
                {/* <span className={cUniUX.styles.minorText}>
                    The Clock app is coming soon, likely in Alpha 3. However, here's a look at the configuration of the app for you. This app uses the new
                    App Data framework in order to store its data on the CDS.
                </span><br/> */}
                <span id='primaryTimeZoneCard' />

                <span id='otherTimeZoneCards' />

            </span>
        },

        timer: {
            name: 'Timer',
            icon: cUniUX.icons.faStopwatch20,
            url: '',
            pageOptionButtons: [['New Timer', cUniUX.icons.faPlus, 'accentColour', function () {
                var timerName = null
                var hoursNo = 0
                var minutesNo = 0
                var secondsNo = 0
                var hoursArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
                    '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
                var minutesArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
                    '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34',
                    '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
                var secondsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
                    '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34',
                    '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']

                var timerNameRef = React.createRef()

                cUniUX.dialog('New Timer', <span>
                    <span className={cUniUX.styles.minorText}>Enter the duration of the timer.</span><br /><br />

                    <input placeholder='Timer name' ref={timerNameRef} style={{ width: '100%' }} /><br /><br />

                    <cUniUX.Dropdown placeholder='Hours' changeFunction={function (sel) { hoursNo = hoursArray[sel].toString() }} itemsArray={hoursArray} />&ensp;

                    <cUniUX.Dropdown placeholder='Minutes' changeFunction={function (sel) { minutesNo = minutesArray[sel].toString() }} itemsArray={minutesArray} />&ensp;

                    <cUniUX.Dropdown placeholder='Seconds' changeFunction={function (sel) { secondsNo = secondsArray[sel].toString() }} itemsArray={secondsArray} />
                </span>, [['Add Timer', function () {
                    var timerStartDateObj = new Date()
                    var timerEndEpoch = new Date().setTime(timerStartDateObj.getTime() + (hoursNo * 3600000) + (minutesNo * 60000) + (secondsNo * 1000))
                    var timerLengthEpoch = timerEndEpoch - timerStartDateObj
                    var timerStartPauseDate = new Date((timerStartDateObj.getTime() - (timerStartDateObj.getTimezoneOffset() * 60000)) + (3600000 * 0))

                    if (!appDataObj.settings.autoStartTimers) {
                        appDataObj.timers.push({
                            name: timerNameRef.current.value,
                            startTimeEpoch: timerStartDateObj.getTime(),
                            endTimeEpoch: timerEndEpoch,
                            pauseStatus: {
                                pausedNow: true,
                                totalPauseTimeMs: 0,
                                currentPauseStartTimeEpoch: timerStartPauseDate.getTime()
                            }
                        })
                    } else {
                        appDataObj.timers.push({
                            name: timerNameRef.current.value,
                            startTimeEpoch: timerStartDateObj.getTime(),
                            endTimeEpoch: timerEndEpoch,
                            pauseStatus: {
                                pausedNow: false,
                                totalPauseTimeMs: 0,
                                currentPauseStartTimeEpoch: 0
                            }
                        })
                    }

                    cUniUX.updateAppData(appDataObj)

                    refreshTimers()
                }]])
            }], ['Cancel All Timers', cUniUX.icons.faTimes, 'normal', function (ev) {
                cUniUX.confirm('Cancel all Timers?', "Are you sure you want to cancel all of your timers?", "Cancel All", () => {
                    appDataObj.timers.splice(0, appDataObj.timers.length)

                    cUniUX.updateAppData(appDataObj)

                    refreshTimers()
                }, ev)
            }]],
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    appDataObj = fbObj.appData

                    if (fbObj.appData.settings.use24Hour === 0) {
                        use24Hour = false
                    } else {
                        use24Hour = true
                    }

                    if (appDataObj.settings.clockStyle === 0) {
                        clockFont = 'Inter'
                    } else {
                        clockFont = 'JetBrains Mono'
                    }

                    refreshTimers()
                }
            },

            content: <span>
                <h4 id='timerCountNo'>
                    Loading...
                </h4>

                <span id='timerCards' />

            </span>
        },

        settings: {
            name: 'Settings',
            icon: cUniUX.icons.faCog,
            url: '',
            autoFirebase: {
                callbackFunction: function (fbObj) {
                    appDataObj = fbObj.appData

                    ReactDom.render(<span>

                        <cUniUX.SettingItem action='dropdown' selectedItemIndex={appDataObj.settings.use24Hour} dropdownItemsArray={['12-hour', '24-hour']} description='Choose whether to use a 12-hour (eg 9:41) or 24-hour clock (eg 21:41) in Clock.' name='Time Format' changeFunction={function (status) {

                            appDataObj.settings.use24Hour = status
                            cUniUX.updateAppData(appDataObj)
                        }} />

                        <cUniUX.SettingItem action='dropdown' selectedItemIndex={appDataObj.settings.clockStyle} dropdownItemsArray={['Classic', 'Digital']} description='Pick a style for your clock.' name='Clock Style' changeFunction={function (status) {

                            appDataObj.settings.clockStyle = status
                            cUniUX.updateAppData(appDataObj)
                        }} />

                    </span>, document.getElementById('generalSettingsSpan'))

                    ReactDom.render(<span>
                        <cUniUX.SettingItem action='dropdown' selectedItemIndex={appDataObj.settings.useSeconds} dropdownItemsArray={["Show as number", 'Flash separator', "Don't show"]} description="Choose whether to show the number of seconds as a number, flash the hour/minute separator, or not to indicate the seconds at all." name='Show Seconds' changeFunction={function (status) {

                            appDataObj.settings.useSeconds = status
                            cUniUX.updateAppData(appDataObj)
                        }} />
                    </span>, document.getElementById('worldClockSettingsSpan'))

                    ReactDom.render(<span>
                        <cUniUX.SettingItem action='toggle' toggleOnText='Immediately Start' toggleOffText='Let Me Start Them' enabled={appDataObj.settings.autoStartTimers} description="Set whether newly created timers should immediately begin counting down once you create them, or start paused to allow you to start them when you wish." name='Immediately Start New Timers' toggleFunction={function (status) {

                            appDataObj.settings.autoStartTimers = status
                            cUniUX.updateAppData(appDataObj)
                        }} />

                        <cUniUX.SettingItem action='toggle' toggleOnText='Show' toggleOffText="Don't Show" enabled={appDataObj.settings.alertWhenTimerUp} description="When off, Clock will show on the timer when timers are finished. When on, you'll also be alerted when they finish." name='Show Alert When Timers Finish' toggleFunction={function (status) {

                            appDataObj.settings.alertWhenTimerUp = status
                            cUniUX.updateAppData(appDataObj)
                        }} />
                    </span>, document.getElementById('timerSettingsSpan'))
                }
            },

            content: <span>
                <h4>General</h4>
                <span id='generalSettingsSpan' />


                <h4>World Clock</h4>
                <span id='worldClockSettingsSpan' />


                <h4>Timer</h4>
                <span id='timerSettingsSpan' />
            </span>
        }
    }
}


export { appConfig }