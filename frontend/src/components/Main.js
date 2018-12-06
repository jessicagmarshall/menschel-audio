/* global fetch */

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
      tagList: [
        'TECHNO-POLITICS',
        'ACCESSABILITY',
        '(DE)CENTRALIZATION',
        'MESH TECHNOLOGY',
        'SPANISH POLITICS',
        'GOVERNANCE'],
      rowBlue: false,
      flashingTime: 10, // how many seconds before the end should the bottom bar begin flashing
      numFlashes: 0,
      isFlashing: false,
      nextRow: '',
      bgrnd: 'white'
    }
    this.injectThProps = this.injectThProps.bind(this)
    this.generateSet = this.generateSet.bind(this)
    // this.togglePaused = this.togglePaused.bind(this)
    this.flashBar = this.flashBar.bind(this)
  }

  componentWillMount () {
    if (typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1) {
      this.setState({bgrnd: 'black'})
    }
    this.generateSet()
  }

  generateSet (input) {
    if (this.state.audioUrl !== '') {
      this.setState({audioUrl: ''})
    }
    let nextRow, outcome
    this.state.rowContent.id === ''
      ? console.log('randomly generate an input tag for the first audio file')
      : console.log('end of audio file', this.state.rowContent.id, 'with output tag', this.state.rowContent.output)
    // setTimeout(async () => {
    outcome = this.getNextIndex()
    input === undefined
      // there is a console.log in this.getNextIndex
      ? nextRow = outcome[0]
      : nextRow = input
    // setTimeout(() => {
    console.log('collecting all audio files with input tag', data[nextRow].input, ':', outcome[1])
    // setTimeout(() => {
    console.log('randomly select audio file', data[nextRow].audio, 'from list of files with input tag', data[nextRow].input, 'and fetch it from the server')
    fetch('http://server.local:3003/audioDuration?id=' + data[nextRow].audio)
    // fetch('http://localhost:3003/audioDuration?id=' + nextRow)
      .then(res => {
        console.log(res)
        res.json()
          .then(res => {
            // setTimeout(() => {
            console.log('start playing clip', data[nextRow].audio)
            this.setState({
              duration: res.duration,
              rowIndex: nextRow,
              rowContent: {input: data[nextRow].input, output: data[nextRow].output, id: data[nextRow].audio},
              audioUrl: 'http://server.local:3003/audio?id=' + data[nextRow].audio
              // audioUrl: 'http://localhost:3003/audio?id=' + nextRow
            })
            // begin flashing this.state.flashingTime seconds before the end of the sound clip
            this.flashbarTimeout = setTimeout(
              this.flashBar
              , 1000 * (this.state.duration - this.state.flashingTime))
            // }, 4000)
          })
      })
      // }, 6000)
      // }, 4000)
    // }, 4000)
  }

  getNextIndex () {
    let indexArray = []
    let audioArray = []
    let outputTag
    let nextIndex
    this.state.rowContent.output === ''
      ? outputTag = this.state.tagList[this.getRandomInt(0, this.state.tagList.length)]
      : outputTag = this.state.rowContent.output
    for (let i = 0; i < data.length; i++) {
      if (data[i].input === outputTag) {
        indexArray.push(i)
        audioArray.push(data[i].audio)
      }
    }
    console.log('next input tag is', outputTag)
    nextIndex = this.getRandomInt(0, indexArray.length)
    return [indexArray[nextIndex], audioArray]
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

  // togglePaused () {
  //   this.state.paused
  //     ? this.setState({paused: false})
  //     : this.setState({paused: true})
  // }

  flashBar () {
    this.setState({rowBlue: !this.state.rowBlue, numFlashes: this.state.numFlashes + 1, isFlashing: true})
    let flashDuration
    if (this.state.numFlashes < 35) {
      this.state.numFlashes < 9
        ? flashDuration = this.state.flashingTime / 20 // 8 flashes at 1/20 of the time
        : this.state.numFlashes < 25
          ? flashDuration = this.state.flashingTime / 40 // 16 flashes at 1/40 of the time
          : flashDuration = this.state.flashingTime / 80 // 10 flashes at 1/80 of the time
      setTimeout(
        this.flashBar
        ,
        1000 * flashDuration
      )
    } else {
      setTimeout(() => {
        this.setState({numFlashes: 0, rowBlue: !this.state.rowBlue})
      }, 1000 * this.state.flashingTime / 80)
      this.setState({isFlashing: false})
      this.generateSet()
    }
  }

  render () {
    return (
      <div>
        {
          this.state.bgrnd === 'black'
            ? <p style={{backgroundColor: 'black', color: 'white', textAlign: 'center'}}>
               What you are seeing is a simulation. To hear sound, please proceed to a station.
            </p>
            : null
        }
        <Sound url={this.state.audioUrl || ''}
          playStatus={this.state.paused ? Sound.status.PAUSED : Sound.status.PLAYING}
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
                  if (!this.state.isFlashing) {
                    clearTimeout(this.flashbarTimeout)
                    this.generateSet(rowInfo.index)
                  }
                },
                style: {
                  background: rowInfo.index !== this.state.rowIndex ? 'white' : this.state.rowBlue ? 'purple' : 'yellow',
                  color: rowInfo.index !== this.state.rowIndex ? 'black' : this.state.rowBlue ? 'white' : 'black'
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
          style={{
            position: 'fixed',
            width: '100%',
            backgroundColor: this.state.rowBlue ? 'purple' : 'yellow',
            color: this.state.rowBlue ? 'white' : 'black',
            bottom: 0,
            height: 60}}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                // this.togglePaused()
              }
            }
          }}
        />
      </div>
    )
  }
}

export default Main
