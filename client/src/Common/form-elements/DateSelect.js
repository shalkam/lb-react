import React from 'react';
import {RestFormElement, Forms} from 'react-at-rest';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
import startCase from 'lodash/startCase';
import classNames from 'classnames';
import DatePicker from 'material-ui/DatePicker';

module.exports = class DateSelect extends RestFormElement {

    constructor(props) {
        super(props);
        const propTypes = extend({}, RestFormElement.propTypes, {
            hideLabel: React.PropTypes.bool,
            inputClassName: React.PropTypes.string,
            inputType: React.PropTypes.string,
            onChange: React.PropTypes.func,
            style: React.PropTypes.object
        }
        );
        this.PropTypes = propTypes;
        this.defaultProps = { hideLabel: false };
        this.state = { value: (this.props.value) ? new Date(this.props.value) : {} };
    }
    handleDateChange(e, data) {
        const el = this.refs.dateInput;
        el.value = data;
        this.handleChange({ target: el });
        this.setState({ value: data });
    }
    render() {
        const className = (classNames['DatePicker'], this.props.className);
        let label = '';
        if (!this.props.hideLabel) {
            const labelClassName = (classNames['control-label'], this.props.labelClassName);
            label = <Forms.Label
                label={this.props.label}
                name={this.props.name}
                required={this.props.required}
                className={labelClassName}/>
        }
        return <div className={this.props.className} style={this.props.style}>
            <Forms.FieldWrapper errors={this.props.errors}>
                {label}
                <div className={this.props.inputWrapperClassName}>
                    <input ref='dateInput' type="hidden" name={this.props.name} value={this.state.value} onChange={this.handleChange}/>
                    <DatePicker {...this.props} name={this.props.name + '-date-picker'}  value={this.state.value} onChange={this.handleDateChange.bind(this) }/>
                    <Forms.FieldHint hint={this.props.hint} className={this.props.hintClassName} />
                    <Forms.FieldErrors errors={this.props.errors} />
                </div>
            </Forms.FieldWrapper>
        </div>
    }
}