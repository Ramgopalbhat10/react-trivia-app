export const loadQuestions = async (amount = 10, category = 9, difficulty = 'easy', type = 'multiple') => {
  const URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  try {
    const response = await fetch(URL);
    const { results } = await response.json();
    return convertQuestionsFromAPI(results);
  } catch (error) {
    console.error(error);
  }
}

const convertQuestionsFromAPI = (rawQuestions) => {
  return rawQuestions.map(loadedQuestion => {
    // desired object
    const formattedQuestion = {
      question: loadedQuestion.question,
      answerChoices: [...loadedQuestion.incorrect_answers]
    };
    // correct answer index
    formattedQuestion.answer = Math.floor(Math.random() * 4);

    // insert correct answer in answerChoices
    formattedQuestion.answerChoices.splice(formattedQuestion.answer, 0, loadedQuestion.correct_answer);

    return formattedQuestion;
  });
}