import React from 'react';
import { Row } from 'react-bootstrap';
import { CardVideo } from './CardVideo';

export const CardVideosComponent = ({ ListVideos }) => {
  
  return (
    <Row xs={1} md={2} lg={4} className='g-4 mx-5'>
      {ListVideos.map((element) => {
        return <CardVideo key={element.id.videoId} video={element} />;
      })}
    </Row>
  );
};
