import ReactDOM from 'react-dom';

import SHOPS from './data/shops';
import App from './components/App';

ReactDOM.render(
    <App shops={SHOPS} />,
    document.getElementById('container')
);
