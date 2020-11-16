import React from "react";
import { makeAutoObservable } from "mobx"
import moment from "moment";
import { BLUE } from "../../constants/Colors";

export default class Store {
    addEndDate = false
    selected = 'START' //initially start date is selected
    startDate = moment().format("YYYY-MM-DD")
    startTime = new Date()
    endDate = moment().add(10, 'days').format("YYYY-MM-DD")
    endTime = new Date()
    eventType = null
    eventDetails = null
    locationType = null
    link = null
    location = null

    constructor() {
        makeAutoObservable(this)
    }

    toggleAddLastDate() {
        if (this.selected == 'START') {
            this.addEndDate = !this.addEndDate
        }
        else {
            this.addEndDate = !this.addEndDate
            this.selected = 'START'
        }
    }

    setStartDate(selectedDate) {
        this.startDate = selectedDate
    }

    setStartTime(selectedTime) {
        this.startTime = selectedTime
    }

    setEndDate(selectedDate) {
        this.endDate = selectedDate
    }

    setEndTime(selectedTime) {
        this.endTime = selectedTime
    }

    getDaysArray(s, e) {
        for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
            a.push(new Date(d));
        }
        return a;
    }; //get days between to dates

    getMarkedDates() {
        const markedDates = {}
        if (this.startDate == this.endDate) {
            markedDates[this.startDate] = { selected: true, startingDay: true, endingDay: true, color: BLUE };
        } // if both dates are same 
        else {
            var daysBetween = this.getDaysArray(new Date(this.startDate), new Date(this.endDate)) // get dates in range [startDate,endDate]
            daysBetween.map((d) => {
                let date = d.toISOString().slice(0, 10)
                markedDates[date] = { selected: true, color: BLUE };
            })
            markedDates[this.startDate] = { selected: true, startingDay: true, color: BLUE };
            markedDates[this.endDate] = { selected: true, endingDay: true, color: BLUE };   // To mark starting and ending dates differently
        }
        return markedDates;
    }

    setSelected(i) {
        this.selected = i
    } //to select start date or end date.

    checkTime(selectedTime) {
        if (this.selected == 'START') {
            let isOkayTime = moment(selectedTime).isBefore(this.endTime)
            return isOkayTime
        }
        else {
            let isOkayTime = moment(selectedTime).isAfter(this.startTime)
            return isOkayTime
        }
    }

    checkDate(selectedDate) {
        let isOkayTime = moment(this.startTime).isBefore(this.endTime);
        if (this.selected == 'START') {
            let isOkayDate = moment(selectedDate).isSameOrBefore(this.endDate);
            if (moment(this.endDate).isSame(selectedDate)) {
                let isOkayTimeAndDate = isOkayDate && isOkayTime
                return isOkayTimeAndDate;
            }
            return isOkayDate;
        }
        else {
            let isOkayDate = moment(selectedDate).isSameOrAfter(this.startDate);
            if (moment(this.startDate).isSame(selectedDate)) {
                let isOkayTimeAndDate = isOkayDate && isOkayTime
                return isOkayTimeAndDate;
            }
            return isOkayDate;
        }
    }

    onChangeTime(time, selectedTime) {
        let currentTime = selectedTime || time;
        if (this.startDate == this.endDate) {
            if (this.checkTime(currentTime)) {
                this.selected == 'START' ? this.setStartTime(currentTime) : this.setEndTime(currentTime)
            }
            else {
                alert('Events cannot end before starting!')
            }
        }
        else {
            this.selected == 'START' ? this.setStartTime(currentTime) : this.setEndTime(currentTime)
        }
    }

    onChangeDate(day) {
        if (!this.addEndDate && this.checkDate(day)) {
            this.setStartDate(day)
            this.endDate = moment(this.startDate).add(10, 'days').format("YYYY-MM-DD")
        } //if only start date is needed
        else if (this.checkDate(day)) {
            this.selected == 'END' ? this.setEndDate(day) : this.setStartDate(day)
        }//if both start and end date are needed
        else {
            alert('Events cannot end before starting!')
        }
    }

    setEventType(type) {
        this.eventType = type
        this.location = null
    }

    setEventDetails(details) {
        this.eventDetails = details
    }

    updateEventDetails(details) {
        if (this.eventDetails.desc) {
            this.eventDetails = {
                ...details,
                "desc": this.eventDetails.desc
            }
        }
        else {
            this.eventDetails = details
        }
    }

    getLocationType() {
        switch (this.locationType) {
            case '0':
                return 'Messenger Rooms'
            case '1':
                return 'Facebook Live'
            case '2':
                return 'External Link'
            case '3':
                return 'Other'
            default:
                return null
        }
    }

    setLocationType(type) {
        this.locationType = type
    }

    setLink(link) {
        this.link = link
    }

    setLocation(location) {
        this.location = location
    }

    setDescription(desc) {
        this.eventDetails.desc = desc
    }

    setCoverPhoto(base64Image) {
        this.eventDetails.coverUrl = base64Image
    }

    clearCoverPhoto() {
        this.eventDetails.coverUrl = null
    }

    createEvent() {
        let eventDetails = {
            ...this.eventDetails,
            "eventType": this.eventType,
            "locationType": this.getLocationType(),
            "location": this.location,
            "link": this.link,
        }
        console.log(eventDetails)
        // pass the userId and eventDetails to the createEvent API
    }

    resetAll() {
        this.eventType = null
        this.eventDetails = null
        this.addEndDate = false
        this.locationType = null
        this.location = null
    }
}


const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
