class Mutation {
    constructor(reducer) {
        this.reducer = reducer
    }

    reduce() {
        return this.reducer()
    }
}

export default Mutation
