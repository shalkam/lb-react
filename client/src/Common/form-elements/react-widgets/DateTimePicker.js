import React from 'react';
import {RestFormElement, Forms} from 'react-at-rest';
import extend from 'lodash/extend';
import classNames from 'classnames';
import DateTime from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/lib/less/react-widgets.less';

class DateTimePicker extends RestFormElement {
  handleFieldChange(value) {
    this.props.onChange(this.props.name, value);
  }
  render() {
    const className = (classNames['DateTimePicker'], this.props.className);
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
          <DateTime
            {...this.props}
            name={this.props.name}
            value={new Date(this.props.value)}
            defaultValue={null}
            onChange={this.handleFieldChange.bind(this) }
            />
          <Forms.FieldHint hint={this.props.hint} className={this.props.hintClassName} />
          <Forms.FieldErrors errors={this.props.errors} />
        </div>
      </Forms.FieldWrapper>
    </div>
  }
}

DateTimePicker.defaultProps = { hideLabel: false, value: new Date() };

module.exports = DateTimePicker;
