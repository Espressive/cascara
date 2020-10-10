/* eslint-disable react/no-multi-comp */
import React from 'react';
import styles from '../Dashboard.module.scss';

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
    text: 'Doge A',
  },
  {
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80',
    text: 'Doge B',
  },
  {
    image:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1239&q=80',
    text: 'Doge C',
  },
  {
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1212&q=80',
    text: 'Doge D',
  },
  {
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2698&q=80',
    text: 'Doge E',
  },
  {
    image:
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
    text: 'Doge F',
  },
  {
    image:
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80',
    text: 'Doge G',
  },
  {
    image:
      'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2560&q=80',
    text: 'Doge H',
  },
];

const Widget = ({ image, text }) => (
  <div className={styles.Image}>
    <img alt={text} src={image} style={{ maxWidth: '100%' }} />
    <p>{text}</p>
  </div>
);

const DashboardPAC = ({ data }) => {
  return (
    <main styles={{ backgroundColor: '#fafafa', padding: '2em' }}>
      <div className={styles.Dashboard}>
        {data.map((widget) => (
          <Widget key={widget.name} {...widget} />
        ))}
      </div>
    </main>
  );
};

const Fixture = <DashboardPAC data={data} />;

export default Fixture;
