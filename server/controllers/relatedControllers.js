const axios = require('axios');

module.exports = {
  // gets the first product from the API host's product array
  getRelatedProductIDs(req, res) {
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
      headers: {
        Authorization: `${process.env.TOKEN}`,
      },
    };
    axios({
      method: 'get',
      url: `${options.url}products/${req.query.currentProductID}/related`,
      headers: options.headers,
      responseType: 'json',
    })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => console.log('Error', error.message));
  },

  getRelatedProductIDs(req, res) {

  },


};
