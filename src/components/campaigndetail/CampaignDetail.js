import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

const campaignList = gql`
  query {
    campaignReadCampaignUsersAndMessages {
      _id
      campaignName
      type
      messageInfo {
        _id
      }
      userInfo {
        _id
      }
    }
  }
`;

const CampaignDetail = () => {
  const [selectedCampaign, setSelectedCampaign] = useState();

  const { id } = useParams();

  let navigate = useNavigate();
  const { data, loading } = useQuery(campaignList);

  useEffect(() => {
    const campaignDetail = data.campaignReadCampaignUsersAndMessages.filter(
      (campaigndetail) => campaigndetail._id === id
    );

    setSelectedCampaign(campaignDetail[0]);
  }, [loading, data.campaignReadCampaignUsersAndMessages, id]);

  return (
    <div className="campaignContainer">
      <ArrowBack onClick={() => navigate("/campaign")} className="arrow" />

      <h1>Campaign</h1>
      {selectedCampaign && (
        <>
          <h2>{selectedCampaign.type}</h2>

          <div className="campaignList">
            <h4>{selectedCampaign.campaignName}</h4>
            <Link to="messages">
              {" "}
              <h4>
                {selectedCampaign.type} Messages (
                {selectedCampaign.messageInfo.length})
              </h4>
            </Link>
            <Link to="contacts">
              <h4>Contacts ({selectedCampaign.userInfo.length})</h4>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDetail;
