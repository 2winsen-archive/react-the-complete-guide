import { ElementType } from 'src/models/form/ElementType';

export interface ElementConfig extends React.Props<any> {
  type?: ElementType,
  placeholder?: string,
  options?: Array<{
    displayValue: string,
    value: string
  }>
}