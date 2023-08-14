/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import QuestionsList from './QuestionsList';
// Use this mock function for testing
jest.mock('../../../utils/sortHelp.js', () => ({
  sortByHelp: jest.fn((questions) => questions.sort((a, b) => b.helpfulness - a.helpfulness)),
}));

describe('<QuestionsList />', () => {
  const testQuestions = [
    {
      question_id: 1,
      asker_name: 'Eric',
      question_date: '2023-01-01',
      question_body: 'Is this a spaceship?',
      helpfulness: 2,
      answers: {
        1: {
          id: 1,
          body: 'Yes! It is a space ship!',
          answerer_name: 'Lauren',
          date: '2023-01-02',
        },
        2: {
          id: 2,
          body: 'Yes! You can take a 80 years long loan!',
          answerer_name: 'Brandon',
          date: '2023-01-03',
        },
      },
    },
    {
      question_id: 2,
      asker_name: 'Kimberly',
      question_date: '2023-02-01',
      question_body: 'How do you feel?',
      helpfulness: 10,
      answers: {},
    },
  ];
  it('renders questions and answers', () => {
    const { getByText, queryByText, queryAllByText } = render(<QuestionsList
      questions={testQuestions}
    />);

    expect(getByText('Yes! It is a space ship!')).toBeTruthy();

    expect(queryByText('Non-existent Text')).toBeNull();

    const texts = queryAllByText('Who asked the question?');
    expect(texts).toHaveLength(2);
  });

  it('sorts questions by helpfulness in descending order', () => {
    const { getAllByTestId } = render(<QuestionsList questions={testQuestions} />);

    const qBody = getAllByTestId('question-body').map((item) => item.textContent);
    expect(qBody[0]).toBe('How do you feel?');
    expect(qBody[1]).toBe('Is this a spaceship?');
  });
});
