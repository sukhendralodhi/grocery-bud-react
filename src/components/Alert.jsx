/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    let timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[list]);
  return <p className={`alert text-center rounded text-white ${type}`}>{msg}</p>;
};

export default Alert;
