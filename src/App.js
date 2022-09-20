import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Campaign from "./components/campaign/Campaign";
import Navbar from "./components/navbar/Navbar";
import "./pages/form.css";
import CampaignDetail from "./components/campaigndetail/CampaignDetail";
import Messages from "./components/Messages/Messages";
import MessageDetail from "./components/MessageDetail/MessageDetail";
import Contacts from "./components/Contacts/contacts";
import ContactDetails from "./components/ContactDetails/ContactDetails";
import RequireAuth from "./context/RequireAuth";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="campaign"
            element={
              <RequireAuth>
                <Campaign />
              </RequireAuth>
            }
          />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/campaign/:id/messages" element={<Messages />} />
          <Route path="/campaign/:id/contacts" element={<Contacts />} />
          <Route
            path="/campaign/:id/messages/:id"
            element={<MessageDetail />}
          />
          <Route
            path="/campaign/:id/contacts/:id"
            element={<ContactDetails />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
