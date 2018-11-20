import { ElementType } from 'src/models/form/ElementType';
import { ElementConfig } from './ElementConfig';

export interface Element {
  elementType: ElementType,
  elementConfig: ElementConfig,
  value: string,
  validation?: {
    isRequired?: boolean,
    isEmail?: boolean,
    minLength?: number,
    maxLength?: number
  },
  valid: boolean,
  touched?: boolean
}