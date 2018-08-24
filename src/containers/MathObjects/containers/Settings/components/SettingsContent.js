// @flow
import * as React from 'react'
import styled from 'styled-components'
import { MathInputRHS } from 'containers/MathObjects/containers/MathInput'
import { Input, Switch } from 'antd'

type InputType = 'text' | 'boolean' | 'math'

export type FormRow = {
  inputType: InputType,
  property: string,
  label: string
}

// TODO: don't use any
type Props = {
  parentId: string,
  data: any,
  settingsList: Array<FormRow>,
  setProperty: (property: string, value: any) => void
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
  grid-gap: 10px;
`

const Label = styled.span`
  color: ${props => props.theme.gray[6]};
  justify-self: end;
`

const switchStyle = { width: 40 }

export default class SettingsContent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props)
    // $FlowFixMe
    this.renderRow = this.renderRow.bind(this)
    // $FlowFixMe
    this.renderInput = this.renderInput.bind(this)
  }

  renderRow(formRow: FormRow) {
    const { property, label, inputType } = formRow

    return (
      <React.Fragment key={property}>
        <Label>{label}</Label>
        {this.renderInput(property, inputType)}
      </React.Fragment>
    )
  }

  renderInput(property: string, inputType: InputType) {
    switch (inputType) {

      case 'text': {
        return (
          <Input
            value={this.props.data[property]}
            onChange={event => this.props.setProperty(property, event.target.value)}
          />
        )
      }
      case 'boolean': {
        return (
          <Switch
            style={switchStyle}
            checked={this.props.data[property]}
            onChange={value => this.props.setProperty(property, value)}
          />
        )
      }
      case 'math': {
        return (
          <MathInputRHS
            size='small'
            parentId={this.props.parentId}
            field={property}
          />
        )
      }
      default: {
        throw Error(`Settings inputType: ${inputType} not recognized`)
      }

    }

  }

  render() {
    return (
      <Grid>
        {this.props.settingsList.map(this.renderRow)}
      </Grid>
    )
  }

}