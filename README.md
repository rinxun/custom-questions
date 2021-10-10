<h1 align="center">Custom Questions</h1>

<p align="center">It can help you to build some React custom question components for creating, editing and answering questions.</p>
<p align="center">You can use it to build a questionnaire app</p>

---

<h2>Installation </h2>

`custom-questions` is available as an [npm package](https://www.npmjs.com/package/@rinxun/custom-questions).

```bash
// with npm
npm install @rinxun/custom-questions

// with yarn
yarn add @rinxun/custom-questions
```

<h2>License</h2>

This project is licensed under the terms of the [MIT license](https://github.com/rinxun/custom-questions/blob/main/LICENSE).

<h2>
  Usage
</h2>

Here is a quick example to get you started:

```typescript
import { useState } from 'react';
import { Enums, AnswerGroup, TextAnswerProps } from '@rinxun/custom-questions';

function CustomQuestionDemo() {
  const [textValue, setTextValue] = useState('');
  
  return (
    <AnswerGroup
			answerType={Enums.AnswerTypeEnum.shortText}
			question="What's your name?"
			answer={
        {
          name: 'demo',
          value: textValue,
          onChange: (val: string) => {
            setTextValue(val);
          },
          viewType: Enums.ViewTypeEnum.preview 
        } as TextAnswerProps
			}
		/>
  )
}
```

<h2>Documentation</h2>

<h4>Some Enumerations</h4>

- AnswerTypeEnum
  - shortText
    - If you select it, we will render a text input box for you to answer
  - longText
    - If you select it, we will render a text area for you to answer
  - upload
    - If you select it, we will render an uploader for you to upload
  - link
    - If you select it, we will render a link input box for you to type
  - singleChoice
    - If you select it, we will render a radio group for you to pick
  - multiChoice
    - If you select it, we will render a checkbox group for you to pick
- LinkTypeEnum
  - http
  - https
  - mailto
  - ftp
  - sftp
- ViewTypeEnum
  - preview
    - If you select it, you can preview the answer area
  - edit
    - If you select it, you can edit the question
  - answer
    - If you select it, you can answer the question

<h4>AnswerTypeSelector</h4>

You can use it to switch different answer types.

<h5>Import</h5>

```typescript
import { AnswerTypeSelector } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name     | Type           | Default              | Required | Description                                                  |
| -------- | -------------- | -------------------- | -------- | ------------------------------------------------------------ |
| label    | string         | 'Select Answer Type' | false    | The label of the `Select` element.                           |
| onChange | func           |                      | true     | **Signature:**<br/>`function(value: AnswerTypeEnum) => void`<br/>*value:* The value of the `Select` element. |
| value    | AnswerTypeEnum |                      | true     | The value of the `Select` element, required for a controlled component. |

<h4>LinkAnswer</h4>

You can use it to anwer with an url.

<h5>Import</h5>

```typescript
import { LinkAnswer } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name             | Type         | Default | Required | Description                                                  |
| ---------------- | ------------ | ------- | -------- | ------------------------------------------------------------ |
| disabled         | bool         | false   | false    | If `true`, the component is disabled.                        |
| linkType         | LinkTypeEnum |         | true     | The value of the `Select` element, required for a controlled component. |
| maxLength        | number       |         | false    | Maximum number of length to type.                            |
| minLength        | number       |         | false    | Minimum number of length to type.                            |
| name             | string       |         | false    | The name of the `Input` element.                             |
| onChange         | func         |         | true     | **Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element. |
| onToggleLinkType | func         |         | true     | **Signature:**<br/>`function(value: LinkTypeEnum) => void`<br/>*value:* The value of the `Select` element. |
| required         | bool         | false   | false    | If `true`, the `Input` is required.                          |
| value            | string       |         | true     | The value of the `Input` element, required for a controlled component. |
| viewType         | ViewTypeEnum |         | true     | If `preview `or `edit` you can preview the answer component;<br />If `answer` you can answer the question. |

<h4>Scoring</h4>

You can use it to define the total score and the pass score.

<h5>Import</h5>

```typescript
import { Scoring } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name                | Type             | Default                                          | Required | Description                                                  |
| ------------------- | ---------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------ |
| exceededErrText     | string           | 'Pass Score should be less than the Total Score' | false    | The error message when Pass Score is greater then Total Score. |
| onChangePassScore   | func             |                                                  | true     | **Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element for Pass Score. |
| onChangeTotalScore  | func             |                                                  | true     | **Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element for Total Score. |
| onToggleScoring     | func             |                                                  | true     | **Signature:**<br/>`function(value: bool) => void`<br/>*value:* The value of the `Switch` element. |
| passScore           | string \| number |                                                  | true     | The value of the `Input` element for Pass Score.             |
| passScoreLabel      | string           | 'Pass Score'                                     | false    | The label of the `Input` element for Pass Score.             |
| totalScore          | string \| number |                                                  | true     | The value of the `Input` element for Total Score.            |
| totalScoreLabel     | string           | 'Total Score'                                    | false    | The label of the `Input` element for Total Score.            |
| turnOffScoring      | string           |                                                  | true     | The value of the `Switch` element.                           |
| turnOffScoringLabel | string           | 'Turn off scoring'                               | true     | The label of the `Switch` element.                           |

<h4>TextAnswer</h4>

You can use it to answer with regular texts.

<h5>Import</h5>

```typescript
import { TextAnswer } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name        | Type           | Default                    | Required | Description                                                  |
| ----------- | -------------- | -------------------------- | -------- | ------------------------------------------------------------ |
| answerType  | AnswerTypeEnum |                            | true     | `shortText` or `longText`.                                   |
| disabled    | bool           | false                      | false    | If `true`, the component is disabled.                        |
| maxLength   | number         |                            | false    | Maximum number of length to type.                            |
| minLength   | number         |                            | false    | Minimum number of length to type.                            |
| name        | string         |                            | false    | The name of the `Input` element.                             |
| onChange    | func           |                            | true     | **Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element. |
| placeholder | string         | 'Type your answer here...' | false    | The placeholder of the `Input` element.                      |
| required    | bool           | false                      | false    | If `true`, the `Input` is required.                          |
| value       | string         |                            | true     | The value of the `Input` element, required for a controlled component. |
| viewType    | ViewTypeEnum   |                            | true     | If `preview `or `edit` you can preview the answer component;<br />If `answer` you can answer the question. |



<h4>QuestionGroup</h4>

You can use it to create/edit a question.

<h5>Import</h5>

```typescript
import { QuestionGroup } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name       | Type   | Default | Required | Description                                             |
| ---------- | ------ | ------- | -------- | ------------------------------------------------------- |
| answerType |        |         |          |                                                         |
|            |        |         |          |                                                         |
|            |        |         |          |                                                         |
| question   | string |         | true     | It is a value for user to define a question description |
|            |        |         |          |                                                         |
|            |        |         |          |                                                         |



<h2>Changelog</h2>

If you have recently updated, please read the [changelog](https://github.com/rinxun/custom-questions/releases) for details of what has changed.

