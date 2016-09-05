import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {Button, Tooltip, OverlayTrigger, Panel} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import TextInputForm from './TextInputForm';

export default class StandardForm extends RestForm {
    render() {
        return <Panel className="evalWrapper">
            <Forms.TextInput {...this.getFieldProps('name') }
                label="نص المعيار"
                />
            <OverlayTrigger placement="left"
                overlay={(<Tooltip placement="top" className="in">
                    ازالة المعيار
                </Tooltip>) }
                >
                <Button
                    bsStyle='danger'
                    onClick={this.props.onRemove}>
                    ازالة  المعيار
                    <FontAwesome name='minus' />
                </Button>
            </OverlayTrigger>
        </Panel>

    }
}
