
export const rawMarkup = (data) => {
  return { __html: { data } }
};

//////////////////////////////////////////////////////////////
// The following function is called when the questions are  //
// multiple choice and the student is not able to revise    //
// their selection. Not currently used                      //
//////////////////////////////////////////////////////////////

export const checkAnswer = (index, correctAnswer, selectionType, {
  userInput,
  userAttempt,
  currentQuestionIndex,
  continueTillCorrect,
  showNextQuestionButton,
  incorrect,
  correct,
  setButtons,
  setCorrectAnswer,
  setIncorrectAnswer,
  setCorrect,
  setIncorrect,
  setShowNextQuestionButton,
  setUserInput,
  setUserAttempt,
  refFeedback
}) => {

  const indexStr = `${index}`;
  const disabledAll = {
    0: { disabled: true },
    1: { disabled: true },
    2: { disabled: true },
    3: { disabled: true },
  };
  const userInputCopy = [...userInput];
  if (selectionType === 'single') {
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = index;
    }

    if (indexStr === correctAnswer) {
      if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }

      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
        },
      }));

      setCorrectAnswer(true);
      setIncorrectAnswer(false);
      setCorrect(correct);
      setShowNextQuestionButton(true);
    } else {
      if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (continueTillCorrect) {
        setButtons((prevState) => (
          {

            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
            },
          }
        ));
      } else {
        setButtons((prevState) => (
          {

            ...prevState,
            ...disabledAll,
            [index - 1]: {
              className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
            },
          }
        ));

        setShowNextQuestionButton(true);
      }

      setIncorrectAnswer(true);
      setCorrectAnswer(false);
      setIncorrect(incorrect);
    }
  } else {
    const maxNumberOfMultipleSelection = correctAnswer.length;

    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = [];
    }

    if (userInputCopy[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
      userInputCopy[currentQuestionIndex].push(index);

      if (correctAnswer.includes(index)) {
        if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
          setButtons((prevState) => ({
            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
              className: (correctAnswer.includes(index)) ? 'correct' : 'incorrect',
            },
          }));
        }
      } else if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons((prevState) => ({
          ...prevState,
          [index - 1]: {
            className: (correctAnswer.includes(index)) ? 'correct' : 'incorrect',
          },
        }));
      }
    }

    if (maxNumberOfMultipleSelection === userAttempt) {
      let cnt = 0;
      for (let i = 0; i < correctAnswer.length; i += 1) {
        if (userInputCopy[currentQuestionIndex].includes(correctAnswer[i])) {
          cnt += 1;
        }
      }

      if (cnt === maxNumberOfMultipleSelection) {
        correct.push(currentQuestionIndex);

        setCorrectAnswer(true);
        setIncorrectAnswer(false);
        setCorrect(correct);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      } else {
        incorrect.push(currentQuestionIndex);

        setIncorrectAnswer(true);
        setCorrectAnswer(false);
        setIncorrect(incorrect);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      }
    } else if (!showNextQuestionButton) {
      setUserAttempt(userAttempt + 1);
    }
  }
  console.log("in checkAnswer")
  setUserInput(userInputCopy);
};

//////////////////////////////////////////////////////////////
// The following function is called when the questions are  //
// multiple choice and the student can revise their         //
// selection until they select the correct answer. The      //
// answers may require just a single or multiple statements // 
// to be selected, with the student receiving feedback on   //
// incorrect choices or combinations of choices.            //
// index is the answer just clicked on.                     //
// correctAnswer is the number (for single selection) or    // 
// array (for multiple selection) that is the right answer. //
// selectionType is single or multiple.                     //
//////////////////////////////////////////////////////////////

