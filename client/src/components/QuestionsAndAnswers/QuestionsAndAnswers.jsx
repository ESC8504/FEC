import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import QuestionsList from './QuestionsList/QuestionsList.jsx';
import SearchBar from './Buttons/SearchBar.jsx';
import { QAContainer } from './styled-components/QuestionsAndAnswers.styles.jsx';

function QuestionsAndAnswers({ currentProduct, currentProductID }) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  useEffect(() => {
    axios.get('/questions', {
      params: {
        product_id: currentProductID,
        count: 100,
      },
    })
      .then((res) => {
        setQuestions(res.data.results);
        setFilteredQuestions(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentProductID]);

  const handleSearch = (query) => {
    if (query) {
      const filteredResults = questions.filter((question) => question.question_body.toLowerCase()
        .includes(query.toLowerCase()));
      setFilteredQuestions(filteredResults);
    } else {
      setFilteredQuestions(questions);
    }
  };
  const handleAddNewQuestion = (questionFormData) => {
    axios.post('/qa/questions', {
      body: questionFormData.question,
      name: questionFormData.nickname,
      email: questionFormData.email,
      product_id: currentProductID,
    })
      .then((res) => {
        console.log('New Question added:', res.data);
      })
      .catch((err) => console.log('Error adding question:', err));
  };
  return (
    <QAContainer>
      <SearchBar onSearch={handleSearch} />
      <QuestionsList
        productName={currentProduct.name}
        questions={filteredQuestions}
        onHandleAddQuestion={handleAddNewQuestion}
      />
    </QAContainer>
  );
}

QuestionsAndAnswers.propTypes = {
  currentProductID: PropTypes.number.isRequired,
  currentProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionsAndAnswers;
