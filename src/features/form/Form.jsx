import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-grid-system';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import Input from './Input';
import Button from './Button';
import styles from './Form.module.scss';

const Form = ({
  validate,
  title,
  type,
  placeholder,
  initialValueSelector,
  buttonLabel,
  onSubmit,
  navigateTo,
  canGoBack,
}) => {
  const history = useHistory();
  const initialValue = useSelector((state) => state.form[initialValueSelector]);
  const input = React.useRef(null);
  const [inputData, setInputData] = React.useState(initialValue || '');
  const isValid = validate ? validate(inputData) : true;
  const isOptional = typeof validate !== 'function';
  const onClick = React.useCallback(() => {
    if (!isValid) { return; }

    if (typeof onSubmit === 'function') {
      onSubmit(inputData);
    }

    if (typeof navigateTo === 'string') {
      history.push(navigateTo);
    }
  }, [isValid, onSubmit, inputData, navigateTo, history]);

  React.useEffect(() => {
    if (input && input.current) {
      input.current.focus();
    }
  }, [input]);

  React.useEffect(() => {
    const onKeyPress = (e) => {
      const ENTER_KEY = 'Enter';
      if (e.key === ENTER_KEY) { onClick(); }
    };

    document.addEventListener('keydown', onKeyPress);
    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onClick]);

  return (
    <section className={styles.form}>
      <div className={styles.middle}>
        <Container>
          {canGoBack && (
            <Row>
              <Col>
                <button className={styles.backBtn} type="button" onClick={() => history.goBack()}>
                  <IosArrowBack fontSize="2rem" color="#CCC" />
                  <span>&nbsp;Back</span>
                </button>
              </Col>
            </Row>
          )}

          <Row>
            <Col>
              <h2 onClick={() => input.current.focus()}>{title}</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                ref={input}
                type={type || 'text'}
                placeholder={placeholder}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </Col>
          </Row>

          <div className={`${styles.actions} ${isValid ? styles.actionsVisible : styles.actionsHidden}`}>
            <Row>
              <Col>
                <Button onClick={onClick}>
                  {buttonLabel || (isOptional && inputData.length === 0 ? 'Skip' : 'Next')}
                </Button>
              </Col>
              <Col>
                <p className={styles.hint}>
                  press&nbsp;
                  <strong>ENTER</strong>
                  &nbsp;to&nbsp;
                  {isOptional && inputData.length === 0 ? 'skip' : 'continue'}
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Form;
