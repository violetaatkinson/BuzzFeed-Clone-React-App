import { forwardRef } from 'react'
import Question from "./Questions";

const QuestionB = ({
                      quizItem, 
                      setChosenAnswerItems, 
                      chosenAnswerItems, 
                      unansweredQuestionIds, 
                      setUnansweredQuestionIds
                  },ref) => {
  
    return (
        <>
          <h2 ref={ref}   className="question-title">{quizItem.text}</h2>
          <div className="questions-container">
            {quizItem.questions.map((question, _index) => (
              <Question
                  key={_index}
                  quizItemId={quizItem.id} 
                  question={question}
                  setChosenAnswerItems={setChosenAnswerItems}
                  chosenAnswerItems={chosenAnswerItems}
                  unansweredQuestionIds={unansweredQuestionIds}
                  setUnansweredQuestionIds={setUnansweredQuestionIds}
               />
            ))}
          </div>
        </>
    );
  }
  
  export default forwardRef(QuestionB);