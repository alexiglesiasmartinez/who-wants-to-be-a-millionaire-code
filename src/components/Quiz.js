import { useState, useEffect } from "react";
import "./Quiz.css";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import youWon from "../assets/youWon.mp3";

const Quiz = ({
    data,
    setStop,
    questionNumber,
    setQuestionNumber
}
) => {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play, { volume: 0.10 });
    const [correctAnswer] = useSound(correct, { volume: 0.40 });
    const [wrongAnswer] = useSound(wrong, { volume: 0.40 });
    const [victory] = useSound(youWon, { volume: 0.40 });

    useEffect(() => {
        letsPlay();
    }, [letsPlay]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");
        // Pause time.
        delay(1800, () =>
            setClassName(a.correct ? "answer correct" : "answer wrong")
        );
        delay(4800, () => {
            if (a.correct) {
                correctAnswer();

                // SI ESTOY EN LA PREGUNTA 10, PONER UN DELAY DE 2000.

                if (question.id === 10) {
                    delay(0, () => {
                        victory();
                        setSelectedAnswer(null);
                        setStop(true);
                    });
                }

                delay(2500, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });
            }
            else {
                wrongAnswer();
                delay(2500, () => {
                    setStop(true);
                });
            }
        });
    };

    return (
        <div className="quiz">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div
                        className={selectedAnswer === a ? className : "answer"}
                        onClick={() => handleClick(a)}
                    >
                        {a.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quiz;