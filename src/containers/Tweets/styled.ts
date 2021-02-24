import styled from "styled-components";

const TweetsContainer = styled.div`
  padding: 0 1rem;
`;

const Card = styled.div`
  background-color: white;
  width: 100%; //temp
  padding: 1rem;
  border: 1px solid rgb(235, 238, 240);
  display: flex;
`;

const AvatarWrapper = styled.div`
  width: 10%;
`;

const Content = styled.div`
  padding-left: 1rem;
  width: 90%;
`;

const ContentHeader = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: rgb(15, 20, 25);
  padding-right: 0.25rem;
`;

const ScreenName = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: rgb(91, 112, 131);
`;

const CreatedAt = styled(ScreenName)``;

const Text = styled(Name)`
  font-weight: 400;
`;

const ImageWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 8px;
  height: 284px;
  overflow: hidden;
`;

const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 30%;
  color: rgb(91, 112, 131);
`;

const IconCount = styled.div`
  padding-left: 0.5rem;
`;

const EntitesWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 1rem 0;
  word-wrap: break-word;
  width: 100%;
`;

const Hashtag = styled.div`
  cursor: pointer;
  color: rgb(27, 149, 224);
  padding-right: 0.5rem;
`;

const Mention = styled.div`
  cursor: pointer;
  color: rgb(27, 149, 224);
  padding-right: 0.5rem;
`;

export const SC = {
  TweetsContainer,
  Card,
  AvatarWrapper,
  Content,
  ContentHeader,
  Name,
  ScreenName,
  CreatedAt,
  Text,
  ImageWrapper,
  Footer,
  IconWrapper,
  IconCount,
  EntitesWrapper,
  Hashtag,
  Mention,
};
