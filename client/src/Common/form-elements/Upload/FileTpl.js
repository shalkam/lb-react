import React from 'react';
import {Store} from 'react-at-rest';
import PubSub from 'pubsub-js';

import FileStore from './FileStore';
const styles = {
    wrapper: {
      margin: 10
    },
    file: {
        width: '100%',
        height: '100%'
    }
}
module.exports = class FileTpl extends React.Component {
    constructor(props) {
        super(props);
        this.store = new FileStore('files');
    }
    handleDelete(e) {
        e.preventDefault();
        const {file, container} = this.props;
        this.store.destroyResource(container + '/files/' + file.name)
            .then((data) => {
                PubSub.publish('FILE_DELETED', file);
            });
    }

    render() {
        return <div style={styles.wrapper}>
            <button onClick={this.handleDelete.bind(this) } > Delete File </button>
            {this.props.file.name}
        </div>
    }
}
