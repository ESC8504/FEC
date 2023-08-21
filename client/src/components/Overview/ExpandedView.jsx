import React, { useState, useEffect, useContext } from 'react';
import Promise from 'bluebird';
import ExpandedThumbnail from './ExpandedThumbnail.jsx';
import ImageGalleryComponents from '../../styled-components/overviewcomponents/image-gallery-components.jsx';
import {
  StyledButton, ModalWrapper, Modal, ModalContent,
} from '../../styled-components/common-elements.jsx';
import ScrollButton from './DefaultScrollButton.jsx';

function ExpandedView({
  selectedStyle, displayModal, setDisplayModal, expandedMainImage, setExpandedMainImage,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState([]);
  const [focalItem, setFocalItem] = useState(0);

  const loadStylesPhotos = () => {
    // get the thumbnails
    function getStylePhotos() {
      let didSucceed = false;
      return new Promise((resolve, reject) => {
        if (typeof selectedStyle !== 'undefined') {
          didSucceed = true;
        }
        if (didSucceed === true) {
          resolve(selectedStyle.photos);
        } else {
          reject(new Error('Not done loading'));
        }
      });
    }

    getStylePhotos()
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (expandedMainImage === data[i].url) {
            setFocalItem(i);
          }
        }
        setThumbnails(data);
      })
      .catch(() => { });
  };

  useEffect(loadStylesPhotos, [selectedStyle, expandedMainImage]);

  const handleImageClick = (photoIndex) => {
    setExpandedMainImage(thumbnails[photoIndex].url);
  };

  const scrollLeft = () => {
    setFocalItem(focalItem - 1);
    setExpandedMainImage(thumbnails[focalItem - 1].url);
  };
  const scrollRight = () => {
    setFocalItem(focalItem + 1);
    setExpandedMainImage(thumbnails[focalItem + 1].url);
  };

  return (
    <div>
      <ImageGalleryComponents.ModalWrapper $displaymodal={displayModal}>
        <ImageGalleryComponents.Modal $displaymodal={displayModal}>
          <ImageGalleryComponents.ExpandedNormal>
            <ImageGalleryComponents.Icons>

              {thumbnails ? thumbnails.map((photoObj, index) => (
                <ExpandedThumbnail
                  photoObj={photoObj}
                  focalItem={focalItem}
                  setFocalItem={setFocalItem}
                  selectedStyleArray={thumbnails}
                  selectedStyle={selectedStyle}
                  key={index}
                  index={index}
                  displayModal={displayModal}
                  expandedMainImage={expandedMainImage}
                  setExpandedMainImage={setExpandedMainImage}
                  handleImageClick={handleImageClick}
                />
              )) : null}

            </ImageGalleryComponents.Icons>
            <ImageGalleryComponents.ExpandedImageContainer>
              { focalItem > 0 ? <ScrollButton scroll={scrollLeft} dir="left" /> : null }
              <ImageGalleryComponents.ExpandedMainPhoto
                src={expandedMainImage}
                alt={selectedStyle?.name}
              />
              { focalItem < thumbnails.length - 1 && <ScrollButton scroll={scrollRight} dir="right" />}
            </ImageGalleryComponents.ExpandedImageContainer>
            <ImageGalleryComponents.ExitExpanded>
              <StyledButton
                type="button"
                onClick={() => setDisplayModal(false)}
              >
                Close
              </StyledButton>

            </ImageGalleryComponents.ExitExpanded>
          </ImageGalleryComponents.ExpandedNormal>
        </ImageGalleryComponents.Modal>
      </ImageGalleryComponents.ModalWrapper>
    </div>

  );
}

export default ExpandedView;