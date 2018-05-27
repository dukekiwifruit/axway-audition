import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import {
  loadSurveys, unloadSurveys
} from '../actions/surveys';

import { pageLoaded } from './utils';

class Surveys extends Component {
  componentDidMount() {
    pageLoaded('Surveys');
    this.props.dispatch(loadSurveys());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadSurveys());
  }

  render() {
    const { error, surveys } = this.props;
    const { intl } = this.context;

    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (surveys.length === 0) {
      listNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      const surveysNode = (surveys || []).map(survey => (
        <ListItem
          key={`survey_${survey.id}`}
          justify='between'
        >
          <Label><Anchor path={`/surveys/${survey.id}`} label={survey.name} /></Label>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            <Value
              value={survey.percentComplete}
              units='%'
              align='start'
              size='small'
            />
            <Meter value={survey.percentComplete} />
          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {surveysNode}
        </List>
      );
    }

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl name={getMessage(intl, 'Surveys')} />
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <Paragraph size='large'>
            The backend here is using websocket.
          </Paragraph>
        </Box>
        {listNode}
      </Article>
    );
  }
}

Surveys.defaultProps = {
  error: undefined,
  surveys: []
};

Surveys.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  surveys: PropTypes.arrayOf(PropTypes.object)
};

Surveys.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.surveys });

export default connect(select)(Surveys);
