import React from "react";
import "./index.css";

import { isBefore } from "date-fns";

const SlotsDisplay = ({ eachSlot, changeSelectedSlot, selectedSlot }) => {
  const { _id, timeSlot, bookingStatus, slotExpiry } = eachSlot;

  const todayDate = new Date();

  const timeState = slotExpiry.slice(-2);
  const splitedTime = slotExpiry.split(":");

  const date24hr =
    timeState.toUpperCase() === "AM" || Number(splitedTime[0]) === 12
      ? Number(splitedTime[0])
      : Number(splitedTime[0]) + 12;
  const slotDateFull = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate(),
    date24hr,
    50,
    0
  );

  const isTimeOver = isBefore(slotDateFull, todayDate);

  const selectTheSlot = () => {
    changeSelectedSlot(_id);
  };

  return (
    <>
      {bookingStatus || isTimeOver ? (
        <li
          role="button"
          aria-label="Slot Item"
          className={"slot-item is-slot-disabled"}
          aria-disabled={true}
        >
          {timeSlot}
        </li>
      ) : (
        <li
          role="button"
          aria-label="Slot Item"
          className={
            selectedSlot._id === _id ? "slot-item is-slot-active" : "slot-item"
          }
          onClick={selectTheSlot}
        >
          {timeSlot}
        </li>
      )}
    </>
  );
};

export default SlotsDisplay;
