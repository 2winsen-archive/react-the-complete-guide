import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { BurgerBuilder } from './BurgerBuilder';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const empty = () => true;
    wrapper = shallow(<BurgerBuilder onInitIngredients={empty} />);
  });

  it('should render two <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});