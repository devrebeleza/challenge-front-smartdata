import React from 'react';
import { Alert } from 'react-bootstrap';

export const AlertMessagge = ({error, setErrorMessagge}) => {
  return (
    <Alert variant='danger' onClose={() => setErrorMessagge('')} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error}</p>
    </Alert>
  );
};
