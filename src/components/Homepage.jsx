import React from 'react';

// pkg para formatear numeros
import millify from 'millify';

import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalSats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        {' '}
        Estadísticas Globales
      </Title>

      <Row>
        <Col span={12}>
          <Statistic
            title="Cantidad de criptomonedas"
            value={millify(globalSats.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Cantidad de mercados"
            value={millify(globalSats.totalMarkets)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Cuota de mercado"
            value={millify(globalSats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Cantidad de plataformas de intercambio"
            value={millify(globalSats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Volumen 24h"
            value={millify(globalSats.total24hVolume)}
          />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Criptomonedas en el mundo
        </Title>
        <Title level={2} className="show-more">
          <Link to={'/cryptocurrencies'}>Ver todas</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Ultimas noticias de criptomonedas
        </Title>
        <Title level={2} className="show-more">
          <Link to={'/news'}>Ver todas las noticias</Link>
        </Title>
      </div>

      <News simplified />
    </>
  );
};

export default Homepage;
