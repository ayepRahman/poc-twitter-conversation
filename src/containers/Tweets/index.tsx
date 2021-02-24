import React from "react";
import { useLazyQuery } from "@apollo/client";
import { format, subDays } from "date-fns";
import { StringParam, useQueryParams } from "use-query-params";
import { Avatar, Image, Row, Col, Spin, Card } from "antd";
import {
  UserOutlined,
  CommentOutlined,
  RetweetOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { formatDistanceToNowStrict } from "date-fns";
import { SC } from "./styled";
import { SEARCH_PREMIUM_TWEETS } from "./gql";
import styled from "styled-components";

const DATE_FORMAT = "yyyyMMddhhmm";

let date = format(subDays(new Date(), 15), DATE_FORMAT);

console.log("date", date);

const ele = {
  id: "1364027709320437800",
  createdAt: "Tue Feb 23 01:42:02 +0000 2021",
  userName: "yuki",
  userScreenName: "yukilah",
  userImgUrl:
    "http://pbs.twimg.com/profile_images/1296321858971643905/NcLOhAxT_normal.jpg",
  text:
    "RT @akiko_lawson: ／\nApple PayのPontaポイント10％還元キャンペーン♪ \n＼\n@akiko_lawsonをフォロー&amp;リツイートしてくれた方から抽選で1名様にポンタグッズ当たります(^^) #ローソン #ApplePay #Ponta \nhttps…",
  hashtags: ["ApplePay", "Ponta", "ApplePay", "Ponta", "ApplePay", "Ponta"],
  mentions: ["akiko_lawson", "akiko_lawson"],
  imageUrls: ["http://pbs.twimg.com/media/Eu2CxYjXEAEf1mO.jpg"],
  replyCount: 13,
  retweetCount: 88,
  favouriteCount: 23,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export interface TweetCardProps {
  id: string;
  avatarImgUrl: string;
  name: string;
  screeName: string;
  createdAt: Date;
  text: string;
  hashtags: string[];
  mentions: string[];
  imgUrl: string;
  replyCount: number;
  retweetCount: number;
  favouriteCount: number;
}

const TweetCard: React.FC<TweetCardProps> = ({
  id,
  avatarImgUrl,
  name,
  screeName,
  createdAt,
  text,
  hashtags,
  mentions,
  imgUrl,
  replyCount,
  retweetCount,
  favouriteCount,
}) => {
  return (
    <SC.Card key={id}>
      <Avatar icon={<UserOutlined />} src={<Image src={avatarImgUrl} />} />
      <SC.Content>
        <SC.ContentHeader>
          <SC.Name>{name}</SC.Name>
          <SC.ScreenName>@{screeName}</SC.ScreenName>
          &nbsp; &bull; &nbsp;
          <SC.CreatedAt>
            {formatDistanceToNowStrict(new Date(createdAt))}
          </SC.CreatedAt>
        </SC.ContentHeader>
        <SC.Text>{`${text}`}</SC.Text>
        <SC.EntitesWrapper>
          {hashtags.length
            ? hashtags.map((str) => <SC.Hashtag>#{`${str}`}</SC.Hashtag>)
            : null}
          {mentions.length
            ? mentions.map((str) => <SC.Mention>@{str}</SC.Mention>)
            : null}
        </SC.EntitesWrapper>
        {imgUrl && (
          <SC.ImageWrapper>
            <Image height="100%" src={imgUrl} />
          </SC.ImageWrapper>
        )}
        <SC.Footer>
          <SC.IconWrapper>
            <CommentOutlined />
            <SC.IconCount>{replyCount}</SC.IconCount>
          </SC.IconWrapper>
          <SC.IconWrapper>
            <RetweetOutlined />
            <SC.IconCount>{retweetCount}</SC.IconCount>
          </SC.IconWrapper>
          <SC.IconWrapper>
            <HeartOutlined />
            <SC.IconCount>{favouriteCount}</SC.IconCount>
          </SC.IconWrapper>
        </SC.Footer>
      </SC.Content>
    </SC.Card>
  );
};

export interface PremiumSearchTweetsProps {
  id: string;
  createdAt: string;
  userName: string;
  userScreenName: string;
  userImgUrl: string;
  text: string;
  hashtags: string[];
  mentions: string[];
  imageUrls: string[];
  replyCount: number;
  retweetCount: number;
  favouriteCount: number;
}

export interface SearchPremiumTweetsData {
  premiumSearchTweets: PremiumSearchTweetsProps[];
}

export interface SearchPremiumTweetsVar {
  query: string;
  fromDate: string;
  toDate: string;
}

const Tweets = () => {
  const [query] = useQueryParams({
    search: StringParam,
    start: StringParam,
    end: StringParam,
  });

  const [tweets, setTweets] = React.useState<PremiumSearchTweetsProps[]>([]);
  const [fetchTweets, { loading }] = useLazyQuery<
    SearchPremiumTweetsData,
    SearchPremiumTweetsVar
  >(SEARCH_PREMIUM_TWEETS, {
    onCompleted: ({ premiumSearchTweets }) => {
      if (premiumSearchTweets?.length) {
        setTweets(premiumSearchTweets);
      }
    },
  });

  React.useEffect(() => {
    fetchTweets({
      variables: {
        query: query.search || "",
        fromDate:
          (query.start && format(new Date(query.start), DATE_FORMAT)) || "",
        toDate: (query.end && format(new Date(query.end), DATE_FORMAT)) || "",
      },
    });
  }, [query.search, query.start, query.end]);

  if (loading) {
    return (
      <SC.TweetsContainer>
        <Card>
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        </Card>
      </SC.TweetsContainer>
    );
  }

  if (!tweets?.length) {
    return (
      <SC.TweetsContainer>
        <Card>
          <div style={{ textAlign: "center" }}>No Data</div>
        </Card>
      </SC.TweetsContainer>
    );
  }

  return (
    <SC.TweetsContainer>
      <Row justify="center" align="middle">
        {tweets?.length
          ? tweets.map((ele) => {
              return (
                <Col key={ele.id} span={8}>
                  <TweetCard
                    id={ele.id}
                    avatarImgUrl={ele.userImgUrl}
                    name={ele.userName}
                    screeName={ele.userScreenName}
                    createdAt={new Date(ele.createdAt)}
                    text={ele.text}
                    hashtags={ele.hashtags}
                    mentions={ele.mentions}
                    imgUrl={ele.imageUrls[0]}
                    replyCount={ele.replyCount}
                    retweetCount={ele.retweetCount}
                    favouriteCount={ele.favouriteCount}
                  />
                </Col>
              );
            })
          : null}
      </Row>
    </SC.TweetsContainer>
  );
};

export default Tweets;
