import React, { useState } from "react";

import Document from "./components/Document/Document";
import Header from "./components/Header/Header";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import PictureInput from "./components/PictureInput/PictureInput";
import ResponseSection from "./components/ResponseSection/ResponseSection";
import ConditionalRender from "./components/Conditional";

function App() {
  const [_internalViewState, setInternalViewState] = useState();

  const [showTable, setShowTable] = useState(true);
  const [responseTableData, setResponseTableData] = useState([]);
  const [responseLetterData, setResponseLetterData] = useState("");

  return (
    <React.StrictMode>
      <Document description="Bun test" title="Bun Test">
        <Header />
        <section>
          <PictureInput
            setResponseTableData={setResponseTableData}
            setResponseLetterData={setResponseLetterData}
          />
          <ControlButtons showTable={showTable} setShowTable={setShowTable} />
        </section>
        <ConditionalRender
          when={Boolean(responseLetterData && responseTableData)}
        >
          <ResponseSection
            showTable={showTable}
            responseTableData={responseTableData}
            responseLetterData={responseLetterData}
          />
        </ConditionalRender>
      </Document>
    </React.StrictMode>
  );
}

export default App;
