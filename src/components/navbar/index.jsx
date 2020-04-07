import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarToggler, Collapse } from 'reactstrap'
import { ActionButton, ActionModal, ActionCollapse } from '../Action'

class NavbarSantri extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCollapse: false
    }
  }

  onToggle = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  onToggleCollapse = () => {
    this.setState({
      showCollapse: !this.state.showCollapse
    })
  }

  render () {
    const actionButton = {
      color: 'info',
      onClick: () => this.actionModal.onToggle(),
      tittle: 'Tambah Santri'
    }
    const actionCollapse = {
      onSearchSantri: this.props.onSearchSantri,
      isOpen: this.state.showCollapse
    }
    const inputDataButtonModal = [
      {
        tittle: 'Simpan',
        color: 'info',
        outline: false,
        onClick: this.props.onHandlePost
      },
      {
        tittle: 'Batal',
        color: 'secondary',
        outline: true,
        onClick: () => {}
      }
    ]
    const inputDataModal = [
      {
        tittleInput: 'Nama Santri',
        label: 'Nama Santri',
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: 'masukkan nama',
        value: this.props.postDataSantri.name,
        onChange: this.props.onHandleInput
      },
      {
        tittleInput: 'Jurusan',
        label: 'Jurusan',
        type: 'text',
        name: 'studyProgram',
        id: 'studyProgram',
        placeholder: 'masukkan jurusan',
        value: this.props.postDataSantri.studyProgram,
        onChange: this.props.onHandleInput
      }
    ]
    return (
      <div className='continer'>
        <Navbar
          color='light'
          light
          expand='md'
          className='rounded'
        >
          <ActionButton {...actionButton} />
          <ActionModal
            inputDataModal={inputDataModal}
            ref={ref => { this.actionModal = ref }}
            titleHeader=' Tambah Santri'
            postDataSantri={this.props.postDataSantri}
            onHandleInput={this.props.onHandleInput}
            onHandlePost={this.props.onHandlePost}
            inputDataButtonModal={inputDataButtonModal}
          />
          <NavbarToggler onClick={() => this.onToggleCollapse()} />
          <Collapse isOpen={this.state.showCollapse} navbar>
            <ActionCollapse {...actionCollapse} />
          </Collapse>

        </Navbar>
      </div>
    )
  }
}

NavbarSantri.propTypes = {
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandlePost: PropTypes.func,
  onSearchSantri: PropTypes.func
}
export default NavbarSantri
