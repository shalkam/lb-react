import React from 'react';
import {RestForm, Forms} from 'react-at-rest';
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class TextInputForm extends RestForm {
    render() {
        return <li>
            <Forms.TextInput
                style={{
                    display: 'inline-block',
                    width: '70%'
                }}
                {...this.getFieldProps('name') } label=""/>
            <OverlayTrigger placement="left"
                overlay={(<Tooltip placement="right" className="in" id="tooltip-right">
                    ازالة البند
                </Tooltip>) }
                >
                <Button
                    bsStyle='danger'
                    onClick={this.props.onRemove}>
                    <FontAwesome name='minus' />
                </Button>
            </OverlayTrigger>
        </li >
    }
}