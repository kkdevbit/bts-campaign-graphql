import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./messageDetail.css";

const messageDetail = gql`
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
      }
    }
  }
`;

const MessageDetail = () => {
  const [selectedMessageDetail, setSelectedMessageDetail] = useState();

  const { id } = useParams();
  let navigate = useNavigate();

  const { data, loading } = useQuery(messageDetail);

  useEffect(() => {
    if (!loading) {
      const messageData = data.campaignReadCampaignUsersAndMessages.map(
        (campaignData) =>
          campaignData.messageInfo.filter(
            (messagedetail) => messagedetail._id === id
          )
      );

      let num = messageData.findIndex(
        (messageElement) => messageElement.length === 1
      );

      setSelectedMessageDetail(messageData[num]);
    }
  }, [loading, data?.campaignReadCampaignUsersAndMessages, id]);
  return (
    <div className="main">
      {loading && <h3>Please wait Loading...</h3>}
      <ArrowBack onClick={() => navigate(-1)} className="arrow" />

      {selectedMessageDetail &&
        selectedMessageDetail.map((messageData) => {
          return (
            <div key={messageData._id} className="message-detail-container">
              <div className="message-detail-image">
                <img
                  src={messageData.featureImage}
                  alt={`Img of ${messageData.name} message`}
                />
              </div>
              <div className="message-detail-text">
                <h3>{messageData.name}</h3>
                <h3>{messageData.excerpt}</h3>
                <h3>{messageData.delay} Day Delay</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MessageDetail;
