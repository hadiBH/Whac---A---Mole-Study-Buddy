import { useState } from "react";
import Question from "./Question";
import classes from "./Trivia.module.scss";

import QuizResponse, {
  QuizQuestion,
} from "../../utilis/interfaces/question.interface";
import { useDispatch } from "react-redux";
import { UserAction } from "../../store/slice/user.slice";

interface TriviaProps {
  questions?: QuizQuestion[];
  setQuestion?: (question: QuizResponse) => void;
}

const Trivia = ({ setQuestion, questions }: TriviaProps) => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const { question, correct_answer, category, incorrect_answers } =
    questions[currentQuestion];

  const endGame = (score: number) => {
    dispatch(
      UserAction.update({
        category: category,
        score,
        numOfQuestions: currentQuestion,
      })
    );
    setCurrentQuestion(0);
    setQuestion(null);
  };

  const changeQuestion = (score: number, isLost?: boolean) => {
    if (currentQuestion === questions.length - 1 || isLost)
      return endGame(score);

    setCurrentQuestion((prev) => prev + 1);
  };

  const abortHandler = () => {
    setCurrentQuestion(0);
    setQuestion(null);
  };

  return (
    <div className={classes.__triviaContainer}>
      <Question
        changeQuestion={changeQuestion}
        category={category}
        question={question}
        correct_answer={correct_answer}
        answers={incorrect_answers}
      />
      <div className={classes.__btn}>
        <button onClick={abortHandler}>Quit game</button>
      </div>
    </div>
  );
};

export default Trivia;
