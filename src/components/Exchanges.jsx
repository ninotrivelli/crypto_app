import React from 'react';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { Collapse, Avatar, Row, Col, Typography, Space } from 'antd';
import millify from 'millify';
const { Panel } = Collapse;
const { Title, Text } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  console.log(exchanges);

  return (
    <>
      <Title level={2} className="heading">
        {' '}
        Plataformas de Intercambio
      </Title>

      <Row mx={5}>
        <Col span={8}>Ranking</Col>
        <Col span={8}>Volumen 24 horas</Col>
        <Col span={8}>Cantidad de Mercados</Col>
      </Row>

      <Collapse defaultActiveKey={['1']}>
        {exchanges.map((ex) => (
          <Panel
            key={ex.uuid}
            header={
              <Row key={ex.uuid}>
                <Col span={8}>
                  <Text>
                    <strong>{ex.rank}.</strong>
                  </Text>
                  <Avatar className="exchange-image" src={ex.iconUrl} />
                  <Text>
                    <strong>{ex.name}</strong>
                  </Text>
                </Col>
                <Col span={8}>${millify(ex['24hVolume'])}</Col>
                <Col span={8}>{millify(ex.numberOfMarkets)}</Col>
              </Row>
            }
          >
            <Text>
              {' '}
              <a href={ex.coinrankingUrl} target="_blank">
                Operar en {ex.name}{' '}
              </a>
            </Text>
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default Exchanges;
