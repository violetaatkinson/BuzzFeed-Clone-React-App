import { useState, useEffect, createRef } from 'react';

import Title from './components/Title'
import QuestionB from './components/QuestionB'
import Answer from './components/Answer'


const App = () => {
  const [quiz, setQuiz] = useState(null)
  const [chosenAnswerItems, setChosenAnswerItems] = useState([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  //ref para cada id 
  const refs = unansweredQuestionIds?.reduce((acc, id) => {
      acc[id] = createRef()
      return acc
  }, {})

  const answerRef = createRef()

  console.log(refs)

  const fetchData = async () => {
      try {
          const response = await fetch('http://localhost:8000/quiz')
          const json = await response.json()
          setQuiz(json)
      } catch (err) {
          console.log(err)
      }
  }

  useEffect(() => {
      fetchData()
  }, [])

  useEffect(() => {
      const unansweredIds = quiz?.content?.map(({id}) => id) // para sacar cada id del content
      setUnansweredQuestionIds(unansweredIds)
  }, [quiz])

  useEffect(() => {
    if (chosenAnswerItems.length > 0) {
        if (showAnswer) {
            // scroll to answer block
            answerRef.current.scrollIntoView({behavior: 'smooth'})
        }
        if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
            setShowAnswer(true)
        } else {
            // scroll to highest unansweredQuestionId
            const highestId = Math.min(...unansweredQuestionIds)
            refs[highestId].current.scrollIntoView({behavior: 'smooth'})
        }
    }
}, [unansweredQuestionIds, showAnswer, chosenAnswerItems, answerRef, refs])

  return (
      <div className="app">
          <Title title={quiz?.title} subtitle={quiz?.subtitle}/>
          {refs && quiz?.content?.map(contentItem => (
              <QuestionB
                  key={contentItem.id}
                  quizItem={contentItem}
                  setChosenAnswerItems={setChosenAnswerItems}
                  chosenAnswerItems={chosenAnswerItems}
                  unansweredQuestionIds={unansweredQuestionIds}
                  setUnansweredQuestionIds={setUnansweredQuestionIds}
                  ref={refs[contentItem.id]}
              />
          ))}
          {showAnswer && (// si show answer existe muestro la respuesta
              <Answer
                  answerOptions={quiz?.answers}
                  chosenAnswers={chosenAnswerItems}
                  ref={answerRef}
              />
          )}
      </div>
  )
}

export default App
