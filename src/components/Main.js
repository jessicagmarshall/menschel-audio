import React, { Component } from 'react'
import ReactTable from 'react-table'
import wavfile from './../audio/testfile1.wav'
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
      rowContent: {input: '', output: ''}
    }
    this.injectThProps = this.injectThProps.bind(this)
  }

  componentWillMount () {
    let startRow = this.getRandomInt(0, data.length)
    this.setState({rowIndex: startRow, rowContent: {input: data[startRow].input, output: data[startRow].output}})
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
        { this.state.rowIndex === 0
          ? <Sound url={wavfile}
            playStatus={Sound.status.PLAYING}
          />
          : null
        }
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
