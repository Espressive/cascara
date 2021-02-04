import React, { useState } from 'react';
import { Card, Flex, RadioGroup, Text } from '@fluentui/react-northstar';
import ChatAvatar from '../ChatAvatar';

const surveyOptions = [
  {
    label: 'Yes, my request is resolved',
    value: 'yes',
  },
  {
    label: 'No, but no need to reopen',
    value: 'no',
  },
  {
    label: 'No, please reopen this request',
    value: 'reopen',
  },
];

const TicketResolved = () => {
  const [surveyResponse, setSurveyResponse] = useState();

  return (
    <Card aria-roledescription='Ticket resolved survey'>
      <Card.Header>
        <Flex gap='gap.small' vAlign='center'>
          <ChatAvatar />
          <Flex column>
            <Text content='Did this resolve your request?' weight='bold' />
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap='gap.small'>
          <RadioGroup
            items={surveyOptions.map((option) => ({
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

export default TicketResolved;
