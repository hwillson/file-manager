import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Files from '../../ui/components/Files';

const renderRoutes = () => (
  <BrowserRouter>
    <Files />
  </BrowserRouter>
);

export default renderRoutes;
