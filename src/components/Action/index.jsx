import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Form,
  Input,
  NavItem,
  Nav
} from 'reactstrap'

const ActionButton = (props) => {
  return (
    <Button
      color={props.color}
      onClick={props.onClick}
      className={props.className}
      outline={props.outline}
    >
      {props.tittle}
    </Button>
  )
}

class ActionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  onToggle = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render () {
    return (
      <Modal
        isOpen={this.state.showModal}
        toggle={this.toggleModal}
      >
        {this.ActionHeader()}
        {this.ActionBody()}
        {this.ActionFooter()}

      </Modal>
    )
  }

  ActionHeader () {
    return (
      <ModalHeader>
        {this.props.titleHeader}
      </ModalHeader>
    )
  }

  ActionBody () {
    return (
      <ModalBody className={this.props.classNameBody}>
        <Form>
          {this.props.inputDataModal.map((item, index) => {
            return (
              <ActionGroupInput
                key={index}
                {...item}
              />
            )
          })}
        </Form>
      </ModalBody>
    )
  }

  ActionGroupInput (props) {
    return (
      <FormGroup>
        <Label for={props.name}>{props.tittleInput}</Label>
        <ActionInput {...props} />
      </FormGroup>
    )
  }

  ActionFooter () {
    return (
      <ModalFooter>
        {this.props.inputDataButtonModal.map((item, index) => {
          return (
            <ActionButton
              key={index}
              tittle={item.tittle}
              color={item.color}
              outline={item.outline}
              onClick={() => {
                item.onClick()
                this.onToggle()
              }}
            />
          )
        })}
      </ModalFooter>
    )
  }
}
const ActionGroupInput = (props) => {
  return (
    <FormGroup>
      <Label for={props.name}>{props.tittleInput}</Label>
      <ActionInput {...props} />
    </FormGroup>
  )
}
const ActionInput = (props) => {
  return (
    <Input
      type={props.type}
      name={props.name}
      className={props.className}
      id={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  )
}

const ActionCollapse = (props) => {
  const search = {
    className: 'form-control mr-sm-2',
    type: 'search',
    placeholder: 'Search',
    onChange: (e) => props.onSearchSantri(e)
  }
  return (
    <Nav className='ml-auto' navbar>
      <NavItem>
        <ActionInput {...search} />
      </NavItem>
    </Nav>
  )
}

const ActionThead = () => {
  return (
    <thead>
      <tr>
        <th className='col-lg-3' scope='col'>ID</th>
        <th className='col-lg-3' scope='col'>Nama</th>
        <th className='col-lg-3' scope='col'>Jurusan</th>
        <th className='col-lg-3 text-center' scope='col'>Action</th>
      </tr>
    </thead>
  )
}

ActionButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  tittle: PropTypes.string,
  className: PropTypes.string,
  outline: PropTypes.bool
}

ActionButton.defaultProps = {
  className: '',
  tittle: 'Ada yang salah propsnya',
  color: 'success',
  outline: false
}

ActionModal.propTypes = {
  isOpen: PropTypes.bool,
  inputName: PropTypes.string,
  inputStudy: PropTypes.string,
  tittleName: PropTypes.string,
  tittleStudy: PropTypes.string,
  tittleHeader: PropTypes.string,
  className: PropTypes.string,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandlePost: PropTypes.func,
  toggleModal: PropTypes.func,
  titleHeader: PropTypes.string,
  colorButtonLeft: PropTypes.string,
  colorButtonRight: PropTypes.string,
  titleButton: PropTypes.string,
  onClick: PropTypes.func
}

ActionGroupInput.propTypes = {
  name: PropTypes.string,
  tittleInput: PropTypes.string
}
ActionInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}
ActionCollapse.propTypes = {
  onSearchSantri: PropTypes.func,
  isOpen: PropTypes.bool
}

export {
  ActionButton,
  ActionInput,
  ActionModal,
  ActionCollapse,
  ActionGroupInput,
  ActionThead
}
