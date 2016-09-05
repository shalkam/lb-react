import React from 'react';
import {RestFormElement, Forms} from 'react-at-rest';
import extend from 'lodash/extend';
import classNames from 'classnames';
import DDList from 'react-widgets/lib/DropdownList';
import 'react-widgets/lib/less/react-widgets.less';

class DropdownList extends RestFormElement {
  setValue(value) {
    this.props.onChange(this.props.name, value)
  }
  handleFieldChange(value) {
    if (this.props.valueField) {
      this.setValue(value[this.props.valueField])
    } else {
      this.setValue(value)
    }
  }
  render() {
    const className = (classNames['DropdownList'], this.props.className);
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
          <DDList
            {...this.props}
            value={this.props.value}
            onChange={this.handleFieldChange.bind(this) }
            />
          <Forms.FieldHint hint={this.props.hint} className={this.props.hintClassName} />
          <Forms.FieldErrors errors={this.props.errors} />
        </div>
      </Forms.FieldWrapper>
    </div>
  }
}

DropdownList.defaultProps = { hideLabel: false };

module.exports = DropdownList;
