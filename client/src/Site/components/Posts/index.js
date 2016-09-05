import React from 'react';
import {IntlProvider, injectIntl} from 'react-intl';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import i18n from './i18n';
import ACL from '../../../Common/components/ACL'

class index extends React.Component {
    render() {
        const {locale} = this.props.intl;
        const messages = i18n[locale];
        return <IntlProvider locale={locale} key={locale} messages={messages}>
          <div style={{ marginTop: 15 }}>
              <ACL roles={['authorized']}>
                <Link
                  className='btn btn-success'
                  style={{ margin: 10 }}
                  to='posts/create'
                  >
                  {messages['index.add']}
                  <FontAwesome name='plus' />
                </Link>
              </ACL>
              {this.props.children}
          </div>
        </IntlProvider>;
    }
};

export default injectIntl(index);
