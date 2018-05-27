import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { processStatus } from 'grommet/utils/Rest';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import SaveIcon from 'grommet/components/icons/base/Save';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import { getMessage } from 'grommet/utils/Intl';
import NavControl from '../components/NavControl';
import { pageLoaded } from './utils';
import { headers } from '../api/utils';

class Create extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      error: '',
      notification: ''
    };
  }

  componentDidMount() {
    pageLoaded('Create');
  }

  onSubmit() {
    const payload = this.state;
    const me = this;
    payload.email = this.props.session.email;
    const options = {
      headers: headers(),
      method: 'POST',
      body: JSON.stringify(payload)
    };

    fetch('/api/survey', options)
      .then(processStatus)
      .then(() => {
        me.setState({
          title: '',
          description: '',
          error: '',
          notification: `Your survey, '${me.state.title}', was created successfully.`
        });
      })
      .catch(error => this.setState({ error }));
  }

  onTextChange(key, value) {
    const newState = this.state;
    newState[key] = value;
    this.setState(newState);
  }

  render() {
    const { intl } = this.context;
    const state = this.state;

    let notificationNode;

    if (state.error) {
      notificationNode = (
        <Notification
          status='critical'
          size='large'
          state={state.error.message}
          message='An unexpected error happened, please try again later.'
        />
      );
    } else if (state.notification) {
      notificationNode = (
        <Notification
          status='ok'
          size='large'
          state={state.notification}
          message='Success!'
        />
      );
    }

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }} >
          <NavControl />
        </Header>
        {notificationNode}
        <Box pad='medium'>
          <Heading tag='h3' strong={true}>
            {getMessage(intl, 'Create Survey')}
          </Heading>
          <Paragraph size='large'>
            {getMessage(intl, 'You can create a new survey here.')}
          </Paragraph>
        </Box>
        <Box pad='medium'>
          <Box pad={{ vertical: 'small', horizontal: 'none' }}>
            <Label labelFor='title'>{getMessage(intl, 'Survey Title')}</Label>
            <FormField label={getMessage(intl, 'This is the yes or no question your survey is asking. Maximum 60 Characters.')}>
              <TextInput id='title' name='title' onDOMChange={e => this.onTextChange('title', e.target.value)} />
            </FormField>
          </Box>
          <Box pad={{ vertical: 'small', horizontal: 'none' }}>
            <Label labelFor='description'>{getMessage(intl, 'Survey Description')}</Label>
            <FormField label={getMessage(intl, 'Tell us a little bit more about the question. Maximum 200 Characters.')}>
              <TextInput id='description' name='description' onDOMChange={e => this.onTextChange('description', e.target.value)} />
            </FormField>
          </Box>
          <Box pad={{ vertical: 'small', horizontal: 'none' }}>
            <Button
              primary={true}
              icon={<SaveIcon />}
              onClick={() => this.onSubmit()}
              label={getMessage(intl, 'Save')}
              href='#' />
          </Box>
        </Box>
      </Article>
    );
  }
}

Create.defaultProps = {
  error: undefined
};

Create.propTypes = {
  error: PropTypes.object,
  session: PropTypes.object.isRequired
};

Create.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({
  session: state.session
});

export default connect(select)(Create);
