import * as React from "react"
import * as System from "../../../ui"
import { ControlType, PropertyControls, addPropertyControls } from "framer"
import { withHOC } from "./withHOC"

const InnerEspButton = props => {
    return <System.EspButton {...props}></System.EspButton>
}

export const EspButton = withHOC(InnerEspButton)

EspButton.defaultProps = {
    width: 150,
    height: 50,
}

addPropertyControls(EspButton, {})