export const selectAnswer = (index, correctAnswer, selectionType, {

  userInput,
  currentQuestionIndex,
  setButtons,
  setShowNextQuestionButton,
  incorrect,
  correct,
  setCorrect,
  setIncorrect,
  setUserInput,
  setCorrectAnswer,
  setIncorrectAnswer,
  refFeedback

}) => {

  const selectedButtons = {
    0: { selected: false },
    1: { selected: false },
    2: { selected: false },
    3: { selected: false },
    4: { selected: false },
  };
  let userInputCopy = [...userInput];

  // convert the comma delimited string, e.g. "2,3" to the expected array [2,3]

  correctAnswer = correctAnswer.split(',').map(Number);

  /////////////////////////////////////////////////////////////
  // Following section is for questions with a single answer //
  /////////////////////////////////////////////////////////////

  if (selectionType === 'single') {
    correctAnswer = Number(correctAnswer);

    userInputCopy[currentQuestionIndex] = index;

    if (index === correctAnswer) {
      setIncorrectAnswer(false)  // These lines added to enable 
      setCorrectAnswer(true)     // show instant results

      if (correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }
      if (incorrect.indexOf(currentQuestionIndex) >= 0) {
        incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
      }
    } else {
      setIncorrectAnswer(true);  // These lines added to enable  
      setCorrectAnswer(false);   // show instant results

      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }
      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }
    setCorrect(correct);
    setIncorrect(incorrect);

    // change classname to indicate the clicked answer
    setButtons((prevState) => ({
      ...prevState,
      ...selectedButtons,
      [index - 1]: {
        className: 'selected',
      },
    }));

    setShowNextQuestionButton(true);

    //////////////////////////////////////////////////////////////
    // Following section is for questions with multiple answers //
    //////////////////////////////////////////////////////////////

  } else {  // selection type is 'multiple'

    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = [];
    }

    if (userInputCopy[currentQuestionIndex].includes(index)) {     // index=2 or index=3, [2,3], [2] and [3] evaluate to true

      // if the student's selection of answers includes the index, remove it, so it is not in there twice
      let currArr = [...userInputCopy[currentQuestionIndex]];
      userInputCopy[currentQuestionIndex].splice(currArr.indexOf(index), 1);

    } else {
      // if the student's selection of answers does not include the index, add it
      userInputCopy[currentQuestionIndex].push(index);
    }
    // if the length of userInputCopy is the same length as the right answer... (we have a candidate for the right answer)
    if (userInputCopy[currentQuestionIndex].length === correctAnswer.length) {

      let exactMatch = true;

      // for each of the answer indexes in UserInputCopy...
      for (const input of userInputCopy[currentQuestionIndex]) {
        // check to see if that index is part of the answer 
        if (!correctAnswer.includes(input)) {

          // if not, it is not a match...
          exactMatch = false;

          // so add the question number to the incorrect answers...
          if (incorrect.indexOf(currentQuestionIndex) < 0) {
            incorrect.push(currentQuestionIndex);
          }

          // and remove the question number from the correct answers if it is there
          if (correct.indexOf(currentQuestionIndex) >= 0) {
            correct.splice(correct.indexOf(currentQuestionIndex), 1);
          }
          break;
        }
      }
      // if the numbers in UserInputCopy match those in the correct answer...
      if (exactMatch) {
        // we have a correct answer
        if (correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }
        if (incorrect.indexOf(currentQuestionIndex) >= 0) {
          incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
        }

        setIncorrectAnswer(false) // These lines added to enable  
        setCorrectAnswer(true)    // show instant results
      }
    } else {

      // we have an incorrect answer
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }
      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }

      setIncorrectAnswer(true) // These lines added to enable
      setCorrectAnswer(false)  // show instant results
    }
    setCorrect(correct);
    setIncorrect(incorrect);

    // change classname to select or deselect the answers when they are clicked
    setButtons((prevState) => ({
      ...prevState,
      [index - 1]: {
        className: userInputCopy[currentQuestionIndex].includes(index) ? 'selected' : undefined,
      },
    }));

    // show the next button
    if (userInputCopy[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true);
    }
  }

  // save the choices to state
  setUserInput(userInputCopy);
  // scroll the content to reveal the feedback on the current choice(s)
  refFeedback.current.scrollIntoView({ behavior: 'smooth' });

};
