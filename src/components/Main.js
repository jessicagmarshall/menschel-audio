import React, { Component } from 'react'
import ReactTable from 'react-table'
import Sound from 'react-sound'
import 'react-table/react-table.css'
import data from '../data/data'

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
      rowContent: {input: '', output: '', id: ''},
      audio: '',
      paused: false,
      tagList: [0, 1, 2, 3, 4, 5] // eventually replace this with yonatan's actual tags
    }
    this.injectThProps = this.injectThProps.bind(this)
    this.generateSet = this.generateSet.bind(this)
    this.togglePaused = this.togglePaused.bind(this)
  }

  componentWillMount () {
    this.generateSet()
  }

  generateSet (input) {
    let nextRow
    input === undefined
      ? nextRow = this.getNextIndex()
      : nextRow = input
    this.setState({rowIndex: nextRow,
      rowContent: {input: data[nextRow].input, output: data[nextRow].output, id: data[nextRow].audio},
      audioUrl: 'http://localhost:3003/audio?id=' + nextRow
    })
  }

  getNextIndex () {
    let indexArray = []
    let outputTag
    this.state.rowContent.output === ''
      ? outputTag = this.state.tagList[this.getRandomInt(0, this.state.tagList.length)]
      : outputTag = this.state.rowContent.output
    for (let i = 0; i < data.length; i++) {
      if (data[i].input === outputTag) {
        indexArray.push(i)
      }
    }
    let nextIndex = this.getRandomInt(0, indexArray.length)
    return indexArray[nextIndex]
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

  togglePaused () {
    this.state.paused
      ? this.setState({paused: false})
      : this.setState({paused: true})
  }

  render () {
    return (
      <div>
        <Sound url={this.state.audioUrl}
          playStatus={this.state.paused ? Sound.status.PAUSED : Sound.status.PLAYING}
          onFinishedPlaying={this.generateSet}
        />
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          sortable={false}
          loadingText={null}
          defaultPageSize={data.length + 2}
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
            output: this.state.rowContent.output,
            audio: this.state.rowContent.id
          }]}
          columns={columns}
          getTheadThProps={this.injectThProps}
          showPagination={false}
          sortable={false}
          minRows={1}
          loadingText={null}
          style={{position: 'fixed', width: '100%', backgroundColor: 'yellow', bottom: 0, height: 60}}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                this.togglePaused()
              }
            }
          }}
        />
      </div>
    )
  }
}

export default Main
