import React from 'react';
import {RestFormElement, Forms, Store} from 'react-at-rest';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import PubSub from 'pubsub-js';

import FileStore from './FileStore';
import FileTpl from './FileTpl';

const styles = {
    wrapper: {
        display: 'block',
        flexWrap: 'wrap',
    },
};

module.exports = class Upload extends RestFormElement {
    componentWillMount() {
        const propTypes = extend({}, RestFormElement.propTypes, {
            hideLabel: React.PropTypes.bool,
            inputClassName: React.PropTypes.string,
            onBlur: React.PropTypes.func
        }
        );
        this.PropTypes = propTypes;
        this.state = {
            uploaded: this.props.value ? this.props.value.uploaded: [],
            uploading: {}
        };
        this.uid = this.props.uid;
        this.container = this.props.name+'_'+this.uid;
        this.store = new FileStore('files');
        this.defaultProps = { hideLabel: false };
        PubSub.subscribe("FILE_UPLOADING", this.handleUploading.bind(this));
        PubSub.subscribe("FILE_UPLOADED", this.handleUploaded.bind(this));
        PubSub.subscribe("FILE_DELETED", this.handleDeleted.bind(this));
    }
    handleUploaded(msg, data) {
        if (data.result.ok) {
            const name = data.result.body.result.files.file[0].name;
            const {uploaded, uploading} = this.state;
            uploaded.push({ name });
            this.setState({ uploaded });
            this.props.onChange(this.props.name, {container: this.container, uploaded });
        }
    }
    handleDeleted(msg, data) {
        const {uploaded, uploading} = this.state;
        const index = uploaded.findIndex((file, index, array) => {
          return data.name === file.name;
        });
        uploaded.splice(index, 1);
        this.setState({ uploaded });
        this.props.onChange(this.props.name, { container: this.container, uploaded });
    }
    handleUploading(msg, data) {
        const uploading = this.state.uploading;
        uploading[data.index] = true;
        this.setState({ uploading });
    }
    handleDrop(files) {
        files.map((file, index) => {
            this.store.createResource({ file, index, name: this.props.name, uid: this.uid });
        });
        this.setState({
            files: files
        });
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    render() {
        const uploading = false;
        const className = (classNames['DZone'], this.props.className);
        const uploaded = [];
        for (var key in this.state.uploaded) {
            if (this.state.uploaded.hasOwnProperty(key)) {
                uploaded.push(<FileTpl key={key} file={this.state.uploaded[key]} container={this.container} />)
            }
        }
        return <div className={className}>
            <Forms.FieldWrapper errors={this.props.errors} formGroup={false}>
                <label className={this.props.labelClassName}>
                    <div className={this.props.inputWrapperClassName}>
                        <Dropzone ref="dropzone" className={this.props.inputClassName} onDrop={this.handleDrop.bind(this) }>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                        <button type="button" onClick={this.onOpenClick.bind(this) }>
                            Select File
                        </button>
                        <div style={styles.wrapper}>
                            {uploaded}
                        </div>
                        <div style={{ display: uploading ? 'block' : 'none' }}>
                            Uploading....
                        </div>
                    </div>
                </label>
            </Forms.FieldWrapper>
        </div>
    }
}
