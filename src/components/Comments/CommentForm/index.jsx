// @flow
import React from 'react';
import { Form, Field } from 'react-final-form';

export type FormHandler = (values: { [string]: string }) => void;
export type Props = {
  handleFormSubmit: FormHandler,
};

const CommentForm = ({ handleFormSubmit }: Props) => (
  <Form
    onSubmit={handleFormSubmit}
    initialValues={{ comment: '' }}
    render={({ handleSubmit, form, submitting, values }: any) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <div>Add a comment</div>
            <Field
              disabled={submitting}
              name="comment"
              component="input"
              type="text"
            />
          </label>
        </div>
        {values.comment !== '' && (
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        )}
      </form>
    )}
  />
);

export default CommentForm;
