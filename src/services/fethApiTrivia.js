const getQuestion = async (token) => {
  const URL_QUESTION = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(URL_QUESTION);
  const dataJson = await data.json();
  return dataJson;
};

export { getToken, getQuestion };
