import React from 'react';

class FeedbackForm extends React.PureComponent {
  render() {
    return (
      <form>
        <p>Name</p>
        <input type="text" />
        <p>Phone number</p>
        <input type="textArea" />
        <p>E-mail</p>
        <input type="email" />
        <p></p>

        <input type="submit" />
      </form>
    );
  }
}
export default FeedbackForm;
