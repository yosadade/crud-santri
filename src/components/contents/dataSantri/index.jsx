import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import { ActionButton, ActionModal } from '../../Action'

let isIdUser
const DataSantri = (props) => {
  const dataThead = (item, index) => {
    return [
      {
        className: 'col-lg-3',
        scope: 'col',
        tittle: 'ID'
      },
      {
        className: 'col-lg-3',
        scope: 'col',
        tittle: 'Nama'
      },
      {
        className: 'col-lg-3',
        scope: 'col',
        tittle: 'Jurusan'
      },
      {
        className: 'col-lg-3 text-center',
        scope: 'col',
        tittle: 'Action'
      }
    ]
  }
  return (
    <Table style={{ color: 'white' }}>
      <Thead />
      <Tbody {...props} />
    </Table>
  )
}

const Thead = () => {
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

class Tbody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      identityModal: '',
      modalVisible: '',
      dataActionButton: [
        {
          tittle: 'Hapus',
          color: 'danger',
          className: 'mr-2',
          onClick: () => {}
        },
        {
          tittle: 'Ubah',
          color: 'warning',
          className: '',
          onClick: () => {}
        }
      ],
      dataEditModal: [],
      dataDeletModal: []
    }
  }

  render () {
    const EditModal = this.state.identityModal === 'Ubah'
    const DeleteModal = this.state.identityModal === 'Hapus'
    const titleHeader = EditModal
      ? 'Update Data Santri'
      : DeleteModal
        ? 'Yakin Hapus Data ini?'
        : ''
    const classNameBody = DeleteModal
      ? 'd-none'
      : ''
    const tittleButton = EditModal
      ? 'Edit'
      : DeleteModal
        ? 'Hapus'
        : ''
    const colorButtonLeft = EditModal
      ? 'info'
      : DeleteModal
        ? 'secondary'
        : ''
    const colorButtonRight = EditModal
      ? 'secondary'
      : DeleteModal
        ? 'info'
        : ''
    const onClick = EditModal
      ? () => {
        this.props.onHandleUpdate()
        this.actionModal.onToggle()
      }
      : DeleteModal
        ? () => {
          this.props.onHandleDelete(isIdUser)
          this.actionModal.onToggle()
        }
        : null
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
    const inputDataButtonModal = [
      {
        tittle: 'Ubah',
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
    const dataActionButton = [
      {
        tittle: 'Hapus',
        color: 'danger',
        className: 'mr-2',
        onClick: () => {
          this.setState({
            identityModal: 'Hapus'
          })
          this.actionModal.onToggle()
        }
      },
      {
        tittle: 'Ubah',
        color: 'warning',
        className: '',
        onClick: () => {
          this.setState({
            identityModal: 'Ubah'
          })
          this.actionModal.onToggle()
        }
      }
    ]
    return (
      <tbody>
        {renderDataSantri(this.props).map((item, id) => (
          <tr key={id}>
            <th className='col-3' scope='row'>{item.id}</th>
            <td className='col-3'>{item.name}</td>
            <td className='col-3'>{item.studyProgram}</td>
            <td className='col-3'>
              <div className='row justify-content-center'>
                {dataActionButton.map((itemBtn, index) => {
                  return (
                    <ActionButton
                      key={index}
                      tittle={itemBtn.tittle}
                      className={itemBtn.className}
                      color={itemBtn.color}
                      onClick={() => itemBtn.onClick()}
                    />
                  )
                })}
              </div>
            </td>
          </tr>
        ))}
        <ActionModal
          ref={ref => { this.actionModal = ref }}
          postDataSantri={this.props.postDataSantri}
          titleHeader={titleHeader}
          classNameBody={classNameBody}
          tittleButton={tittleButton}
          colorButtonLeft={colorButtonLeft}
          colorButtonRight={colorButtonRight}
          onHandleInput={this.props.onHandleInput}
          onClick={onClick}
          inputName='name'
          tittleName='Nama Santri'
          tittleStudy='Jurusan Santri'
          inputStudy='studyProgram'
          inputDataModal={inputDataModal}
          inputDataButtonModal={inputDataButtonModal}
        />
      </tbody>
    )
  }
}

const renderDataSantri = (props) => {
  return props.value
    ? props.newDataSantri
    : props.dataSantri
}

Tbody.propTypes = {
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onHandleInput: PropTypes.func,
  postDataSantri: PropTypes.object
}
export default DataSantri
