import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/index';
import Home from '../pages/home/index';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
);

export default AppRoutes;
