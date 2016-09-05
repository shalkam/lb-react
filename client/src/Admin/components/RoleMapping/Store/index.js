import AbstractStore from '../../../../Common/abstracts/AbstractStore'

export default class StoreIndex extends AbstractStore {
  constructor(props) {
    super(props);
  }
  update(url, data) {
    const putUrl = url + '/' + data.id + '/sync-roles';
    return this.ajax(putUrl, 'PUT', { roles: data.roles });
  }
}
