import * as React from 'react';

const classes = require('./Input.css');

export type ElementType = 'input' | 'textarea' | 'select';

interface ElementConfig extends React.Props<any> {
  type: string,
  placeholder: string,
  options: Array<{
    displayValue: string,
    value: string
  }>
}

interface Props extends React.Props<any> {
  elementType: ElementType,
  invalid: boolean,
  shouldValidate: boolean,
  touched: boolean,
  elementConfig: ElementConfig,
  value: string,
  label: string,
  onChange: () => void
}

const Input = (props: Props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange} />;
      break;
    case 'textarea':
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange} />;
      break;
    case 'select':
      inputElement = <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.onChange}>
        {props.elementConfig.options.map(option => (
          <option
            key={option.value}
            value={option.value}>{option.displayValue}</option>
        ))}
      </select>;
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;