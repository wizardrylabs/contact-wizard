import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'react-grid-system';
import FetchRetry from 'fetch-retry';
import IosAlert from 'react-ionicons/lib/IosAlert';
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import MdCheckmarkCircle from 'react-ionicons/lib/MdCheckmarkCircle';
import styles from './Submit.module.scss';

const SUBMIT_ENDPOINT = process.env.REACT_APP_SUBMIT_ENDPOINT;

const Submit = () => {
  const formData = useSelector((state) => state.form);
  const isValid = formData.name && formData.email && formData.phoneNumber;
  const [isLoading, setLoading] = React.useState(true);
  const [didSend, setDidSend] = React.useState(false);

  React.useEffect(() => {
    const onSuccess = () => {
      setLoading(false);
      setDidSend(true);
    };

    const onFailure = () => {
      setLoading(false);
      setDidSend(false);
    };

    if (isValid) {
      FetchRetry(fetch)(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
        retries: 3,
        retryDelay: 2000,
        retryOn: [500, 502, 503, 504, 599],
      })
        .then(() => onSuccess())
        .catch(() => onFailure());
    }
  }, [isValid, setLoading, setDidSend, formData]);

  return isValid ? (
    <section className={styles.submit}>
      <div className={styles.middle}>
        <Container>
          <Row>
            {isLoading && (
              <Col>
                <IosRefresh fontSize="10rem" color="#000" rotate />
                <h2>Sending, please wait...</h2>
              </Col>
            )}

            {didSend && (
              <Col>
                <MdCheckmarkCircle fontSize="10rem" color="green" />
                <h2>Awesome!</h2>
                <p>Your&apos;re one step closer to starting your project.</p>
                <p>One of our representatives will reach out to you shortly.</p>
                <p>
                  Be sure to check the email address that you provided:&nbsp;
                  <span className={styles.highlight}>{formData.email}</span>
                </p>
              </Col>
            )}

            {!isLoading && !didSend && (
              <Col>
                <IosAlert fontSize="10rem" color="red" />
                <h2>Oops...</h2>
                <p>It looks like an unexpected error occurred.</p>
                <p>
                  Please contact us at&nbsp;
                  <a href="mailto:contact@wizardrylabs.io">contact@wizardrylabs.io</a>
                  .
                </p>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </section>
  ) : (
    <Redirect to="/form/name" />
  );
};

export default Submit;
