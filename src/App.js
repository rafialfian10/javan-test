import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import TableDatas from "./components/tableData/TableData";

function App() {

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          exact
          path="/tableData"
          element={<TableDatas />}
        />
      </Routes>
    </>
  );
}

export default App;
