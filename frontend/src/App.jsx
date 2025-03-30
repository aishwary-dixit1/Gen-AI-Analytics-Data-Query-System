import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./redux/appStore";
import Toaster from "react-hot-toast";


const App = () => {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<Body />}>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Route>
        </Routes>
        <Toaster position="top-center"/>
      </BrowserRouter>
    </Provider>
    </>
  );
};

export default App;
