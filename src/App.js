import React from "react";
import {Route, Routes} from "react-router";
import Main from "./Pages/Main";
import Details from "./Pages/Details/Details";

function App() {
  return (
    <div className="bg-cyan-500 min-h-screen">
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/details'} element={<Details/>}/>
        </Routes>

    </div>
  );
}

export default App;
