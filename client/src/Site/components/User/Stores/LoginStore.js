import {Store} from 'react-at-rest';
import cookie from 'react-cookie';

export default class LoginStore extends Store {
    constructor(props) {
        super(props);
    }

    post(url, options) {
        const store = this;
        return store.ajax(url + '/login', 'POST', options)
            .then((data) => {
                cookie.save('token', data.id, { path: '/' });
                Store.SUPERAGENT_PLUGINS = [
                    require('../../../../Common/lib/Token')(data.id)
                ];
                return store.ajax(url + '/' + data.userId + '/info', 'GET', options);
            });
    }
}
