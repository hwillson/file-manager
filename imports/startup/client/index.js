/* global document */

import { render } from 'react-dom';

import './sentry';
import renderRoutes from './routes';

render(renderRoutes(), document.getElementById('app'));
