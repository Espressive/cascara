import * as React from "react"
import * as System from "../../../ui"
import { ControlType, PropertyControls, addPropertyControls } from "framer"
import { withHOC } from "./withHOC"

const InnerHello = props => {
    return <System.Hello {...props}></System.Hello>
}

export const Hello = withHOC(InnerHello)

Hello.defaultProps = {
    width: 150,
    height: 50,
}

addPropertyControls(Hello, {})
