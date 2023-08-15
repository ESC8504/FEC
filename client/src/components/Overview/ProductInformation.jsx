import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import StyleSelector from './StyleSelector.jsx';
import ProductInformationComponents from '../../styled-components/overviewcomponents/product-information-components.jsx';

function ProductInformation({
  currentProduct, currentProductID, styles, selectedStyle,
  setSelectedStyle, selectedStylePrice, setSelectedStylePrice,
  selectedStyleSalePrice, setSelectedStyleSalePrice,
}) {
  const [stylesArray, setStylesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIsLoading, setSelectedIsLoading] = useState(true);

  // load the stylesArray with styles
  const loadStyles = () => {
    setSelectedIsLoading(true);

    setSelectedIsLoading(false);
  };
  useEffect(loadStyles, [currentProduct, selectedStyle]);
  const currentURL = window.location.href;
  const message = `This%20${currentProduct.name}%20from%20Omega%20Mart%20is%20amazing!%20${currentURL}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${message}`;
  return (
    <div>
      <h1>{ currentProduct.name }</h1>
      {selectedStyleSalePrice ? (
        <span>
          <s>{ selectedStylePrice }</s>
          {' '}
          <span>
            <ProductInformationComponents.SaleText>
              {selectedStyleSalePrice}
            </ProductInformationComponents.SaleText>
          </span>
        </span>
      ) : (
        <span>
          { selectedStylePrice }
        </span>
      )}

      <h3>{ currentProduct.category }</h3>
      <h3>{ currentProduct.description }</h3>
      <span>share this product: </span>
      <ProductInformationComponents.SocialMediaButton href={twitterLink}>
        Tweet
      </ProductInformationComponents.SocialMediaButton>

      <ProductInformationComponents.StyleSelectorContainer>
        <StyleSelector
          stylesArray={styles.results}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          selectedStylePrice={selectedStylePrice}
          setSelectedStylePrice={setSelectedStylePrice}
          selectedStyleSalePrice={selectedStyleSalePrice}
          setSelectedStyleSalePrice={setSelectedStyleSalePrice}
        />
      </ProductInformationComponents.StyleSelectorContainer>

    </div>
  );
}

ProductInformation.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
  }),
  currentProductID: PropTypes.number,
  styles: PropTypes.shape({
    product_id: PropTypes.string,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        'style_id': PropTypes.number,
        'name': PropTypes.string,
        'original_price': PropTypes.string,
        'sale_price': PropTypes.string,
        'default?': PropTypes.bool,
      }),
    ),
    skus: PropTypes.shape(PropTypes.shape({
      'quantity': PropTypes.number,
      'size': PropTypes.string,
    })),
  }),
};

ProductInformation.defaultProps = {
  currentProduct: {
    id: '',
    name: '',
    slogan: '',
    description: '',
    category: '',
    default_price: '',
  },
  currentProductID: '',
  styles: {},
};

export default ProductInformation;
