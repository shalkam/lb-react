import React from 'react';
import {RestFormElement, Forms} from 'react-at-rest';
import extend from 'lodash/extend';
import classNames from 'classnames';
import MultiSel from 'react-widgets/lib/Multiselect';
import 'react-widgets/lib/less/react-widgets.less';

class Multiselect extends RestFormElement {
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
    this.state = { data: ['orange', 'red', 'blue'], value: this.props.value };
  }
  _create(name) {
    var value = this.state.value.concat(name);
    this.props.onChange(this.props.name, value);
    var data = this.state.data.concat(name);
    this.setState({ data, value });
  }
  handleFieldChange(value) {
    this.setState({ value });
    this.props.onChange(this.props.name, value);
  }
  render() {
    const className = (classNames['Multiselect'], this.props.className);
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
          <MultiSel
            {...this.props}
            onChange={this.handleFieldChange.bind(this) }
            />
          <Forms.FieldHint hint={this.props.hint} className={this.props.hintClassName} />
          <Forms.FieldErrors errors={this.props.errors} />
        </div>
      </Forms.FieldWrapper>
    </div>
  }
}

Multiselect.defaultProps = { hideLabel: false, value: [] };

module.exports = Multiselect;
