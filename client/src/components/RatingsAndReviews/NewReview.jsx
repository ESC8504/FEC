import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from '../../styled-components/common-elements.jsx';
import descriptionArr from './descriptionArr.js';

// eslint-disable-next-line object-curly-newline
function NewReview({ renderForm, currentProductID, submitForm, characteristics }) {
  const radioArray = [1, 2, 3, 4, 5];
  const [charArray, setCharArray] = React.useState([]);
  const [formData, setFormData] = React.useState({
    product_id: currentProductID,
    rating: '',
    summary: '',
    body: '',
    recommend: '',
    name: '',
    email: '',
    photos: [],
    characteristics: {
    },
  });

  React.useEffect(() => {
    setCharArray(Object.entries(characteristics));
  }, [characteristics]);

  const convertData = (obj) => {
    // eslint-disable-next-line prefer-const
    let { name, value } = obj;
    if (name === 'rating') {
      return Number(value);
    }
    if (name === 'recommend') {
      if (value === 'true') {
        return true;
      }
      return false;
    }
    return value;
  };

  const handleChange = (level) => (e) => {
    const { name, value } = e.target;
    if (name === 'photos') {
      // const photos = [value]
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, (value)] }));
    } else if (!level) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: convertData(e.target),
      }));
    } else {
      setFormData({
        ...formData,
        [level]: {
          ...formData[level],
          [name]: Number(value),
        },
      });
    }
  };

  const renderRadios = (arr, characteristicId) => (
    arr.map((number) => (
      <input
        style={{ 'width': '20%' }}
        type="radio"
        value={number}
        name={characteristicId}
        onChange={handleChange('characteristics')}
        required
        key={characteristicId + number}
      />
    )));

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
    renderForm();
  };
  // console.log(formData);
  return (
    <form onSubmit={(e) => handleSubmit(e)} data-testid="newReviewForm">
      <label htmlFor="rating">
        {'Rating: '}
        <div>
          {radioArray.map((num) => {
            if (num.toString() <= formData.rating) {
              return <SelectedStar key={num} name="rating" value={num} onMouseOver={handleChange()} type="button">★</SelectedStar>;
            }
            return <SelectedStar key={num} name="rating" value={num} onMouseOver={handleChange()} type="button">☆</SelectedStar>;
          })}
          {formData.rating && <span>{`${formData.rating} stars`}</span>}
        </div>
      </label>
      <br />

      <legend>Would you recommend this product?</legend>
      <label htmlFor="yes">
        {'Yes: '}
        <input type="radio" value="true" name="recommend" onChange={handleChange()} required />
      </label>
      <label htmlFor="no">
        {'No: '}
        <input type="radio" value="false" name="recommend" onChange={handleChange()} />
      </label>
      <div style={{ 'height': '10px' }} />
      <fieldset>
        <legend>Characteristics</legend>
        {charArray.map((characteristic) => (
          <RadioStyle key={characteristic[0]}>
            <legend style={{ 'width': '70px' }}>{characteristic[0]}</legend>
            <div style={{ 'width': '100%' }}>
              <div style={{ 'display': 'flex', 'justifyContent': 'space-between'}}>
                {descriptionArr.filter((descObj) => (descObj.attribute === characteristic[0].toLowerCase()))[0].descArr.map((feedback) => <span key={feedback} style={{ 'fontSize': '10px', 'width': '20%', 'textAlign': 'center' }}>{feedback}</span>)}
              </div>
              <div style={{ 'display': 'flex', 'justifyContent': 'space-between'}}>
                {renderRadios(radioArray, characteristic[1].id)}
              </div>
            </div>
          </RadioStyle>
        ))}
      </fieldset>
      <div style={{ 'height': '10px' }} />
      <label htmlFor="summary">
        Review Summary:
        <br />
        <input type="text" id="summary" maxLength="60" name="summary" onChange={handleChange()} required />
      </label>
      <br />
      <div style={{ 'height': '10px' }} />
      <label htmlFor="reviewBody">
        Review:
        <br />
        <textarea id="reviewBody" name="body" onChange={handleChange()} required />
      </label>
      <br />
      <div style={{ 'height': '10px' }} />
      <label htmlFor="username">
        Display Name:
        <br />
        <input type="text" id="username" name="name" onChange={handleChange()} required />
      </label>
      <div style={{ 'height': '10px' }} />
      <label htmlFor="email">
        <br />
        {'Email (we won\'t share it):'}
        <br />
        <input type="email" id="email" name="email" onChange={handleChange()} required />
      </label>
      <div style={{ 'height': '10px' }} />
      {/* <label htmlFor="photos">
        <br />
        {'Photos (up to 5): '}
        <br />
        {formData.photos.length < 5 && <input type="file" multiple id="photos" name="photos" required />}
      </label> */}
      <br />
      <StyledButton
        type="submit"
        data-testid="formSubmit"
      >
        Submit Review
      </StyledButton>
    </form>

  );
}

NewReview.propTypes = {
  renderForm: propTypes.func.isRequired,
  currentProductID: propTypes.number.isRequired,
  submitForm: propTypes.func.isRequired,
  characteristics: propTypes.shape({}),
};

NewReview.defaultProps = {
  characteristics: {},
};

const RadioStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
  padding: 0 25px;`;

const SelectedStar = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 30px;
  color: black`;

export default NewReview;
