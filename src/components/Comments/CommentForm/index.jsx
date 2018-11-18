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
  },
  labelShrink: {
    display: 'none',
  },
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    verticalAlign: 'bottom',
    fontSize: 14,
    lineHeight: '21px',
  },
  btnSubmit: {
    ...theme.button.base,
    backgroundColor: theme.color.secondary,
    color: theme.color.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    height: 46,
    borderRadius: 100,
    margin: '15px auto 0',
    fontSize: 14,
    letterSpacing: '4.2px',
    lineHeight: '18px',
    fontWeight: 600,
    [theme.media.large]: {
      width: 134,
      alignSelf: 'flex-end',
      margin: '0 0 0 15px',
    },
  },
});

export const CommentForm = ({ classes, handleFormSubmit }: Props) => (
  <Form
    onSubmit={handleFormSubmit}
    initialValues={{ comment: '' }}
    render={({ handleSubmit, form, submitting, values }: any) => (
      <form onSubmit={handleSubmit} className={classes.form}>
        <label className={classes.field}>
          <div
            className={classNames(
              classes.label,
              values.comment && classes.labelShrink,
            )}
          >
            Add a comment
          </div>
          <Field
            disabled={submitting}
            name="comment"
            component="input"
            type="text"
            className={classes.input}
          />
        </label>
        {values.comment && (
          <button
            type="submit"
            disabled={submitting}
            className={classes.btnSubmit}
          >
            Submit
          </button>
        )}
      </form>
    )}
  />
);

export default injectSheet(styles)(CommentForm);
