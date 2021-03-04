import React, { useState } from 'react';
import pt from 'prop-types';

import { Card, Flex, RadioGroup, Text } from '@fluentui/react-northstar';
import ChatAvatar from '../ChatAvatar';

const SURVEY_OPTIONS = [
  {
    key: 'yes',
    label: 'Yes, my request is resolved',
    value: 'yes',
  },
  {
    key: 'no',
    label: 'No, but no need to reopen',
    value: 'no',
  },
  {
    key: 'reopen',
    label: 'No, please reopen this request',
    value: 'reopen',
  },
];

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types -- We do not know what the object params might be in this case
  value: pt.object,
};

const TicketResolved = () => {
  const [surveyResponse, setSurveyResponse] = useState();

  return (
    <Card aria-roledescription='Ticket resolved survey'>
      <Card.Header>
        <Flex gap='gap.small' vAlign='center'>
          <ChatAvatar
            imageUrl='https://www.espressive.com/wp-content/uploads/2018/07/barista-notalk-bubble.png'
            square
          />
          <Flex column>
            <Text content='Did this resolve your request?' weight='bold' />
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap='gap.small'>
          <RadioGroup
            items={SURVEY_OPTIONS.map((option) => ({
              ...option,
              disabled: Boolean(surveyResponse),
              onClick: (e, props) => setSurveyResponse(props.value),
            }))}
            value={surveyResponse}
            vertical
          />
          {/* <Button content='Yes, my request is resolved' />
        <Button content='No, but no need to reopen' />
        <Button content='No, please reopen this request' /> */}
        </Flex>
      </Card.Body>
    </Card>
  );
};

TicketResolved.displayName = 'Widget.TicketResolved';
TicketResolved.propTypes = propTypes;

export default TicketResolved;
