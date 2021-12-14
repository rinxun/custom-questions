import { useState, useMemo, useCallback } from "react";
import { v4 as uuid4 } from "uuid";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Enums,
  AnswerGroup,
  QuestionGroup
} from "@rinxun/custom-questions";

function CustomQuestionDemo() {
  // #region for question
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState(Enums.AnswerTypeEnum.shortText);
  const [scoring, setScoring] = useState({
    passScore: "",
    totalScore: "",
    turnOffScoring: false
  });
  const [singleChoiceItems, setSingleChoiceItems] = useState([
    { name: uuid4(), value: "", correctAnswer: true },
    { name: uuid4(), value: "", correctAnswer: false }
  ]);
  const [multiChoiceItems, setMultiChoiceItems] = useState([
    { name: uuid4(), value: "", correctAnswer: true },
    { name: uuid4(), value: "", correctAnswer: false }
  ]);
  // #endregion

  // #region for answer
  const [textValue, setTextValue] = useState("");
  const [link, setLink] = useState("");
  const [linkType, setLinkType] = useState(Enums.LinkTypeEnum.https);
  const [files, setFiles] = useState([]);
  const [singleChoice, setSingleChoice] = useState("");
  const [multiChoices, setMultiChoices] = useState([]);
  const choices = useMemo(() => {
    if (answerType === Enums.AnswerTypeEnum.singleChoice) {
      return singleChoiceItems.map((item) => ({
        label: item.value,
        value: item.name
      }));
    } else if (answerType === Enums.AnswerTypeEnum.multiChoice) {
      return multiChoiceItems.map((item) => ({
        label: item.value,
        value: item.name
      }));
    } else {
      return [];
    }
  }, [singleChoiceItems, multiChoiceItems, answerType]);
  // #endregion

  function onChangeChoice(name, val) {
    if (answerType === Enums.AnswerTypeEnum.singleChoice) {
      setSingleChoiceItems((items) => {
        const newItems = items.map((item) => {
          if (item.name === name) {
            item.value = val;
          }
          return { ...item };
        });
        return [...newItems];
      });
    } else if (answerType === Enums.AnswerTypeEnum.multiChoice) {
      setMultiChoiceItems((items) => {
        const newItems = items.map((item) => {
          if (item.name === name) {
            item.value = val;
          }
          return { ...item };
        });
        return [...newItems];
      });
    }
  }

  function onToggleCorrectAnswer(name) {
    if (answerType === Enums.AnswerTypeEnum.singleChoice) {
      setSingleChoiceItems((items) => {
        const newItems = items.map((item) => {
          if (item.name === name) {
            item.correctAnswer = !item.correctAnswer;
          } else {
            item.correctAnswer = false;
          }
          return { ...item };
        });
        return [...newItems];
      });
    } else if (answerType === Enums.AnswerTypeEnum.multiChoice) {
      setMultiChoiceItems((items) => {
        const newItems = items.map((item) => {
          if (item.name === name) {
            item.correctAnswer = !item.correctAnswer;
          }
          return { ...item };
        });
        return [...newItems];
      });
    }
  }

  function onAddChoice() {
    if (answerType === Enums.AnswerTypeEnum.singleChoice) {
      setSingleChoiceItems((items) => {
        return [...items, { value: "", name: uuid4(), correctAnswer: false }];
      });
    } else if (answerType === Enums.AnswerTypeEnum.multiChoice) {
      setMultiChoiceItems((items) => {
        return [...items, { value: "", name: uuid4(), correctAnswer: false }];
      });
    }
  }

  function onRemoveChoice(name) {
    if (answerType === Enums.AnswerTypeEnum.singleChoice) {
      setSingleChoiceItems((items) => {
        const newItems = items.filter((item) => item.name !== name);
        return [...newItems];
      });
    } else if (answerType === Enums.AnswerTypeEnum.multiChoice) {
      setMultiChoiceItems((items) => {
        const newItems = items.filter((item) => item.name !== name);
        return [...newItems];
      });
    }
  }

  function onChangeQuestion(val) {
    setQuestion(val);
  }

  function onChangeAnswerType(val) {
    setAnswerType(val);
  }

  function onChangeScoring(name, val) {
    setScoring((s) => ({ ...s, [name]: val }));
  }

  function onToggleScoring(val) {
    setScoring((s) => ({ ...s, turnOffScoring: val }));
  }

  const answers = useCallback(
    (viewType) => {
      switch (answerType) {
        case Enums.AnswerTypeEnum.shortText:
        case Enums.AnswerTypeEnum.longText:
          return {
            name: "demo",
            value: textValue,
            onChange: (val) => {
              setTextValue(val);
            },
            viewType
          };
        case Enums.AnswerTypeEnum.link:
          return {
            name: "demo",
            value: link,
            onChange: (val) => {
              setLink(val);
            },
            linkType,
            viewType,
            onToggleLinkType: (val) => {
              setLinkType(val);
            }
          };
        case Enums.AnswerTypeEnum.singleChoice:
          return {
            name: "demo",
            viewType,
            options: choices,
            value: singleChoice,
            onChange: (val) => {
              setSingleChoice(val);
            }
          };
        case Enums.AnswerTypeEnum.multiChoice:
          return {
            name: "demo",
            viewType,
            options: choices,
            value: multiChoices,
            onChange: (val, checked) => {
              if (checked) {
                setMultiChoices((choices) => [...choices, val]);
              } else {
                setMultiChoices((choices) => choices.filter((c) => c !== val));
              }
            }
          };
        default:
          // upload
          return {
            files: files,
            onUpload: (files) => {
              const file = files[0];
              const { name } = file;
              setFiles((f) => [...f, { id: uuid4(), fileName: name }]);
            },
            onRemove: (id) => {
              setFiles((fs) => fs.filter((f) => f.id !== id));
            },
            viewType
          };
      }
    },
    [
      answerType,
      choices,
      files,
      link,
      linkType,
      multiChoices,
      singleChoice,
      textValue
    ]
  );

  const choiceItems = useMemo(() => {
    if (answerType === Enums.AnswerTypeEnum.singleChoice) {
      return singleChoiceItems;
    } else if (answerType === Enums.AnswerTypeEnum.multiChoice) {
      return multiChoiceItems;
    }
    return [];
  }, [singleChoiceItems, multiChoiceItems, answerType]);

  return (
    <div>
      <Typography variant="h5" color="forestgreen" align="left">
        Edit Question
      </Typography>
      <QuestionGroup
        question={question}
        onChangeQuestion={onChangeQuestion}
        answerType={{
          value: answerType,
          onChange: onChangeAnswerType,
          hiddenOptions: [
            // for hide some answer types unnecessary
            Enums.AnswerTypeEnum.upload,
            Enums.AnswerTypeEnum.link
          ]
        }}
        scoring={{
          ...scoring,
          onToggleScoring,
          onChangePassScore: (val) => {
            onChangeScoring("passScore", val);
          },
          onChangeTotalScore: (val) => {
            onChangeScoring("totalScore", val);
          }
        }}
        showScoring
        choices={{
          answerType,
          maxItems: 3,
          options: choiceItems,
          needDefineCorrectAnswer: true,
          onChange: onChangeChoice,
          onToggleCorrectAnswer,
          onAddMore: onAddChoice,
          onRemove: onRemoveChoice
        }}
      />
      <br />
      <br />
      <Typography variant="h5" color="steelblue" align="left">
        Preview Question
      </Typography>
      <AnswerGroup
        answerType={answerType}
        question={question}
        answer={answers(Enums.ViewTypeEnum.preview)}
      />
      <br />
      <br />
      <Typography variant="h5" color="sienna" align="left">
        Answer Question
      </Typography>
      <AnswerGroup
        answerType={answerType}
        question={question}
        answer={answers(Enums.ViewTypeEnum.answer)}
      />
      <br />
      <br />
      <Grid textAlign="left">
        <Typography variant="h5" color="fuchsia" align="left">
          Preview Specific Answer Type
        </Typography>
        <Typography variant="subtitle1" color="darkorchid" align="left">
          Single Choice
        </Typography>
        <AnswerGroup
          answerType={Enums.AnswerTypeEnum.singleChoice}
          question="Please pick your favourite animal"
          answer={
            {
              name: "demo",
              viewType: Enums.ViewTypeEnum.preview,
              options: [
                { label: "Cat", value: "cat" },
                { label: "Dog", value: "dog" },
                { label: "Dragon", value: "dragon" }
              ],
              value: "",
              onChange: () => {}
            }
          }
        />
        <br />

        <Typography variant="subtitle1" color="darkorchid" align="left">
          Multi Choice
        </Typography>
        <AnswerGroup
          answerType={Enums.AnswerTypeEnum.multiChoice}
          question="Please pick your favourite animals"
          answer={
            {
              name: "demo",
              viewType: Enums.ViewTypeEnum.preview,
              options: [
                { label: "Cat", value: "cat" },
                { label: "Dog", value: "dog" },
                { label: "Dragon", value: "dragon" }
              ],
              value: [],
              onChange: () => {}
            }
          }
        />
      </Grid>
    </div>
  );
}

export default CustomQuestionDemo;
