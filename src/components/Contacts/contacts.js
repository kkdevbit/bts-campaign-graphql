import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import "./contacts.css";

// import React from "react";

const ContactList = gql`
  query {
    campaignReadCampaignUsersAndMessages {
      _id
      campaignName
      type
      messageInfo {
        _id
        name
      }
      userInfo {
        _id
        username
        profile {
          firstName
          phone
        }
      }
    }
  }
`;

const Contacts = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(ContactList);

  const [selectedContacts, setSelectedContacts] = useState([]);
  useEffect(() => {
    if (!loading) {
      const campaign = data.campaignReadCampaignUsersAndMessages.filter(
        (campaign) => campaign._id === id
      )[0];
      setSelectedContacts(campaign.userInfo);
    }
  }, [loading, id, data?.campaignReadCampaignUsersAndMessages]);

  return (
    <>
      <ArrowBack onClick={() => navigate(-1)} className="arrow" />

      <div className="contactsContainer">
        {loading && <h3>Please wait loading...</h3>}
        {selectedContacts.length !== 0 ? (
          selectedContacts.map((contacts) => (
            <Link to={`${contacts._id}`} key={contacts._id}>
              <div className="listcontacts">{contacts.profile.firstName} </div>
            </Link>
          ))
        ) : (
          <h3>No Data Present</h3>
        )}
      </div>
    </>
  );
};

export default Contacts;
