import React, { Component } from 'react'
import Header from './components/header'
import NavbarT from './components/navbar'
import Contents from './components/contents'
import axios from 'axios'
import PaginationButton from './components/pagination'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // state for crud
      dataSantri: [],
      newDataSantri: [],
      value: '',
      postDataSantri: {
        id: '',
        name: '',
        studyProgram: ''
      },
      isUpdate: false,
      // State for pagination
      currentPage: 1,
      dataSantriPerPage: 5,
      dataSantriWithLimit: [],
      paginationNumbers: []
    }
  }

  // fitur CRUD
  componentDidMount () {
    this.onGetDataSantri()
  }

  onGetDataSantri =() => {
    axios.get('http://localhost:4000/posts?_sort=id&_order=desc')
      .then((result) => {
        this.setState({
          dataSantri: result.data
        }, () => {
          this.setPagination()
        })
      })
  }

  onHandleInput = (event) => {
    const NewPostDataSantri = { ...this.state.postDataSantri }
    NewPostDataSantri[event.target.name] = event.target.value
    const timeid = new Date().getTime()
    if (!this.state.isUpdate) {
      NewPostDataSantri.id = timeid
    }
    this.setState({
      postDataSantri: NewPostDataSantri
    })
  }

  onHandlePost = () => {
    axios.post('http://localhost:4000/posts ', this.state.postDataSantri)
      .then(() => {
        this.onGetDataSantri()
        this.setState({
          postDataSantri: {
            name: '',
            studyProgram: ''
          }
        })
      })
  }

  onHandleUpdate = () => {
    axios.put(`http://localhost:4000/posts/${this.state.postDataSantri.id}`, this.state.postDataSantri)
      .then(() => {
        this.onGetDataSantri()
        this.setState({
          postDataSantri: {
            id: '',
            name: '',
            studyProgram: ''
          }
        })
      })
  }

  onDataUpdate = (e) => {
    this.setState({
      postDataSantri: e,
      isUpdate: true
    })
  }

  onHandleDelete = (id) => {
    axios.delete(`http://localhost:4000/posts/${id}`)
      .then(() => {
        // console.log(res)
        this.onGetDataSantri()
      })
  }

  onSearchSantri = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      if (this.state.dataSantri) {
        const newDataSantri = this.state.dataSantri.filter(
          item => (
            item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
          )
        )
        this.setState({
          newDataSantri
        }, () => this.setPagination())
      }
    })
  }

  // FItur Pagination
  setPagination = () => {
    const { dataSantri, currentPage, dataSantriPerPage, value, newDataSantri } = this.state // destructuring assigments
    const lastIndexOfSantri = currentPage * dataSantriPerPage // menentukan nilai lastindex
    const firstIndexOfSantri = lastIndexOfSantri - dataSantriPerPage // menentukan nilai firstindex

    // menghitung jumlah seluruh data perPagenya
    const dataSantriWithLimit = value && newDataSantri.length // pengkondisian ternary
      ? newDataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)
      : value && !newDataSantri.length
        ? null
        : dataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)

    const paginationNumbers = [] // variabel penampung jumlah pagination yg dibutuhkan

    // MENGHITUNG seluruh datasantri yang ada.length
    const currentDataSantriLength = value && newDataSantri.length // pengkondisian ternary
      ? newDataSantri.length
      : value && !newDataSantri.length
        ? null
        : dataSantri.length

    // melooping hasil dari seluruh datasantri dibagi datasantriperpage(5) kemudian dibulatkan
    for (let i = 1; i <= Math.ceil(currentDataSantriLength / dataSantriPerPage); i++) {
      // hasil looping dipush / disimpan kedalam variabel paginationNumbers yg digunakan untuk menghitung jumlah paginationya
      paginationNumbers.push(i)
    }

    this.setState({
      dataSantriWithLimit, // merubah this.state.dataSantriWithLimit menjadi (variabel) dataSantriWithLimit
      paginationNumbers // merubah this.state.paginationNumbers menjadi (variabel) paginationNumbers
    })
  }

  onMovePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    }, () => this.setPagination())
  }

  onPreviousPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage > 1
        ? prevState.currentPage - 1
        : prevState.currentPage
    }), () => this.setPagination())
  }

  onNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage < this.state.paginationNumbers.length
        ? prevState.currentPage + 1
        : prevState.currentPage
    }), () => this.setPagination())
  }

  // getIdUser = (event) => {
  //   this.setState(prevState => ({
  //     ...prevState.postDataSantri,
  //     postDataSantri: {
  //       id: event
  //     }
  //   }))
  // }

  render () {
    const { onHandleInput, onHandlePost, onHandleDelete, onHandleUpdate, onDataUpdate, onSearchSantri, onPreviousPage, onNextPage, onMovePage } = this
    const { postDataSantri, value, paginationNumbers, dataSantriWithLimit, currentPage } = this.state
    return (
      <div className='bg-info text-light pt-2 px-2' style={{ overflowY: 'hidden', minHeight: '100vh' }}>
        <Header />
        <NavbarT
          postDataSantri={postDataSantri}
          onHandleInput={onHandleInput}
          onHandlePost={onHandlePost}
          onSearchSantri={onSearchSantri}
        />
        <Contents
          newDataSantri={dataSantriWithLimit} // update pagination
          dataSantri={dataSantriWithLimit} // update for fitur pagination
          postDataSantri={postDataSantri}
          value={value}
          onDataUpdate={onDataUpdate}
          onHandleUpdate={onHandleUpdate}
          onHandleInput={onHandleInput}
          onHandleDelete={onHandleDelete}
        />

        <PaginationButton
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          currentPage={currentPage}
          paginationNumbers={paginationNumbers}
          onMovePage={onMovePage}
        />
        <div className='ml-3 mt-3'>
          Copyright 2020 <a href='' style={{ color: 'white', textDecoration: 'none' }}>Diko Mahendra</a>
        </div>
      </div>
    )
  }
}

export default App
