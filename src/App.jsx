import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import PremiumMembership from "./components/premiumMembership"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/devTinder-web">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premiumMembership" element={<PremiumMembership />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
