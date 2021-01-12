import React from 'react';
import pt from 'prop-types';
import { List } from 'semantic-ui-react';

const propTypes = {
  data: pt.arrayOf(
    pt.shape({
      avatar: pt.string,
      email: pt.string,
      first_name: pt.string,
      id: pt.number,
      job_title: pt.string,
      last_name: pt.string,
    })
  ).isRequired,
};

const CustomList = ({ data }) => (
  <List relaxed>
    {data.map((item) => (
      <List.Item key={item.id}>
        <List.Content>
          <List.Header as='a'>{`${item.first_name} ${item.last_name}`}</List.Header>
          <List.Description>{item.job_title}</List.Description>
        </List.Content>
      </List.Item>
    ))}
  </List>
);
CustomList.propTypes = propTypes;

export default CustomList;
