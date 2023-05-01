import React, { useState, useEffect, useCallback } from 'react';
import Core from './Core';
import defaultLocale from './Locale';
import './styles.css';

const Quiz = function ({

  currentActivity,
  shuffle,
  showDefaultResult,
  onComplete,
  customResultPage,
  showInstantFeedback,
  continueTillCorrect,
  revealAnswerOnSubmit,
  allowNavigation,
  onQuestionSubmit,
  disableSynopsis,
  showCorrectAnswer,

}) {

  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [nrOfQuestions, setNrOfQuestions] = useState(0);

  const shuffleQuestions = useCallback((q) => {
    for (let i = q.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [q[i], q[j]] = [q[j], q[i]];
    }
    q.length = nrOfQuestions;
    return q;
  }, [nrOfQuestions]);


  useEffect(() => {

    if (currentActivity && currentActivity.questions) {

      setNrOfQuestions((currentActivity.nrOfQuestions &&
        currentActivity.nrOfQuestions < currentActivity.questions.length) ?
        currentActivity.nrOfQuestions : currentActivity.questions.length);

      if (shuffle) {
        setQuestions(shuffleQuestions(currentActivity.questions));
      } else {
        setQuestions(currentActivity.questions);
      }

      setQuestions(currentActivity.questions.map((question, index) => ({
        ...question,
        questionIndex: index + 1,
      })));

    }
  }, [currentActivity, currentActivity.questions]);

  useEffect(() => {
    if (disableSynopsis) setStart(true);
  }, [disableSynopsis]);

  //////////////////////////////////////////////////////////////
  //                    Validate the quiz                     //
  //////////////////////////////////////////////////////////////

  const validateQuiz = (q) => {
    if (!q) {
      console.error('Quiz object is required.');
      return false;
    }
    console.log("questions is " + questions)
    for (let i = 0; i < questions.length; i += 1) {
      const {
        question,
        questionType,
        selectionType,
        answers,
        correctAnswer,
      } = questions[i];

      if (!question) {
        console.error("Field 'question' is required.");
        return false;
      }
      if (!questionType) {
        console.error("Field 'questionType' is required.");
        return false;
      }
      if (questionType !== 'text' && questionType !== 'photo') {
        console.error("The value of 'questionType' is either 'text' or 'photo'.");
        return false;
      }
      if (!answers) {
        console.error("Field 'answers' is required.");
        return false;
      }
      if (!Array.isArray(answers)) {
        console.error("Field 'answers' has to be an Array");
        return false;
      }
      if (!correctAnswer) {
        console.error("Field 'correctAnswer' is required.");
        return false;
      }
      let selectType = selectionType;

      if (!selectionType) {
        console.warn('A selectionType should be defined. Single will be used as default.');
        selectType = selectionType || 'single';
      }
      if (selectType === 'single' && !(typeof selectType === 'string' || selectType instanceof String)) {
        console.error('selectionType is single but the field correctAnswer is not a string');
        return false;
      }
      if (selectType === 'multiple' && !Array.isArray(correctAnswer)) {
        console.error('selectionType is multiple but the field correctAnswer is not an array');
        return false;
      }
    }

    return true;
  };



  /*  
  if (!validateQuiz(currentActivity)) {  // PUT THIS BACK IN A USEEFFECT
    return (null);
  }
*/
  const appLocale = {
    ...defaultLocale,
    ...currentActivity.appLocale,
  };

  return (
    <div className="activities_container">
      {!start
        && (
          <div>
            <h2>{currentActivity.activityTitle}</h2>
            <div>{appLocale.landingHeaderText.replace('<questionLength>', nrOfQuestions)}</div>
            {currentActivity.activityIntro
              && (
                <div className="quiz_synopsis">
                  {currentActivity.activityIntro}
                </div>
              )}
            <div className="startQuizWrapper">
              <button onClick={() => setStart(true)} className="startQuizBtn btn">{appLocale.startQuizBtn}</button>
            </div>
          </div>
        )}

      {start && (
        <Core
          questions={questions}
          showDefaultResult={showDefaultResult}
          onComplete={onComplete}
          customResultPage={customResultPage}
          showInstantFeedback={showInstantFeedback}
          continueTillCorrect={continueTillCorrect}
          revealAnswerOnSubmit={revealAnswerOnSubmit}
          allowNavigation={allowNavigation}
          appLocale={appLocale}
          onQuestionSubmit={onQuestionSubmit}
        />
      )}
    </div>
  );
};

export default Quiz;
