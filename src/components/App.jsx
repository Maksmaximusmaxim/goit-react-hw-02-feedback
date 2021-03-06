import React from 'react';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/statistics/Statistics';
import { FeedbackOptions } from 'components/feedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onClick = event => {
    const curText = event.currentTarget.textContent.toLowerCase();
    this.setState(prevState => {
      return {
        [curText]: prevState[curText] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    return this.state.bad + this.state.neutral + this.state.good;
  };
  countPositiveFeedbackPercentage = () => {
    return String(
      (100 / (this.state.bad + this.state.neutral + this.state.good)) *
        this.state.good +
        0
    ).split('.')[0];
  };

  render() {
    const options = Object.keys(this.state)
    console.log(options)
    return (
      <>
     
        <Section title="Оставьте отзыв">
          <FeedbackOptions options={options} onLeaveFeedback={this.onClick} />
        </Section>

        <Section title="Cтатистика">
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </>
    );
  }
}
