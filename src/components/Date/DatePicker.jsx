import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { formatDate } from "../../helpers/date";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import "./DatePicker.css";

const today = dayjs();

/**
 * Figma Design link: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%F0%9F%9B%A0-Xola-DS-Desktop-Master-%F0%9F%9B%A0?node-id=2689%3A101580
 */
export const DatePicker = ({
    selectedDate,
    startMonth = new Date(),
    disabledDays = [],
    shouldShowYearPicker = false,
    customContent = [],
    modifiers = {},
    handleDayClick,
    handleMonthChange,
    handleTodayButtonClick,
    ...rest
}) => {
    const [date, setDate] = useState(selectedDate);
    const [initialMonth, setInitialMonth] = useState(startMonth ?? selectedDate);

    let captionElement;
    if (shouldShowYearPicker) {
        captionElement = ({ date }) => {
            return <MonthYearSelector date={date} onChange={handleMonthChangeWrapper} />;
        };

        captionElement.propTypes = { date: PropTypes.objectOf(Date).isRequired };
    }

    let renderDay;
    if (customContent && customContent.length > 0) {
        renderDay = (day) => renderCustomContent({ selectedDate: date, day, customContent });
    }

    if (!handleDayClick) {
        // Default wrapper so that we can show the date, and a warning for user to handle this
        handleDayClick = (day, options = {}) => {
            console.warn("`handleDayClick` callback undefined. Please use it listening to date changes");
            console.log("Selected date", formatDate(day, "YYYY-MM-DD"), options);
        };
    }

    // A wrapper for the callback so we can use local state and invoke the call back
    const handleDayClickWrapper = (day, options) => {
        setDate(day);
        handleDayClick.call(this, day, options);
    };

    const handleMonthChangeWrapper = (month) => {
        setInitialMonth(month);
        if (handleMonthChange) {
            handleMonthChange.call(this, month);
        } else {
            console.warn("`handleMonthChange` callback undefined. Please use it listening to month changes");
            console.log("Selected month", formatDate(month, "YYYY-MM"));
        }
    };

    if (!handleTodayButtonClick) {
        handleTodayButtonClick = (today) => {
            console.log("DatePicker today", formatDate(today));
            setDate(today);
        };
    }

    const selectedDays = selectedDate ?? date;

    return (
        <div className={clsx("date-picker", renderDay ? "has-custom-content" : null)}>
            <DayPicker
                showOutsideDays
                modifiers={modifiers}
                selectedDays={[selectedDays]} // Xola date picker doesn't support selecting multiple dates
                month={initialMonth}
                disabledDays={disabledDays}
                todayButton="Today"
                captionElement={captionElement}
                renderDay={renderDay}
                navbarElement={navbarElement}
                onDayClick={handleDayClickWrapper}
                onMonthChange={handleMonthChangeWrapper}
                onTodayButtonClick={handleTodayButtonClick}
                {...rest}
            />
        </div>
    );
};

DatePicker.propTypes = {
    selectedDate: PropTypes.objectOf(Date),
    startMonth: PropTypes.objectOf(Date),
    disabledDays: PropTypes.array,
    modifiers: PropTypes.object,
    shouldShowYearPicker: PropTypes.bool,
    customContent: PropTypes.array,
    handleDayClick: PropTypes.func,
    handleMonthChange: PropTypes.func,
    handleTodayButtonClick: PropTypes.func,
};

/**
 * Render the custom left & right arrows to change the current month
 */
export const navbarElement = ({ onPreviousClick, onNextClick, className, showNextButton, showPreviousButton }) => {
    return (
        <div className={clsx("absolute z-50 top-2 right-2", className)}>
            <ChevronButton chevron={<ChevronLeftIcon />} showIcon={showPreviousButton} onClick={onPreviousClick} />
            <ChevronButton chevron={<ChevronRightIcon />} showIcon={showNextButton} onClick={onNextClick} />
        </div>
    );
};

const ChevronButton = ({ chevron, showIcon = true, onClick }) => {
    return (
        <button
            className={clsx(
                showIcon ? "inline-block" : "invisible",
                "rounded-full border border-transparent hover:border-black p-1",
            )}
            onClick={() => onClick()}
        >
            {chevron}
        </button>
    );
};

/**
 * Render custom content in the cell and mark the active day
 */
const renderCustomContent = ({ selectedDate, day, customContent }) => {
    const date = day.getDate();
    const value = customContent[date] ?? "N/A";
    const isSameDay = selectedDate && dayjs(selectedDate).isSame(day, "day");
    const isSameMonth = dayjs().isSame(day, "month");

    return (
        <>
            {/* The date itself */}
            <div className={clsx("date-value mb-1 leading-p1", isSameDay ? "text-white selected" : null)}>{date}</div>
            {/* The custom content below it */}
            <div
                className={clsx(
                    "custom-content text-xs leading-p3",
                    isSameDay ? "text-white" : isSameMonth ? "text-gray-dark" : "text-gray-light",
                )}
            >
                {value}
            </div>
        </>
    );
};

renderCustomContent.propTypes = {
    currentDate: PropTypes.objectOf(Date).isRequired,
    day: PropTypes.objectOf(Date).isRequired,
    content: PropTypes.object.isRequired,
};

/**
 * Show year and month as dropdowns to change the currently selected date
 */
const MonthYearSelector = ({ date, onChange }) => {
    const months = [...Array.from({ length: 12 }).keys()].map((m) => today.month(m).format("MMM"));
    const years = [...Array.from({ length: 12 }).keys()].map((y) => today.year(2021 + y).format("YYYY"));

    const handleChange = (event_) => {
        const { year, month } = event_.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="DayPicker-Caption">
            <select name="month" value={date.getMonth()} className="month-selector" onChange={handleChange}>
                {months.map((month, index) => (
                    <option key={month} value={index}>
                        {month}
                    </option>
                ))}
            </select>
            <select name="year" value={date.getFullYear()} className="year-selector" onChange={handleChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    );
};

MonthYearSelector.propTypes = {
    date: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
};