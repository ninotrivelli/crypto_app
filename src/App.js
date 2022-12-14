import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

// Importamos todos los compnentes de un solo lugar (components/index.js) con sus exports

import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from './components';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>

              <Route exact path="/exchanges" element={<Exchanges />}></Route>

              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              ></Route>

              <Route
                exact
                path="/crypto/:coinId"
                element={<CryptoDetails />}
              ></Route>

              <Route exact path="/news" element={<News />}></Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Crypto App <br />
          </Typography.Title>

          <Space>
            <Link to="/">Home - </Link>
            <Link to="/exchanges">Plataformas de Intercambio - </Link>
            <Link to="/news">Noticias</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
