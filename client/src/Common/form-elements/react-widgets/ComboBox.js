import React from 'react';
import {RestFormElement, Forms} from 'react-at-rest';
import extend from 'lodash/extend';
import classNames from 'classnames';
import Combo from 'react-widgets/lib/Combobox';
import 'react-widgets/lib/less/react-widgets.less';

module.exports = class ComboBox extends RestFormElement {

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
        this.state = { value: this.props.value};
    }
    handleFieldChange(value) {
      this.setState({value});
      this.props.onChange(this.props.name, value)
    }
    render() {
        const className = (classNames['ComboBox'], this.props.className);
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
                    <Combo
                    {...this.props}
                    ref='combo' type='combo' value={this.state.value}
                    onChange={this.handleFieldChange.bind(this)}
                    suggest={true}/>
                    <Forms.FieldHint hint={this.props.hint} className={this.props.hintClassName} />
                    <Forms.FieldErrors errors={this.props.errors} />
                </div>
            </Forms.FieldWrapper>
        </div>
    }
}
