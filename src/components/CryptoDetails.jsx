import React from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import Loader from './Loader';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();

  const { data: details, isFetching } = useGetCryptoDetailsQuery(coinId);

  const cryptoDetails = details?.data?.coin;

  if (isFetching) return <Loader />;

  const stats = [
    {
      title: 'Precio en dólares',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Ranking', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: 'Volumen 24h',
      value: `$ ${
        cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Cuota de mercado',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'ATH (Promedio Diario.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Cantidad de Mercados',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Cantidad de plataformas de Intercambio',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Suministro aprobado',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Suministro Total',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Suministro en circulación',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol})
        </Title>
        <p>
          Precio en vivo en USD de {cryptoDetails?.name}, estadísticas,
          suministro, cuota de mercado.
        </p>
      </Col>

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Estadísticas sobre {cryptoDetails?.name}
            </Title>
            <p>
              Un vistazo general de las estadisticas de {cryptoDetails?.name},
              tales como su ranking, volumen 24 horas, la cuota de mercado.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              Estadísticas más generales sobre {cryptoDetails?.name}, tales como
              la cantidad de lugares donde se comercializa, el suministro en
              circulación, etc.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-links">
        <Title level={3} className="coin-details-heading">
          {cryptoDetails?.name} Links
        </Title>
        {cryptoDetails?.links?.map((link) => (
          <Row className="coin-link" key={link.name}>
            <Title level={5} className="link-name">
              {link.type}
            </Title>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          </Row>
        ))}
      </Col>
    </Col>
    // Line chart
  );
};

export default CryptoDetails;
