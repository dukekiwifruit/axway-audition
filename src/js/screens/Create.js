import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
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

class Dashboard extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    pageLoaded('Create');
  }

  onSubmit() {
    console.log('nanananan')
  }

  render() {
    const { error } = this.props;
    const { intl } = this.context;

    let errorNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
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
        {errorNode}
        <Box pad='medium'>
          <Heading tag='h3' strong={true}>
            {getMessage(intl, 'Create Survey')}
          </Heading>
          <Paragraph size='large'>
            {getMessage(intl, 'You can create a new survey here.')}
          </Paragraph>
        </Box>
        <Box pad='medium'>
          <Form>
            <Box pad={{ vertical: 'small', horizontal: 'none' }}>
              <Label labelFor='title'>{getMessage(intl, 'Survey Title')}</Label>
              <FormField label={getMessage(intl, 'Maximum 60 Characters')}>
                <TextInput id='title' name='title' />
              </FormField>
            </Box>
            <Box pad={{ vertical: 'small', horizontal: 'none' }}>
              <Label labelFor='description'>{getMessage(intl, 'Survey Description')}</Label>
              <FormField label={getMessage(intl, 'Maximum 200 Characters')}>
                <TextInput id='description' name='description' />
              </FormField>
            </Box>
            <Box pad={{ vertical: 'small', horizontal: 'none' }}>
              <Button
                primary={true}
                icon={<SaveIcon />}
                onClick={this.onSubmit}
                label={getMessage(intl, 'Save')}
                href='#' />
            </Box>
          </Form>
        </Box>
      </Article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined
};

Dashboard.propTypes = {
  error: PropTypes.object
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);