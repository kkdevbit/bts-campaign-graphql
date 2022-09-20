import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./campaign.css";
import { Link } from "react-router-dom";

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

const Campaign = () => {
  const { data, loading } = useQuery(campaignList);
  return (
    <div className="campaignContainer">
      {loading && <h3>Please wait Loading...</h3>}
      <h1>Campaign</h1>
      {data &&
        data.campaignReadCampaignUsersAndMessages.map((campaign) => {
          return (
            <Link
              to={`${campaign._id}`}
              className="campaignLists"
              key={campaign._id}
            >
              <div>
                <h4>Name: {campaign.campaignName}</h4>
                <h4>Type: {campaign.type}</h4>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Campaign;
