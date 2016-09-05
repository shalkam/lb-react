import {Store} from 'react-at-rest';
import cookie from 'react-cookie';
import Request from 'superagent';
import PubSub from 'pubsub-js';


export default class FileStore extends Store {
    constructor(props) {
        super(props);
    }

    post(url, options) {
        const token = cookie.load('token', { path: '/' });
        const {uid, name} = options;
        return this.ajax(url, 'POST', {name: name+'_'+uid})
        .then((data) => {
          return new Promise((resolve, reject) => {
            const req = Request.post(url + '/' + name+'_'+uid + '/upload');
            if (token !== undefined) {
                req.use(require('../../lib/Token')(token.id));
            }
            req.field('file', options.file)
                .on('progress', function (e) {
                    PubSub.publish('FILE_UPLOADING', { percentage: e.percent, index: options.index });
                })
                .end(function (err, res) {
                    PubSub.publish('FILE_UPLOADED', { result: res, index: options.index });
                });
          });
        }).catch((err) => {
          return new Promise((resolve, reject) => {
            const req = Request.post(url + '/' + name+'_'+uid + '/upload');
            if (token !== undefined) {
                req.use(require('../../lib/Token')(token.id));
            }
            req.field('file', options.file)
                .on('progress', function (e) {
                    PubSub.publish('FILE_UPLOADING', { percentage: e.percent, index: options.index });
                })
                .end(function (err, res) {
                    PubSub.publish('FILE_UPLOADED', { result: res, index: options.index });
                });
          });
        });
    }
}
