import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Loader from './Loader';
import moment from 'moment/moment';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  'https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Criptomonedas');

  const { data: cryptoList } = useGetCryptosQuery(50);
  const { data: cryptoNews, isFetching } = useGetNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            style={{ width: 300 }}
            showSearch
            className="select-news"
            placeholder="Selecciona una criptomoneda"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Criptomonedas">Todo</Option>
            {cryptoList?.data?.coins.map((coin) => (
              <Option value={coin.name}> {coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews.value.map((newsArticle, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={newsArticle.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {newsArticle.name}
                </Title>
                <img
                  className="img"
                  src={newsArticle?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>

              <p>
                {newsArticle.description.length > 180
                  ? `${newsArticle.description.substring(
                      0,
                      180
                    )} ... (continua)`
                  : newsArticle.description}
              </p>

              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      newsArticle.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Text className="provider-name">
                    {newsArticle.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(newsArticle.datePublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
