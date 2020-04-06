import moment from "moment";
import { DATE_FORMAT, API_DATE_FORMAT } from "appConstants";

export const tomorowsDate = () => getFutureDays(1);

export const getFutureDays = (days = 1, startdate = undefined) => {
    return moment(startdate).add(days, "days");
};

export const todaysDate = (isUTC = true) => (isUTC ? moment.utc() : moment());

export const formatDate = (date, isUTC = true, format = DATE_FORMAT) => {
    const momentDate = isUTC ? moment.utc(date) : moment(date);
    return !isNaN(momentDate) ? momentDate.format(format) : "";
};

export const toApiRequestFormat = (date, isUTC = true) =>
    formatDate(date, isUTC, API_DATE_FORMAT);
