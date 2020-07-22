import React, {Component} from "react"
import "./App.css"

class Footer extends Component {
    constructor() {
        super()
        this.state = {
            footer: "Test01"
        }
    }
    render () {
        return(<footer><p>{this.state.footer}</p></footer>)
    }
}

export default Footer