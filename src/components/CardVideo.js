import React, { useState } from 'react';
import { Card, Col, Modal } from 'react-bootstrap';

export const CardVideo = (props) => {
  
  const styleModal = { backgroundColor: 'transparent', border: 'none' };
  const [showModal, setShowModal] = useState(false);

  const title = props.video.snippet.title;
  const image = props.video.snippet.thumbnails.high.url;
  const description = props.video.snippet.channelTitle;
  const url = `https://www.youtube.com/embed/${props.video.id.videoId}`;

  return (
    <>
      <Col>
        <Card
          bg='dark'
          style={{ width: '18rem', cursor: 'pointer' }}
          onClick={() => setShowModal(true)}
        >
          <Card.Img variant='top' src={`${image}`} />
          <Card.Body>
            <Card.Title
              className='text-start'
              style={{ fontSize: '1rem', align: 'left' }}
            >
              {title}
            </Card.Title>
            <Card.Text
              className='text-start text-break'
              style={{ fontSize: '1rem' }}
            >
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Modal
        size='lg'
        centered={true}
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName='modal-150w'
        aria-labelledby='example-custom-modal-styling-title'
        style={{ styleModal }}
      >
        <Modal.Body>
          <div class='embed-responsive embed-responsive-16by9'>
            <iframe
              className='embed-responsive-item'
              style={{ height: 400, width: '100%' }}
              src={url}
              type='video/mp4'
              allowFullScreen
              title={title}
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
