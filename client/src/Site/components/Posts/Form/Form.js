import React from 'react';
import {Forms} from 'react-at-rest';
import {injectIntl} from 'react-intl';

import AbstractForm from '../../../../Common/abstracts/AbstractForm'
import {
  Button,
  Accordion,
  Panel,
  Tab,
  Grid,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Nav,
  NavItem
}
from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import FontAwesome from 'react-fontawesome';


class Form extends AbstractForm {
  render() {
    const {messages, locale} = this.props.intl;
    return (<form onSubmit={this.handleSubmit}>
      <Tab.Container id='left-tabs-example' defaultActiveKey='1'>
        <Row className='clearfix'>
          <Col sm={2}>
            <AutoAffix viewportOffsetTop={15}>
              <Nav bsStyle='pills' stacked>
                <NavItem eventKey='1'>
                  {messages['section.base']}
                </NavItem>
                <li className='active'>
                  <OverlayTrigger placement='left'
                    overlay={(<Tooltip placement='top' className='in' id='tooltip-top'>
                      {messages['form.saveText']}
                    </Tooltip>) }
                    >
                    <Button type='submit' bsStyle='success'>  {messages['form.save']} <FontAwesome name='floppy-o' /></Button>
                  </OverlayTrigger>
                </li>
              </Nav>
            </AutoAffix>
          </Col>
          <Col sm={10}>
            <Tab.Content animation>
              <Tab.Pane eventKey='1'>
                <Forms.TextInput {...this.getFieldProps('userid') } style={{ display: 'none' }}/>
                <Forms.TextInput {...this.getFieldProps('title') } label={messages['label.title']}/>
                <Forms.TextAreaInput {...this.getFieldProps('text') } label={messages['label.text']}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </form>);
  }
}

export default injectIntl(Form);
