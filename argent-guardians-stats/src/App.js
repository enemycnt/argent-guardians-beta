import { useState } from "react";
import { getUnixTime,  } from "date-fns";

import DatePicker from "./components/DatePicker";
import WidgetList from "./components/WidgetList";

const START_DATE = getUnixTime(new Date(2021, 0, 22));
const END_DATE = getUnixTime(new Date());

function App() {
  const [startTime, setStartTime] = useState(START_DATE);
  const [endTime, setEndTime] = useState(END_DATE);

  return (
    <div className="App m-5 px-6 py-8 max-w-2xl mx-auto border-2 border-solid border-gray-700 rounded-lg shadow-xl space-y-4">
      <div className="flex justify-evenly">
        <div className="p-3 flex space-x-4">
          <div className="text-white flex-shrink-0">Start date</div>
          <DatePicker setDate={setStartTime} value={startTime} />
        </div>
        <div className="p-3 flex space-x-4">
          <div className="text-white flex-shrink-0">End date</div>
          <DatePicker setDate={setEndTime} value={endTime} />
        </div>
      </div>
      
      <WidgetList startTime={startTime} endTime={endTime} />
    </div>
  );
}

export default App;
