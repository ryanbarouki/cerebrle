import CopyToClipboard from "react-copy-to-clipboard";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { SecondaryButton } from "./GlobalStyles";
import { DateTime } from "luxon";
import { loadAllResults } from "../save_local";

const FIRST_DAY_OF_CEREBRLE = DateTime.fromFormat('July 07 2022', 'LLLL dd yyyy');


const getShareString = ({number: numberScore, sequence: sequenceScore, word: wordScore}) => {
  let shareString = "";
  if (sequenceScore != null) {
    shareString += `🟩 Sequence Memory: ${sequenceScore}\n`;
  }
  if (numberScore != null) {
    shareString += `🔢 Number Memory: ${numberScore}\n`;
  }
  if (wordScore != null) {
    shareString += `📖 Verbal Memory: ${wordScore}\n`;
  }

  return shareString;
}

export function Share({ dayString }) {
  const shareText = useMemo(() => {
    const results = loadAllResults();
    const currentDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
    const diffInDays = currentDate.diff(FIRST_DAY_OF_CEREBRLE, 'days').toObject().days;
    const shareString = `#Cerebrle #${diffInDays}\n${getShareString(results[dayString] ?? {})}https://www.cerebrle.io`;
    return shareString
  }, [dayString]);

  return (
    <CopyToClipboard
      text={shareText}
      onCopy={() => toast("Copied Results to Clipboard", { autoClose: 2000 })}
      options={{ format: "text/plain" }}
    >
      <SecondaryButton>Share score</SecondaryButton>
    </CopyToClipboard>
  )
}

