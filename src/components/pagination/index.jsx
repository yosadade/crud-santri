import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

class PaginationButton extends Component {
  render () {
    const prevButton = {
      onClick: this.props.onPreviousPage,
      disabled: this.props.currentPage <= 1,
      buttonTitle: 'Previous'
    }

    const nextButton = {
      onClick: this.props.onNextPage,
      disabled: this.props.currentPage === this.props.paginationNumbers.length,
      buttonTitle: 'Next'
    }

    return (
      <Pagination className='d-flex justify-content-end container-fluid pb-0 mb-0'>
        {this.renderActionButton(prevButton)}
        {this.renderPaginationButton()}
        {this.renderActionButton(nextButton)}
      </Pagination>
    )
  }

  renderActionButton = (props = { active: false, id: 'kosong', key: null }) => {
    return (
      <PaginationItem
        active={props.active}
        disabled={props.disabled}
        key={props.key}
      >
        <PaginationLink
          onClick={props.onClick}
          id={props.id}
        >
          {props.buttonTitle}
        </PaginationLink>
      </PaginationItem>
    )
  }

  renderPaginationButton = () => {
    return (
      this.props.paginationNumbers.map((item, index) => {
        const paginationNumber = {
          active: this.props.currentPage === item,
          id: item,
          onClick: (event) => this.props.onMovePage(event),
          buttonTitle: item,
          key: index
        }
        return this.renderActionButton(paginationNumber)
      })
    )
  }
}

PaginationButton.propTypes = {
  currentPage: PropTypes.number,
  onPreviousPage: PropTypes.func,
  paginationNumbers: PropTypes.array,
  onNextPage: PropTypes.func,
  onMovePage: PropTypes.func
}
export default PaginationButton
