import React, { useState, useEffect, useMemo } from "react";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";
import UserName from "./components/UserName";
import VisitMe from "./components/VisitMe/VisitMe";
import "./App.css";

const App = () => {

  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("0€");

  const data = [
    {
      id: 1,
      question: "In what year did man go to the moon?",
      answers: [
        {
          text: "1967",
          correct: false,
        },
        {
          text: "1968",
          correct: false,
        },
        {
          text: "1969",
          correct: true,
        },
        {
          text: "1970",
          correct: false,
        }
      ]
    },
    {
      id: 2,
      question: "What is the longest river in the world?",
      answers: [
        {
          text: "Nile",
          correct: false,
        },
        {
          text: "Amazon",
          correct: true,
        },
        {
          text: "Yangtsé",
          correct: false,
        },
        {
          text: "Misisipi",
          correct: false,
        }
      ]
    },
    {
      id: 3,
      question: "In what year did World War II end?",
      answers: [
        {
          text: "1944",
          correct: false,
        },
        {
          text: "1945",
          correct: true,
        },
        {
          text: "1946",
          correct: false,
        },
        {
          text: "1947",
          correct: false,
        }
      ]
    },
    {
      id: 4,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Cars",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "When was created the website Facebook launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: "What are humans?",
      answers: [
        {
          text: "Omnivores",
          correct: true,
        },
        {
          text: "Herbivores",
          correct: false,
        },
        {
          text: "Carnivores",
          correct: false,
        },
        {
          text: "Depends on race",
          correct: false,
        }
      ]
    },
    {
      id: 8,
      question: " What is the largest ocean?",
      answers: [
        {
          text: "Pacific ocean",
          correct: true,
        },
        {
          text: "Atlantic ocean",
          correct: false,
        },
        {
          text: "Arctic Ocean",
          correct: false,
        },
        {
          text: "Indian ocean",
          correct: false,
        }
      ]
    },
    {
      id: 9,
      question: "Where in the body is insulin produced?",
      answers: [
        {
          text: "Pancreas",
          correct: true,
        },
        {
          text: "Kidney",
          correct: false,
        },
        {
          text: "Spleen",
          correct: false,
        },
        {
          text: "Liver",
          correct: false,
        }
      ]
    },
    {
      id: 10,
      question: "Who was the founder of the NSDAP party?",
      answers: [
        {
          text: "Adolf Hitler",
          correct: false,
        },
        {
          text: "Joseph Goebbels",
          correct: false,
        },
        {
          text: "Rudolf Hess",
          correct: false,
        },
        {
          text: "Anton Drexler",
          correct: true,
        }
      ]
    },
  ];

  const moneyPyramid = useMemo(() =>
    [
      { id: 1, amount: "100€" },
      { id: 2, amount: "200€" },
      { id: 3, amount: "300€" },
      { id: 4, amount: "400€" },
      { id: 5, amount: "500€" },
      { id: 6, amount: "600€" },
      { id: 7, amount: "700€" },
      { id: 8, amount: "800€" },
      { id: 9, amount: "900€" },
      { id: 10, amount: "1.000€" }
    ].reverse(),
    []);

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  const resetGameHandler = () => {
    setUsername(null);
    setQuestionNumber(1);
    setStop(false);
    setEarned("0€");
  };

  return (
    <div className="app">
      {username
        ? (
          <>
            <div className="main">
              {stop
                ?
                <div className="gameOver">
                  <h1 className="gameOverText">{questionNumber === 10 && stop ? "YOU WON!" : "You earned: " + earned}</h1>
                  <button className="gameOverTryAgain" onClick={resetGameHandler}>Try again!</button>
                </div>
                : (
                  <>
                    <div className="top">
                      <div className="timer">
                        <Timer
                          setStop={setStop}
                          questionNumber={questionNumber}
                        />
                      </div>
                      <div className="usernameContainer">
                        <UserName
                          myUserName={username}
                        />
                      </div>
                    </div>
                    <div className="bottom">
                      <Quiz
                        data={data}
                        setStop={setStop}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                      />
                    </div>
                  </>
                )}
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneyPyramid.map(i => (
                  <li className={i.id === questionNumber ? `moneyListItem active` : `moneyListItem`}>
                    <span className="moneyListItemNumber">{i.id}</span>
                    <span className="moneyListItemAmount">{i.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
        :
        (<Start setUsername={setUsername} />)
      }
      <VisitMe />
    </div>
  );
};

export default App;
