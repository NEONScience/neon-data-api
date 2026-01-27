import { createRoot } from 'react-dom/client';

import AppGraphiQL from './AppGraphiQL';

import './App.css';
import 'graphiql/style.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<AppGraphiQL />);
