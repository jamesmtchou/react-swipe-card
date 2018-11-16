import React, { Component, createRef } from 'react'
import Hammer from 'hammerjs'
import SimpleCard from './SimpleCard'
import { translate3d } from './utils'

const SWIPE_PERCENTAGE = 0.5;

class DraggableCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      initialPosition: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
      animation: null,
      pristine: true
    }
    this.resetPosition = this.resetPosition.bind(this)
    this.handlePan = this.handlePan.bind(this)
    this.card = createRef();
  }
  resetPosition () {
    const { x, y } = this.props.containerSize
    const { current } = this.card;
    if (!current) return;

    const initialPosition = {
      x: Math.round((x - current.offsetWidth) / 2),
      y: Math.round((y - current.offsetHeight) / 2)
    }

    this.setState({
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition: initialPosition,
      startPosition: { x: 0, y: 0 }
    })
  }
  
  panstart () {
    const { x, y } = this.state
    this.setState({
      animation: false,
      startPosition: { x, y },
      pristine: false
    })
  }
  panend (ev) {
    const screen = this.props.containerSize
    const { current } = this.card;
    if (!current) return;

    const getDirection = () => {
      const { offsetWidth, offsetHeight } = current;
      const adjustedWidth = offsetWidth * SWIPE_PERCENTAGE;
      const adjustedHeight = offsetHeight * SWIPE_PERCENTAGE;
      switch (true) {
        case (this.state.x + adjustedWidth < 0): return 'Left'
        case (this.state.x + adjustedWidth > screen.x): return 'Right'
        case (this.state.y + adjustedHeight < 0): return 'Top'
        case (this.state.y + adjustedHeight > screen.y): return 'Bottom'
        default: return false
      }
    }
    const direction = getDirection()

    if (this.props[`onSwipe${direction}`]) {
      this.props[`onSwipe${direction}`]()
      this.props[`onOutScreen${direction}`](this.props.index)
    } else {
      this.resetPosition()
      this.setState({ animation: true })
    }

  }
  panmove (ev) {
    this.setState(this.calculatePosition( ev.deltaX, ev.deltaY ))
  }
  pancancel (ev) {
    console.log(ev.type)
  }

  handlePan (ev) {
    ev.preventDefault()
    this[ev.type](ev)
    return false
  }

  handleSwipe (ev) {
    console.log(ev.type)
  }

  calculatePosition (deltaX, deltaY) {
    const { initialPosition : { x, y } } = this.state
    return {
      x: (x + deltaX),
      y: (y + deltaY)
    }
  }
  componentDidMount () {
    this.hammer = new Hammer.Manager(this.card.current)
    this.hammer.add(new Hammer.Pan({ threshold: 2 }))
    
    this.hammer.on('panstart panend pancancel panmove', this.handlePan)
    this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe)

    this.resetPosition()
    window.addEventListener('resize', this.resetPosition)
  }

  componentDidUpdate({ containerSize: { x: prevX, y: prevY } }) {
    const { containerSize: { x, y } } = this.props;
    if (prevX !== x || prevY !== y) {
      this.resetPosition();
    }
  }
  componentWillUnmount () {
    if (this.hammer) {
      this.hammer.stop()
      this.hammer.destroy()
      this.hammer = null
    }
    window.removeEventListener('resize', this.resetPosition)
  }
  render () {
    const { x, y, animation, pristine } = this.state
    const style = translate3d(x, y)
    return <SimpleCard {...this.props} ref={this.card} style={style} className={animation ? 'animate' : pristine ? 'inactive' : '' } />
  }
}

export default DraggableCard
