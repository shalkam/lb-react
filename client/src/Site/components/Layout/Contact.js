import React from 'react';
import {Link} from 'react-router';
import {injectIntl} from 'react-intl';

class Contact extends React.Component {
    render() {
        const {messages} = this.props.intl;
        return <div className="contact" id="contact">
        <div className="col-md-12 w3agile_contact_right">
          <div className="col-xs-6 w3agile_contact_right_agileinfo">
            <h4>{messages['contact.address']}</h4>
            <p><span className="glyphicon glyphicon-map-marker" aria-hidden="true" />8921 California Long Beach <i>PO Box 8921 202 East Ocean.</i></p>
            <p><span className="glyphicon glyphicon-earphone" aria-hidden="true" />(+) 0983 010 823</p>
            <p><span className="glyphicon glyphicon-envelope" aria-hidden="true" /><a href="mailto:info@example.com">info@example.com</a></p>
          </div>
          <div className="col-xs-6 w3agile_contact_right_agileinfo">
            <h4>{messages['contact.followus']}</h4>
            <div className="agileits_social_icons">
              <a href="#" className="icon-button twitter"><i className="icon-twitter" /><span /></a>
              <a href="#" className="icon-button facebook"><i className="icon-facebook" /><span /></a>
              <a href="#" className="icon-button google-plus"><i className="icon-google-plus" /><span /></a>
            </div>
          </div>
          <div className="clearfix"> </div>
          <div className="w3_copy_right">
            <p>© 2016 Cranleigh. All rights reserved | Design by <a href="http://w3layouts.com">W3layouts</a></p>
          </div>
        </div>
        <div className="clearfix"> </div>
      </div>
      {/* //contact */}
    }
}

export default injectIntl(Contact);
