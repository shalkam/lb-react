import {Store} from 'react-at-rest';
import qs from 'qs';

export default class AbstractStore extends Store {
  constructor(props) {
    super(props);
    this.API_PATH_PREFIX = Store.API_PATH_PREFIX;
  }
  path(action, id, {parentResourcesKey, parentResourceId, query} = {}) {
    let path = '';
    if(action === 'index' || action === 'create') {
        if (parentResourcesKey) {
          path += "/" + parentResourcesKey
          path += parentResourceId ? "/" + parentResourceId : '';
          path += "/" + this.resourcesKey;
        } else {
          path += "/" + this.resourcesKey;
        }
    }
    else if (action ==='update'){
        path += "/" + this.resourcesKey
    }
    else {
        path += "/" + this.resourcesKey
        path += id ? "/" + id : '';
    }
    return path;
  }

  getPath(action, id, {parentResourcesKey, parentResourceId, query} = {}) {
    let path = this.path(action, id, parentResourcesKey, parentResourceId, query);
    path += query ? "?" + qs.stringify(query, { encode: false, indices: false }) : '';
    return Store.API_PATH_PREFIX + path;
  }
}
