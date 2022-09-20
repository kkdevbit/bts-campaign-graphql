import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import "./message.css";

const MessagesList = gql`
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
      }
    }
  }
`;

const Messages = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(MessagesList);

  const [selectedMessages, setSelectedMessages] = useState();
  useEffect(() => {
    if (!loading) {
      const campaign = data.campaignReadCampaignUsersAndMessages.filter(
        (campaign) => campaign._id === id
      )[0];
      setSelectedMessages(campaign.messageInfo);
    }
  }, [loading, id, data?.campaignReadCampaignUsersAndMessages]);

  return (
    <>
      <ArrowBack onClick={() => navigate(-1)} className="arrow" />

      <div className="messageContainer">
        {selectedMessages &&
          selectedMessages.map((message) => {
            return (
              <Link to={`${message._id}`} key={message._id}>
                <div className="listmessage"> {message.name}</div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Messages;
