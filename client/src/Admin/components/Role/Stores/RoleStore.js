import AbstractStore from '../../../../Common/abstracts/AbstractStore';

export default class RoleStore extends AbstractStore {
    constructor(props) {
        super(props);
    }
    update(url, data) {
        return this.ajax(url, 'PUT', data);
    }
}
