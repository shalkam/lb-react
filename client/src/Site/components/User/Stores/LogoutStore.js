import {Store} from 'react-at-rest';

export default class LogoutStore extends Store {
    constructor(props) {
        super(props);
    }
  
    post(url, options) {
        return this.ajax(url+'/logout', 'POST', options);
    }
}