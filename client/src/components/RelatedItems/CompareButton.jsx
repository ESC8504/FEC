import React, { useContext } from 'react';
import { StyledButton } from '../../styled-components/common-elements.jsx';
import RelatedContext from './RelatedContext.jsx';
import ThemeContext from '../ThemeContext.jsx';


const CompareButton = function ({ item }) {
  const { compareItem } = useContext(RelatedContext);
  const { theme } = useContext(ThemeContext);

  return <StyledButton onClick={(event) => compareItem(item, event)} $theme={theme} style={{
    'opacity': '0.6',
    'border-radius': '0',
  }}>★</StyledButton>;
};

export default CompareButton;
