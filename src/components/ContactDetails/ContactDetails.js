import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./contactDetail.css";

const contactDetail = gql`
  query {
    campaignReadCampaignUsersAndMessages {
      _id
      campaignName
      type
      messageInfo {
        _id
        name
        featureImage
        excerpt
        time
        delay
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

const ContactDetail = () => {
  const [selectedContactDetail, setSelectedContactDetail] = useState();

  const { id } = useParams();
  let navigate = useNavigate();

  const { data, loading } = useQuery(contactDetail);

  useEffect(() => {
    if (!loading) {
      const contactData = data.campaignReadCampaignUsersAndMessages.map(
        (campaignData) =>
          campaignData.userInfo.filter(
            (contactdetail) => contactdetail._id === id
          )
      );
      let num = contactData.findIndex(
        (contactElement) => contactElement.length === 1
      );

      setSelectedContactDetail(contactData[num]);
    }
  }, [loading, data?.campaignReadCampaignUsersAndMessages, id]);
  return (
    <div>
      {loading && <h3>Please wait Loading...</h3>}
      <ArrowBack onClick={() => navigate(-1)} className="arrow" />

      {selectedContactDetail &&
        selectedContactDetail.map((contactData) => {
          return (
            <div key={contactData._id} className="contact-detail-container">
              <h3>Name: {contactData.profile.firstName}</h3>
              <h4>
                Phone:{" "}
                {contactData.profile.phone
                  ? contactData.profile.phone
                  : "No number present"}
              </h4>
              <h4>Email: {contactData.username}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default ContactDetail;
