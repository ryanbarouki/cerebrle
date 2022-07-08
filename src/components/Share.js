import CopyToClipboard from "react-copy-to-clipboard";
import React, { useMemo } from "react";
import { toast } from "react-toastify";
import { Button } from "./GlobalStyles";
import { DateTime } from "luxon";
import { loadAllResults } from "../save_local";

const FIRST_DAY_OF_CEREBRLE = DateTime.fromFormat('July 07 2022', 'LLLL dd yyyy');


const getShareString = ({number: numberScore, sequence: sequenceScore, word: wordScore}) => {
  return `🟩 Sequence Memory: ${sequenceScore}\n🔢 Number Memory: ${numberScore}\n📖 Verbal Memory: ${wordScore}\n`;
}

export function Share({ dayString }) {
  const shareText = useMemo(() => {
    const results = loadAllResults();
    const currentDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
    const diffInDays = currentDate.diff(FIRST_DAY_OF_CEREBRLE, 'days').toObject().days;
    const shareString = `#Cerebrle #${diffInDays}\n${getShareString(results[dayString])}https://www.cerebrle.io`;
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

