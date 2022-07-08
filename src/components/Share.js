import CopyToClipboard from "react-copy-to-clipboard";
import React, { useMemo } from "react";
import { toast } from "react-toastify";
import { Button } from "./GlobalStyles";
import { DateTime } from "luxon";

const FIRST_DAY_OF_CEREBRLE = DateTime.fromFormat('July 07 2022', 'LLLL dd yyyy');


const getShareString = () => {
  let string = "";
  // TODO implement for each game
  return string;
}

export function Share({ dayString }) {
  const shareText = useMemo(() => {
    const currentDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
    const diffInDays = currentDate.diff(FIRST_DAY_OF_CEREBRLE, 'days').toObject().days;
    let shareString = `#Cerebrle #${diffInDays} `;
    shareString += getShareString();
    shareString += "\nhttps://www.cerebrle.io";
    return shareString
  }, []);

  return (
    <CopyToClipboard
      text={shareText}
      onCopy={() => toast("Copied Results to Clipboard", { autoClose: 2000 })}
      options={{ format: "text/plain" }}
    >
      <Button variant="contained"><span>Share Score!</span></Button>
    </CopyToClipboard>
  )
}

