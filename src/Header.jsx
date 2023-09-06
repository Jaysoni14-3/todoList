/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Header() {
  var userNameValue;
  const defaultUserName = [
    "Nexus Nova",
    "Quantum Pulse",
    "Stellar Synapse",
    "Cipher Wave",
    "Infiniti Quasar",
    "Retro Fusion",
    "Nebula Nex",
    "Luminexa",
    "Cyber Spectrum",
  ];

  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });

  // Initial load use Effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Convert 24hrs to 12hrs format
  var formattedHours = time.hours % 12 || 12;
  var amOrPm = formattedHours >= 12 ? "am" : "pm";

  const randomNumber = () => {
    return Math.floor(Math.random() * 9);
  };

  // Greetings based on time
  let greetings;
  (function () {
    const currentHour = time.hours;
    if (currentHour >= 5 && currentHour < 12) {
      greetings = "Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greetings = "Afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
      greetings = "Evening";
    } else {
      greetings = "Night";
    }
  })();

  // If Local storage has username value then get the value and show the name
  const nameInLs = JSON.parse(localStorage.getItem("userName"));
  if (nameInLs !== null && userNameValue !== "") {
    userNameValue = nameInLs;
  } else {
    userNameValue = defaultUserName[randomNumber()];
    localStorage.setItem("userName", JSON.stringify(userNameValue));
  }

  const changeUserName = () => {
    userNameValue = prompt("Change your name to?");
    if (userNameValue == "") {
      userNameValue = defaultUserName[randomNumber()];
    } else {
      localStorage.setItem("userName", JSON.stringify(userNameValue));
    }
  };

  // add 0 before hours, minutes, seconds if the time is between 1-9
  const convertToTwoDigit = (number) => {
    return number.toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
  };

  return (
    <header className="bg-sky-300 text-neutral-950 w-100 py-8 header">
      <div className="user-details flex justify-center items-center ">
        <p className="me-2 text-xl text-center">
          Good {greetings}, {userNameValue}
        </p>
        <div
          onClick={changeUserName}
          className="edit-btn hover:bg-orange-300 transition-all ease-out p-2 rounded-full"
        >
          <FaEdit className="cursor-pointer" />
        </div>
      </div>

      <div className="time-container flex justify-center items-center mt-4">
        <p className="text-xl text-center w-12">
          {convertToTwoDigit(formattedHours)}
        </p>
        <span>:</span>
        <p className="text-xl text-center w-12">
          {convertToTwoDigit(time.minutes)}
        </p>
        <span>:</span>
        <p className="text-xl text-center w-12">
          {convertToTwoDigit(time.seconds)}
        </p>
        <p className="text-xl text-center">{amOrPm}</p>
      </div>
    </header>
  );
}
