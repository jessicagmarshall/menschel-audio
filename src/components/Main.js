import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      rowContent: {input: '', output: ''}
    }
    this.injectThProps = this.injectThProps.bind(this)
  }

  injectThProps (state, rowInfo, column) {
    return {
      style: { display: 'none' }
    }
  }

  render () {
    const data = [{
      input: 'socio-political motivation',
      output: 'domestic terrorism'
    }, {
      input: 'socio political motivation',
      output: 'techno-utopia'
    }, {
      input: 'lalala',
      output: 'dummy data'
    }, {
      input: 'dummy data',
      output: 'lalala'
    }, {
      input: 'socio political motivation',
      output: 'techno-utopia'
    }, {
      input: 'socio political motivation',
      output: 'techno-utopia'
    }, {
      input: 'socio political motivation',
      output: 'techno-utopia'
    }]

    const columns = [{
      Header: 'Input Tag',
      accessor: 'input'
    }, {
      Header: 'Output Tag',
      accessor: 'output'
    }, {
      Header: 'Audio ID',
      accessor: 'audio'
    }]

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          sortable={false}
          minRows={0}
          getTdProps={(state, rowInfo, column, instance) => {
            if (typeof rowInfo !== 'undefined') {
              return {
                onClick: (e, handleOriginal) => {
                  console.log(rowInfo.original)
                  this.setState({rowIndex: rowInfo.index, rowContent: rowInfo.original})
                },
                style: {
                  background: rowInfo.index === this.state.rowIndex ? 'yellow' : 'white'
                }
              }
            } else {
              return {}
            }
          }}
        />
        <ReactTable
          data={[{
            input: this.state.rowContent.input,
            output: this.state.rowContent.output
          }]}
          columns={columns}
          getTheadThProps={this.injectThProps}
          showPagination={false}
          sortable={false}
          minRows={0}
          style={{position: 'fixed', width: '100%', backgroundColor: 'yellow', bottom: 0, height: 35}}
        />
      </div>
    )
  }
}

export default Main
