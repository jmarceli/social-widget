// @flow
import React from 'react';
import { Form, Field } from 'react-final-form';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import type { Theme } from '../../../theme';
export type FormHandler = (values: { [string]: string }) => void;
export type Props = {
  handleFormSubmit: FormHandler,
  classes: { [string]: string },
  isLoading: boolean,
};

const topPadding = 14;
const styles = (theme: Theme) => ({
  form: {
    // 10 is an arbitrary value which gives some
    // space for shrinking input label
    padding: `${topPadding + 10}px 34px 13px 27px`,
    boxSizing: 'border-box',
    [theme.media.large]: {
      padding: `42px 34px 32px 27px`,
    },
  },
  field: {
    position: 'relative',
    height: 22,
    lineHeight: '22px',
    width: '100%',
    borderBottom: '2px solid #dbe0e8',
    display: 'block',
  },
  label: {
    ...theme.font,
    color: theme.color.primaryLight,
    fontSize: 18,
    lineHeight: '22px',
    position: 'absolute',
    top: 0,
    transition: 'all 0.2s',
  },
  labelIsFocused: {
    top: -topPadding,
    fontSize: 12,
    lineHeight: `${topPadding}px`,
  },
  input: {
    ...theme.font,
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

export const CommentForm = ({
  classes,
  handleFormSubmit,
  isLoading,
}: Props) => (
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
                  {isLoading ? (
                    <ContentLoader
                      width={150}
                      height={18}
                      style={{ width: 150 }}
                    >
                      <rect x="0" y="0" rx="5" ry="5" width="150" height="18" />
                    </ContentLoader>
                  ) : (
                    'Add a comment'
                  )}
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
