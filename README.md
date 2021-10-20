<h1 align="center">Custom Questions</h1>

<p align="center">It can help you to build some React custom question components for creating, editing and answering questions.</p>
<p align="center">You can use it to build a questionnaire app</p>

---

<h2>Quick Guide</h2>

- [Installation](#installation)
- [License](#license)
- [Usage](#usage)
- [Some Enumerations](#some-enumerations)
  - [AnswerTypeEnum](#answertypeenum)
  - [LinkTypeEnum](#linktypeenum)
  - [ViewTypeEnum](viewtypeenum)
- [Components](#components)
  - [AnswerTypeSelector](#answertypeselector)
  - [LinkAnswer](#linkanswer)
  - [Scoring](#scoring)
  - [TextAnswer](#textanswer)
  - [UploaderAnswer](#uploaderanswer)
  - [EditChoiceItems](#editchoiceitems)
  - [SingleChoiseAnswer](#singlechoiseanswer)
  - [MultiChoiseAnswer](#multichoiseanswer)
  - [QuestionGroup](#questiongroup)
  - [AnswerGroup](#answergroup)
- [Changelog](#changelog)



<h2>Installation</h2>

`custom-questions` is available as an [npm package](https://www.npmjs.com/package/@rinxun/custom-questions).

```bash
// with npm
npm install @rinxun/custom-questions

// with yarn
yarn add @rinxun/custom-questions
```



<h2>License</h2>

This project is licensed under the terms of the [MIT license](https://github.com/rinxun/custom-questions/blob/main/LICENSE).



<h2>Usage</h2>

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

We prepared a [live and interactive demo](https://codesandbox.io/s/custom-questions-sih9f?file=/src/App.tsx) for you to get started.



<h2>Some Enumerations</h2>

<h3>AnswerTypeEnum</h3>

| Name         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| shortText    | If you select it, we will render a text input box for you to answer. |
| longText     | If you select it, we will render a text area for you to answer. |
| upload       | If you select it, we will render an uploader for you to upload. |
| link         | If you select it, we will render a link input box for you to type. |
| singleChoice | If you select it, we will render a radio group for you to pick. |
| multiChoice  | If you select it, we will render a checkbox group for you to pick. |

<h3>LinkTypeEnum</h3>

| Name   | Description                                                  |
| ------ | ------------------------------------------------------------ |
| http   | Hypertext Transfer Protocol, for loading web pages using hypertext links. |
| https  | Hypertext Transfer Protocol Secure, a secure version of the HTTP protocol. |
| mailto | A type of HTML link that activates the default mail client on the computer for sending an e-mail. |
| ftp    | File Transfer Protocol, for transferring files between computers. |
| sftp   | Secure File Transfer Protocol, for transferring large files over the web. |

<h3>ViewTypeEnum</h3>

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| answer  | If you select it, you can answer the question.     |
| edit    | If you select it, you can edit the question.       |
| preview | If you select it, you can preview the answer area. |



<h2>Components</h2>

<h3>AnswerTypeSelector</h3>

You can use it to switch different answer types.

<h5>Import</h5>

```typescript
import { AnswerTypeSelector } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name          | Type                    | Default              | Required | Description                                                  |
| ------------- | ----------------------- | -------------------- | -------- | ------------------------------------------------------------ |
| label         | string                  | 'Select Answer Type' | false    | The label of the `Select` element.                           |
| onChange      | func                    |                      | true     | Callback fired when the `Select` value is changed.<br />**Signature:**<br/>`function(value: AnswerTypeEnum) => void`<br/>*value:* The value of the `Select` element. |
| value         | AnswerTypeEnum          |                      | true     | The value of the `Select` element, required for a controlled component. |
| hiddenOptions | Array\<AnswerTypeEnum\> | []                   | false    | The options (answer types) you don't want to show in the options list of the selector. |



<h3>LinkAnswer</h3>

It will help you to render a URL input component for answering.

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
| onChange         | func         |         | true     | Callback fired when the `Input` value is changed.<br />**Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element. |
| onToggleLinkType | func         |         | true     | Callback fired when the `Select` value is changed.<br />**Signature:**<br/>`function(value: LinkTypeEnum) => void`<br/>*value:* The value of the `Select` element. |
| required         | bool         | false   | false    | If `true`, the `Input` is required.                          |
| value            | string       |         | true     | The value of the `Input` element, required for a controlled component. |
| viewType         | ViewTypeEnum |         | true     | If `preview `or `edit` you can preview the answer component;<br />If `answer` you can answer the question. |



<h3>Scoring</h3>

You can use it to define the total score and the pass score.

<h5>Import</h5>

```typescript
import { Scoring } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name                | Type             | Default                                          | Required | Description                                                  |
| ------------------- | ---------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------ |
| exceededErrText     | string           | 'Pass Score should be less than the Total Score' | false    | The error message when Pass Score is greater then Total Score. |
| onChangePassScore   | func             |                                                  | true     | Callback fired when the Pass Score `Input` value is changed.<br />**Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element for Pass Score. |
| onChangeTotalScore  | func             |                                                  | true     | Callback fired when the Total Score `Input` value is changed.<br />**Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element for Total Score. |
| onToggleScoring     | func             |                                                  | true     | Callback fired when the `Switch` value is changed.<br />**Signature:**<br/>`function(value: bool) => void`<br/>*value:* The value of the `Switch` element. |
| passScore           | string \| number |                                                  | true     | The value of the `Input` element for Pass Score.             |
| passScoreLabel      | string           | 'Pass Score'                                     | false    | The label of the `Input` element for Pass Score.             |
| totalScore          | string \| number |                                                  | true     | The value of the `Input` element for Total Score.            |
| totalScoreLabel     | string           | 'Total Score'                                    | false    | The label of the `Input` element for Total Score.            |
| turnOffScoring      | bool             |                                                  | true     | The value of the `Switch` element.                           |
| turnOffScoringLabel | string           | 'Turn off scoring'                               | false    | The label of the `Switch` element.                           |



<h3>TextAnswer</h3>

It will help you to render a text input component for answering..

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
| onChange    | func           |                            | true     | Callback fired when the `Input` value is changed.<br />**Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element. |
| placeholder | string         | 'Type your answer here...' | false    | The placeholder of the `Input` element.                      |
| required    | bool           | false                      | false    | If `true`, the `Input` is required.                          |
| value       | string         |                            | true     | The value of the `Input` element, required for a controlled component. |
| viewType    | ViewTypeEnum   |                            | true     | If `preview `or `edit` you can preview the answer component;<br />If `answer` you can answer the question. |



<h3>UploaderAnswer</h3>

It will help you to render a Uploader component for uploading files.

<h5>Import</h5>

```typescript
import { UploaderAnswer } from '@rinxun/custom-questions';
```

<h5>File Props</h5>

| Name     | Type           | Default | Required | Description                                   |
| -------- | -------------- | ------- | -------- | --------------------------------------------- |
| id       | string\|number |         | true     | The unique id of the file.                    |
| fileName | string         |         | true     | The name of the file.                         |
| fileKey  | string         |         | false    | The unique key of the file, like from AWS S3. |

<h5>Props</h5>

| Name                 | Type               | Default                                                      | Required | Description                                                  |
| -------------------- | ------------------ | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| chooseFileText       | string             | 'Choose a file'                                              | false    | The text of the Choose button.                               |
| dropFileText         | string             | 'Drop files here'                                            | false    | The text of the Drop File Area.                              |
| files                | Array\<FileProps\> |                                                              | true     | See **File Props** above.                                    |
| maxSize              | number             | 5 (MB)                                                       | false    | Maximum of the uploading file size, UOM is `MB`.             |
| onRemove             | func               |                                                              | true     | Callback fired when removed the file.<br />**Signature:**<br/>`function(id: string|number) => void`<br/>*id:* The unique id of the removing file, but if `fileKey`is not null/undefined, here you will get the `fileKey` instead of the `id`. |
| onUpload             | func               |                                                              | true     | Callback fired when uploaded a file.<br />**Signature:**<br/>`function(files: Array<File>, index?: number) => void`<br/>*files:* Acceptable files you uploaded.<br />*index:* If more than 1 `Uploader` in the same page, you can define the `index`. |
| sizeExceededErrText  | string             | Your file exceed the max size of x MB.                       | false    | The alert message when you uploaded a size exceeded file.<br />`x` is the maximum of the uploading file size, if you set the `maxSize` that's it, otherwise, default to 5. |
| viewType             | ViewTypeEnum       |                                                              | true     | If `preview `or `edit` you can preview the `Uploader` component;<br />If `answer` you can upload files. |
| warmingTips          | string             | 'Documents can be uploaded in pdf, xls, doc & jpeg formats. Maximum size allowed is x MB.' | false    | The tip of the `Uploader` as helper text.<br />`x` is the maximum of the uploading file size, if you set the `maxSize` that's it, otherwise, default to 5. |
| wrongFileTypeErrText | string             | 'The type of the file you uploaded is not accepted, please reupload!' | false    | The alert message when you uploaded an unacceptable file.    |



<h3>EditChoiceItems</h3>

You can use it to create/edit choices.

<h5>Import</h5>

```typescript
import { EditChoiceItems } from '@rinxun/custom-questions';
```

<h5>Choice Item Props</h5>

| Name  | Type   | Default    | Required | Description                                                  |
| ----- | ------ | ---------- | -------- | ------------------------------------------------------------ |
| label | string | 'Choice x' | false    | The label of the `Input`.<br />`x` is an index number.       |
| name  | string |            | true     | The name of the `Input`. <br />Also it is the unique id of the choice item. |
| value | string |            | true     | The value of the `Input`.                                    |

<h5>Props</h5>

| Name            | Type                     | Default                              | Required | Description                                                  |
| --------------- | ------------------------ | ------------------------------------ | -------- | ------------------------------------------------------------ |
| maxItems        | number                   |                                      | false    | Maximum number of items to add, it must be greater than 2.<br />If `null` then unlimited. |
| maxItemsTipText | string                   | 'A maximum of x choices can be set!' | false    | A warming tip to tell users the maximum number of items to add. Only be displayed when `maxItems` is not `null`.<br />`x` is the `maxItem` value. |
| onAddMore       | func                     |                                      | true     | Callback fired when the Add More button is clicked.<br />**Signature:**<br/>`function() => void`<br/> |
| onChange        | func                     |                                      | true     | Callback fired when the `Input` value is changed.<br />**Signature:**<br/>`function(name: string, value: string) => void`<br/>*name:* The name of the `Input` element.<br />*value:* The value of the `Input` element. |
| onRemove        | func                     | 'Enter Question'                     | false    | Callback fired when removed the choice item.<br />**Signature:**<br/>`function(name: string) => void`<br/>*name:* The name of the `Input` element. |
| options         | Array\<ChoiceItemProps\> |                                      | true     | See **Choice Item Props** above.<br />The length of options must be greater than 2. |



<h3>SingleChoiseAnswer</h3>

It will help you to render a radio group component for answering.

<h5>Import</h5>

```typescript
import { SingleChoiseAnswer } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name     | Type                                      | Default | Required | Description                                                  |
| -------- | ----------------------------------------- | ------- | -------- | ------------------------------------------------------------ |
| name     | string                                    |         | true     | The name of the `RadioGroup` element.                        |
| onChange | func                                      |         | true     | Callback fired when the `Radio` value is changed.<br />**Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the selected `Radio` element. |
| options  | Array\<{ label: string; value: string }\> |         | true     | The radio options for rendering.                             |
| value    | string                                    |         | true     | The selected value of the `RadioGroup` element.              |
| viewType | ViewTypeEnum                              |         | true     | If `preview `or `edit` you can preview the `RadioGroup` component;<br />If `answer` you can do single select. |



<h3>MultiChoiseAnswer</h3>

It will help you to render a checkbox group component for answering.

<h5>Import</h5>

```typescript
import { MultiChoiseAnswer } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name     | Type                                      | Default | Required | Description                                                  |
| -------- | ----------------------------------------- | ------- | -------- | ------------------------------------------------------------ |
| name     | string                                    |         | true     | The name of the `Form` element.                              |
| onChange | func                                      |         | true     | Callback fired when the `Radio` value is changed.<br />**Signature:**<br/>`function(value: string, checked: boolean) => void`<br/>*value:* The value of the checked `checkbox` element.<br />*checked:* if `true` that means the checkbox is checked, otherwise, unchecked. |
| options  | Array\<{ label: string; value: string }\> |         | true     | The checkbox options for rendering.                          |
| value    | Array\<string\>                           |         | true     | The values of all checked`checkbox` elements.                |
| viewType | ViewTypeEnum                              |         | true     | If `preview `or `edit` you can preview the `checkbox` component;<br />If `answer` you can do multiple select. |



<h3>QuestionGroup</h3>

You can use it to create/edit a question.

<h5>Import</h5>

```typescript
import { QuestionGroup } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name             | Type                    | Default          | Required | Description                                                  |
| ---------------- | ----------------------- | ---------------- | -------- | ------------------------------------------------------------ |
| answerType       | AnswerTypeSelectorProps |                  | true     | See props of `AnswerTypeSelector` .                          |
| choices          | EditChoiceItemsProps    |                  | true     | See props of `EditChoiceItems`.                              |
| onChangeQuestion | func                    |                  | true     | Callback fired when the `Input` value is changed.<br />**Signature:**<br/>`function(value: string) => void`<br/>*value:* The value of the `Input` element. |
| question         | string                  |                  | true     | The value of the Question `Input` element.                   |
| questionLabel    | string                  | 'Enter Question' | false    | The label of the Question `Input` element.                   |
| scoring          | ScoringProps            |                  | false    | See props of `Scoring`. Required if `showScoring` is `true`. |
| showScoring      | boolean                 | false            | false    | If `true`, the `Scoring` will be rendered.                   |



<h3>AnswerGroup</h3>

You can use it to render a component for answering.

<h5>Import</h5>

```typescript
import { AnswerGroup } from '@rinxun/custom-questions';
```

<h5>Props</h5>

| Name       | Type                                                         | Default | Required | Description                                                |
| ---------- | ------------------------------------------------------------ | ------- | -------- | ---------------------------------------------------------- |
| answer     | LinkAnswerProps \| TextAnswerProps \| UploaderAnswerProps \| SingleChoiceAnswerProps \| MultiChoiceAnswerProps |         | true     | See the corresponding props above.                         |
| answerType | AnswerTypeEnum                                               |         | true     | Which kind of component you want to render for the answer. |
| question   | string                                                       |         | true     | The text to describe the question.                         |



<h2>Changelog</h2>

If you have recently updated, please read the [changelog](https://github.com/rinxun/custom-questions/releases) for details of what has changed.

