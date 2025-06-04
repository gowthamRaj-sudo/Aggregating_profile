const axios = require('axios');

exports.fetchUserFromJsonPlaceholder = async (username) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('Error fetching ', error.message);
    return null;
  }
};

exports.fetchUserFromGitHub = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ', error.message);
    return null;
  }
};
