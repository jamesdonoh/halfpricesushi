import ReactDOM from 'react-dom';

import SHOPS from './data/shops';

import './styles/global.css';

import Shop from './components/Shop';

ReactDOM.render(
    <div>
        {SHOPS.map((shop) => <Shop key={shop.url} name={shop.name} closes={shop.closes.Monday} />)}
    </div>,
    document.getElementById('container')
);
