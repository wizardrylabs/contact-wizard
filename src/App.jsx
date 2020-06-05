import React from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from './constants/regex';
import Header from './features/header/Header';
import Footer from './features/footer/Footer';
import Form from './features/form/Form';
import Submit from './features/form/Submit';
import {
  setName, setEmail, setPhoneNumber, setCompanyName, setProjectDescription,
} from './features/form/formSlice';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <div className={styles.view}>
            <Route exact path="/form/name">
              <Form
                title="Hi. What&apos;s your name?"
                placeholder="Type your full name here..."
                initialValueSelector="name"
                validate={(_) => _.length > 2}
                onSubmit={(_) => dispatch(setName(_))}
                navigateTo="/form/email"
              />
            </Route>

            <Route exact path="/form/email">
              <Form
                canGoBack
                title="What&apos;s your email address?"
                placeholder="your@email.com"
                initialValueSelector="email"
                validate={(_) => EMAIL_REGEX.test(_)}
                onSubmit={(_) => dispatch(setEmail(_))}
                navigateTo="/form/phone-number"
              />
            </Route>

            <Route exact path="/form/phone-number">
              <Form
                canGoBack
                title="What&apos;s your phone number?"
                placeholder="Type your phone number here..."
                initialValueSelector="phoneNumber"
                validate={(_) => PHONE_NUMBER_REGEX.test(_)}
                onSubmit={(_) => dispatch(setPhoneNumber(_))}
                navigateTo="/form/company-name"
              />
            </Route>

            <Route exact path="/form/company-name">
              <Form
                canGoBack
                title="What&apos;s your company&apos;s name?"
                placeholder="Type your company name here..."
                initialValueSelector="companyName"
                onSubmit={(_) => _.length > 0 && dispatch(setCompanyName(_))}
                navigateTo="/form/project-description"
              />
            </Route>

            <Route exact path="/form/project-description">
              <Form
                canGoBack
                title="Anything we should know about your project before contacting you?"
                placeholder="Type your project summary here..."
                initialValueSelector="projectDescription"
                buttonLabel="Submit"
                onSubmit={(_) => _.length > 0 && dispatch(setProjectDescription(_))}
                navigateTo="/form/submit"
              />
            </Route>

            <Route exact path="/form/submit">
              <Submit />
            </Route>

            <Route>
              <Redirect to="/form/name" />
            </Route>
          </div>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
