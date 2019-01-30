import Slim from 'slim-store'
import React, { Component } from 'react';

const {createStore, use, on, emit, off} = Slim
const RSlimContext = React.createContext();
let _rootComponent

use({
    init(store) {
        Slim.on('__SLIM_DEVTOOL_ANSWER__', (state) => {
            store.dispatch('__SLIM_DEVTOOL_SET__', state)
        })
    },
    after(state) {
        if (_rootComponent) {
            _rootComponent.setState({
                state: state
            })
        }
    }
})

const RSlim = {
    createStore,
    use,
    on,
    emit,
    off
}

export class RSlimProvider extends Component {
    constructor(props) {
        super(props);
        _rootComponent = this

        const { store } = this.props;

        this.state = {
            store: store,
            state: JSON.parse(JSON.stringify(store.state)),
            computed: store.getters
        }
    }

    render() {
        const { children } = this.props;

        return (
          <RSlimContext.Provider
            value={{
                $store: this.state.store,
                $state: this.state.state,
                $cpt: this.state.computed
            }}
          >
              {children}
          </RSlimContext.Provider>
        );
    }
}

export const RSlimConsumer = RSlimContext.Consumer;

export default RSlim
