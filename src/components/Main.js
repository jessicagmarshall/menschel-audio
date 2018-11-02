import React, { Component } from 'react'
import ReactTable from 'react-table'
import Sound from 'react-sound'
import 'react-table/react-table.css'

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

class Main extends Component {
  constructor () {
    super()
    this.state = {
      rowContent: {input: '', output: ''},
      audio: ''
    }
    this.injectThProps = this.injectThProps.bind(this)
    this.generateSet = this.generateSet.bind(this)
  }

  componentWillMount () {
    this.generateSet()
  }

  generateSet (input) {
    let nextRow
    input === undefined
      ? nextRow = this.getRandomInt(0, data.length)
      : nextRow = input
    this.setState({rowIndex: nextRow, rowContent: {input: data[nextRow].input, output: data[nextRow].output}, audio: 'http://localhost:3003/audio?id=' + nextRow})
  }

  getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  injectThProps (state, rowInfo, column) {
    return {
      style: { display: 'none' }
    }
  }

  render () {
    return (
      <div>
        <Sound url={this.state.audio}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.generateSet}
        />
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
                  this.generateSet(rowInfo.index)
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
