import {Store, Utils} from 'react-at-rest';
import qs from 'qs';

export default class RestStore extends Store {
  constructor(props) {
    super(props);
    this.API_PATH_PREFIX = Store.API_PATH_PREFIX;
  }
  path(action, id, {parentResourcesKey, parentResourceId, query} = {}) {
    let path = '';
    switch (action) {
      case 'index':
      case 'create':
        if (parentResourcesKey) {
          path += "/" + parentResourcesKey
          path += parentResourceId ? "/" + parentResourceId : '';
          path += "/" + this.resourcesKey;
        }
      default:
        path += "/" + this.resourcesKey
        path += id ? "/" + id : '';
    }

    return path;
  }

  getPath(action, id, {parentResourcesKey, parentResourceId, query} = {}) {
    let path = this.path(action, id, parentResourcesKey, parentResourceId, query);
    path += query ? "?" + qs.stringify(query) : '';
    return Store.API_PATH_PREFIX + path;
  }

  update(url, data) {
    return this.ajax(url, 'PUT', data);
  }
}
