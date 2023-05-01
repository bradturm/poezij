import React, { useEffect } from 'react';
import Explanation from './Explanation';

const renderMessageForCorrectAnswer = (question) => {
  const defaultMessage = 'You are correct. Please click Next to continue.';
  return question.correctMessage || defaultMessage;
};

const renderMessageForIncorrectAnswer = (question) => {
  const defaultMessage = 'Incorrect answer. Please try again.';
  return question.incorrectMessage || defaultMessage;
};

const InstantFeedback = function ({
  showInstantFeedback,
  incorrectAnswer,
  correctAnswer,
  question,
  onQuestionSubmit,
  userAnswer,
}) {

  useEffect(() => {

    if (onQuestionSubmit && (correctAnswer || incorrectAnswer)) {
      onQuestionSubmit({ question, userAnswer, isCorrect: correctAnswer });
      //  refFeedback.current.scrollIntoView({ behavior: 'smooth' })
      console.log("in InstantFeedback - correctAnswer is " + correctAnswer)
    }
  }, [correctAnswer, incorrectAnswer, onQuestionSubmit, question, userAnswer]);                               // [correctAnswer, incorrectAnswer]);

  return (
    <>
      {incorrectAnswer && showInstantFeedback
        && <div className="alert incorrect">{renderMessageForIncorrectAnswer(question)}</div>}
      {correctAnswer && showInstantFeedback
        && (
          <div className="alert correct">
            {renderMessageForCorrectAnswer(question)}
            <Explanation question={question} isResultPage={false} />
          </div>
        )}
    </>
  );
};

export default InstantFeedback;
