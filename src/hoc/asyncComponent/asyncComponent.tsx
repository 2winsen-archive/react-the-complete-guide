import * as React from 'react';

interface State {
  component: any
}

const asyncComponent = (importComponent: any) => {
  return class extends React.Component<State, {}> {
    public state: State = {
      component: null
    }

    public componentDidMount() {
      importComponent()
        .then((cmp: any) => {
          this.setState({ component: cmp.default });
        });
    }

    public displayName() {
      return 'async(' + importComponent.displayName || importComponent.name + ')'
    }

    public render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;