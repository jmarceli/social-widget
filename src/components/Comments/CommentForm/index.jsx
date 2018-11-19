// @flow
import React from 'react';
import { Form, Field } from 'react-final-form';
import injectSheet from 'react-jss';
import classNames from 'classnames';

import type { Theme } from '../../../theme';
export type FormHandler = (values: { [string]: string }) => void;
export type Props = {
  handleFormSubmit: FormHandler,
  classes: { [string]: string },
};

const styles = (theme: Theme) => ({
  form: {
    padding: '13.5px 34px 20px 27px',
    boxSizing: 'border-box',
    marginTop: 13,
  },
  field: {
    position: 'relative',
    height: 27,
    lineHeight: '27px',
    width: '100%',
    borderBottom: '2px solid #dbe0e8',
    display: 'block',
  },
  label: {
    color: theme.color.primaryLight,
    fontSize: 18,
    lineHeight: '22px',
    position: 'absolute',
    top: 27 - 21,
    transition: 'all 0.2s',
  },
  labelIsFocused: {
    top: -10,
    fontSize: 12,
    lineHeight: '16px',
  },
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    verticalAlign: 'bottom',
    fontSize: 14,
    lineHeight: '21px',
    color: '#444',
  },
  // helpText: {
  //   fontSize: 10,
  //   color: theme.color.primary,
  //   textAlign: 'right',
  //   marginTop: 2,
  //   height: 13,
  //   lineHeight: '13px',
  // },
  // btnSubmit: {
  //   border: 'none',
  //   background: 'none',
  //   padding: 0,
  //   margin: 0,
  //   color: 'inherit',
  //   fontSize: 10,
  //   outline: 'none',
  //   fontFamily: '"Montserrat", "sans-serif"',
  // },
});

export const CommentForm = ({ classes, handleFormSubmit }: Props) => (
  <Form
    onSubmit={handleFormSubmit}
    initialValues={{ comment: '' }}
    render={({ handleSubmit, submitting, form }: any) => {
      // wrap handleSubmit() function to ensure form reset after submitting
      const submit = values => {
        const result = handleSubmit(values);
        form.reset();
        return result;
      };
      return (
        <form onSubmit={submit} className={classes.form}>
          <Field disabled={submitting} name="comment">
            {({ input, meta, ...rest }) => (
              <label className={classes.field}>
                <input
                  className={classes.input}
                  type="text"
                  {...input}
                  {...rest}
                />
                <div
                  className={classNames(
                    classes.label,
                    (input.value || meta.active) && classes.labelIsFocused,
                  )}
                >
                  Add a comment
                </div>
              </label>
            )}
          </Field>
          {/*<div className={classes.helpText}>
            {!values.comment && (
              <React.Fragment>
                Press ENTER to{' '}
                <button className={classes.btnSubmit} type="submit">
                  submit
                </button>
              </React.Fragment>
            )}
          </div>*/}
        </form>
      );
    }}
  />
);

export default injectSheet(styles)(CommentForm);
