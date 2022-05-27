import { Provider } from 'react-redux';
import store from '../store/index.js';
import 'antd/dist/antd.css';
import '../public/styles/index.scss';

function MyApp({ Component, pageProps }) {
    return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
  