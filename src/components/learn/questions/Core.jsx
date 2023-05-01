
import React, { useState, useEffect, useCallback, useRef, useContext, Fragment } from 'react';
import QuizResultFilter from './core-components/QuizResultFilter';
import { checkAnswer, selectAnswer, rawMarkup } from './core-components/helpers';
import InstantFeedback from './core-components/InstantFeedback';
import Explanation from './core-components/Explanation';

import { AppContext } from "../../../context/AppContext";

const Core = function ({

  questions,
  appLocale,
  showDefaultResult,
  onComplete,
  customResultPage,
  showInstantFeedback,
  continueTillCorrect,
  revealAnswerOnSubmit,
  allowNavigation,
  onQuestionSubmit,
  showCorrectAnswer

}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttons, setButtons] = useState({});
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [filteredValue, setFilteredValue] = useState('all');
  const [userAttempt, setUserAttempt] = useState(1);
  const [showDefaultResultState, setShowDefaultResult] = useState(true);
  const [answerSelectionType, setAnswerSelectionType] = useState(undefined);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctPoints, setCorrectPoints] = useState(0);
  const [question, setQuestion] = useState(null);
  const [questionSummary, setQuestionSummary] = useState(undefined);

  const context = useContext(AppContext);

  const refFeedback = useRef();

  useEffect(() => {
    setShowDefaultResult(showDefaultResult !== undefined ? showDefaultResult : true);
  }, [showDefaultResult]);

  useEffect(() => {
    if (questions) {
      setQuestion(questions[currentQuestionIndex]);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (questions) {
      setQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (question) {
      const { selectionType } = question;
      setAnswerSelectionType(selectionType || 'single'); // default to single selection type
    }
  }, [question, currentQuestionIndex]);

  useEffect(() => {
    if (endQuiz) {
      let totalPointsTemp = 0;
      let correctPointsTemp = 0;

      for (let i = 0; i < questions.length; i += 1) {
        let points = questions[i].points || 0;
        if (typeof points === 'string' || points instanceof String) {
          points = parseInt(points);
        }

        totalPointsTemp += points;

        if (correct.includes(i)) {
          correctPointsTemp += points;
        }
      }
      setTotalPoints(totalPointsTemp);
      setCorrectPoints(correctPointsTemp);
    }
  }, [endQuiz, correct, questions]);

  useEffect(() => {
    if (questions) {
      setQuestionSummary({
        numberOfQuestions: questions.length,
        numberOfCorrectAnswers: correct.length,
        numberOfIncorrectAnswers: incorrect.length,
        questions,
        userInput,
        totalPoints,
        correctPoints,
      });
    }
  }, [totalPoints, correctPoints, questions]);     // [totalPoints, correctPoints, correct.length, incorrect.length, questions, userInput]);

  useEffect(() => {
    if (endQuiz && onComplete !== undefined && questionSummary !== undefined) {
      onComplete(questionSummary);
    }
  }, [endQuiz, questionSummary, onComplete]);      // [endQuiz, questionSummary]);


  ///////////////////////////////////////////////////////////////
  // Show the next question (or end test)                      // 
  //                                                           //
  ///////////////////////////////////////////////////////////////

  const nextQuestion = (currentQuestionIdx) => {
    setIncorrectAnswer(false);
    setCorrectAnswer(false);
    setShowNextQuestionButton(false);
    setButtons({});

    if (currentQuestionIdx + 1 === questions.length) {
      if (userInput.length !== questions.length) {
        alert('Quiz is incomplete');
      } else if (allowNavigation) {
        let submitQuiz = true;
        if (submitQuiz) {
          setEndQuiz(true);
        }
      } else {
        setEndQuiz(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIdx + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleChange = (event) => {
    setFilteredValue(event.target.value);
  };


  ///////////////////////////////////////////////////////////////
  // Render answers on results page                            // 
  //                                                           //
  ///////////////////////////////////////////////////////////////

  const renderAnswerInResult = (question, userInputIndex) => {

    const { answers, correctAnswer, questionType } = question;

    let { selectionType } = question;
    let answerBtnCorrectClassName;
    let answerBtnIncorrectClassName;

    selectionType = selectionType || 'single'; // default to single selection type

    return answers.map((answer, index) => {
      if (selectionType === 'single') {
        // correctAnswer - is string
        answerBtnCorrectClassName = (`${index + 1}` === correctAnswer ? 'correct' : '');
        answerBtnIncorrectClassName = (`${userInputIndex}` !== correctAnswer && `${index + 1}` === `${userInputIndex}` ? 'incorrect' : '');
      } else {
        // correctAnswer - is array of numbers
        answerBtnCorrectClassName = (correctAnswer.includes(index + 1) ? 'correct' : '');
        answerBtnIncorrectClassName = (!correctAnswer.includes(index + 1) && userInputIndex.includes(index + 1) ? 'incorrect' : '');
      }

      return (
        <div key={index}>
          <button
            disabled
            className={`answerBtn btn ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
          >
            {questionType === 'text' && <span>{answer}</span>}
            {questionType === 'photo' && <img src={answer} alt="" />}
          </button>
        </div>
      );
    });
  };


  ///////////////////////////////////////////////////////////////
  // Render tags for selection type, difficulty, etc.          // 
  // Currently not used                                        //
  ///////////////////////////////////////////////////////////////

  const renderTags = (selectionType, numberOfSelection, segment) => {
    const {
      singleSelectionTagText,
      multipleSelectionTagText,
      pickNumberOfSelection,
    } = appLocale;

    return (
      <div className="tag_container">
        {selectionType === 'single'
          && <span className="single selection_tag">{singleSelectionTagText}</span>}
        {selectionType === 'multiple'
          && <span className="multiple selection_tag">{multipleSelectionTagText}</span>}
        <span className="number_of_selection">
          {pickNumberOfSelection.replace('<numberOfSelection>', numberOfSelection)}
        </span>
        {segment && <span className="selection_tag segment">{segment}</span>}
      </div>
    );
  };


  ///////////////////////////////////////////////////////////////
  // Render questions on the results page                      // 
  //                                                           //
  ///////////////////////////////////////////////////////////////

  const renderQuizResultQuestions = useCallback(() => {
    let filteredQuestions;
    let filteredUserInput;

    if (filteredValue !== 'all') {
      if (filteredValue === 'correct') {
        filteredQuestions = questions.filter((question, index) => correct.indexOf(index) !== -1);
        filteredUserInput = userInput.filter((input, index) => correct.indexOf(index) !== -1);
      } else {
        filteredQuestions = questions.filter((question, index) => incorrect.indexOf(index) !== -1);
        filteredUserInput = userInput.filter((input, index) => incorrect.indexOf(index) !== -1);
      }
    }

    return (filteredQuestions || questions).map((question, index) => {
      const userInputIndex = filteredUserInput ? filteredUserInput[index] : userInput[index];

      const selectionType = question.selectionType || 'single';  // default to single selection type

      return (
        <div className="result_answer_wrapper" key={index + 1}>
          <p dangerouslySetInnerHTML={rawMarkup(`Q${question.questionIndex}: ${question.question}`)} />
          {question.questionPic && <img src={question.questionPic} alt="" />}
          {renderTags(selectionType, question.correctAnswer.length, question.segment)}
          <div className="result_answer">
            {renderAnswerInResult(question, userInputIndex)}
          </div>
          <Explanation question={question} isResultPage />
        </div>
      );
    });
  }, [filteredValue, correct, incorrect, questions, userInput]); // [endQuiz]);


  ///////////////////////////////////////////////////////////////
  // Render the question answers                               // 
  //                                                           //
  ///////////////////////////////////////////////////////////////

  const renderAnswers = (question, buttons) => {
    const {
      correct_answer, question_type, questionIndex,
    } = question;
    //    let { selectionType } = question;
    let { selection_type } = question;

    // NEXT LINES BECAUSE I RENAMED correct_answer ETC. RENAME VARIABLES

    let correctAnswer = correct_answer;
    let questionType = question_type;
    let selectionType = selection_type;

    let answers = [];

    question.answer1_fy && answers.push(context.lang === "fy" ? question.answer1_fy : question.answer1_nl);
    question.answer2_fy && answers.push(context.lang === "fy" ? question.answer2_fy : question.answer2_nl);
    question.answer3_fy && answers.push(context.lang === "fy" ? question.answer3_fy : question.answer3_nl);
    question.answer4_fy && answers.push(context.lang === "fy" ? question.answer4_fy : question.answer4_nl);
    question.answer5_fy && answers.push(context.lang === "fy" ? question.answer5_fy : question.answer5_nl);


    //console.log("question in renderAnswers is " + JSON.stringify(question));
    //console.log("correctAnswer in renderAnswers is " + JSON.stringify(correctAnswer));
    //console.log("questionType in renderAnswers is " + JSON.stringify(questionType));
    //console.log("selectionType in renderAnswers is " + JSON.stringify(selectionType));
    //console.log("questionIndex in renderAnswers is " + JSON.stringify(questionIndex));

    //console.log("answers are " + JSON.stringify(answers));

    const onClickAnswer = (index) => checkAnswer(index + 1, correctAnswer, selectionType, {
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
    });

    const onSelectAnswer = (index) => selectAnswer(index + 1, correctAnswer, selectionType, {
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
      refFeedback,
      buttons
    });

    const checkSelectedAnswer = (index) => {
      if (userInput[questionIndex - 1] === undefined) {
        return false;
      }
      if (selectionType === 'single') {
        return userInput[questionIndex - 1] === index;
      }
      return Array.isArray(userInput[questionIndex - 1]) && userInput[questionIndex - 1].includes(index);
    };


    selectionType = selectionType || 'single';  // default to single selection type

    return answers.map((answer, index) => (
      < Fragment key={index}>
        {(buttons[index] !== undefined)
          ? (
            <button
              type="button"
              disabled={buttons[index].disabled || false}
              className={`${buttons[index].className} ${showCorrectAnswer && `${index + 1}` === correctAnswer ? "correct" : ""} answerBtn btn`}
              onClick={() => (revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index))}
            >
              {questionType === 'text' && <span>{answer}</span>}
              {questionType === 'photo' && <img src={answer} alt="" />}
            </button>
          )
          : (
            <button
              type="button"
              onClick={() => (revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index))}
              className={`answerBtn btn ${(allowNavigation && checkSelectedAnswer(index + 1)) ? 'selected' : null}`}
            >
              {questionType === 'text' && answer}
              {questionType === 'photo' && <img src={answer} alt="" />}
            </button>
          )}
      </Fragment>
    ));
  };


  ///////////////////////////////////////////////////////////////
  // Render the test results                                   // 
  //                                                           //
  ///////////////////////////////////////////////////////////////

  const renderResult = () => (
    <div className="card-body">
      <h2>
        {appLocale.resultPageHeaderText
          .replace('<correctIndexLength>', correct.length)
          .replace('<questionLength>', questions.length)}
      </h2>
      <h2>
        {appLocale.resultPagePoint
          .replace('<correctPoints>', correctPoints)
          .replace('<totalPoints>', totalPoints)}
      </h2>
      <br />
      <QuizResultFilter
        filteredValue={filteredValue}
        handleChange={handleChange}
        appLocale={appLocale}
      />
      {renderQuizResultQuestions()}
    </div>
  );


  ///////////////////////////////////////////////////////////////
  // Main render of the component                              // 
  //                                                           //
  ///////////////////////////////////////////////////////////////

  return (
    <div className="questionWrapper" >
      {!endQuiz
        && (
          <>
            <div className="questionWrapperBody" >
              <div>
                {appLocale.question}
                {' '}
                {currentQuestionIndex + 1}
                :
              </div>
              <div className="questionModal" ref={refFeedback}>
                <InstantFeedback
                  question={question}
                  showInstantFeedback={showInstantFeedback}
                  correctAnswer={correctAnswer}
                  incorrectAnswer={incorrectAnswer}
                  onQuestionSubmit={onQuestionSubmit}
                  userAnswer={[...userInput].pop()}
                />
              </div>
              <p dangerouslySetInnerHTML={rawMarkup(question && question.question)} />
              {question && question.questionPic && <img src={question.questionPic} alt="" />}

              {/*Insert the next line to show tags for each question */}
              {/* {question && renderTags(answerSelectionTypeState, question.correctAnswer.length, question.segment)} */}

              {question && renderAnswers(question, buttons)}

            </div>
            {(showNextQuestionButton || allowNavigation)
              && (
                <div className="questionBtnContainer">

                  {(allowNavigation && currentQuestionIndex > 0) && (

                    <div onClick={() => nextQuestion(currentQuestionIndex - 2)} className="poem_btn">
                      <img alt="" src="assets/images/previous-page.svg" />
                    </div>
                  )}
                  <div onClick={() => nextQuestion(currentQuestionIndex)} className="poem_btn">
                    <img alt="" src="assets/images/next-page.svg" />
                  </div>
                </div>
              )}
          </>
        )}

      {endQuiz && showDefaultResultState && customResultPage === undefined && renderResult()}
      {endQuiz && !showDefaultResultState && customResultPage !== undefined && customResultPage(questionSummary)}
    </div>
  );
};

export default Core;
