import React, { Component, createRef } from 'react';

import { Container } from './container';

import './css/style.css';
import './css/align.css';

export class WhiteBoard extends Component {
  state = {
    size: 3,
  };
  canvas = createRef();
  text = '';
  startX;
  startY;
  isPainting = false;
  activeCursor = 'pencil';
  userStrokeStyle = 'black';
  line = [];
  prevPos = { offsetX: 0, offsetY: 0 };

  componentDidMount() {
    this.canvas.current.width = window.innerWidth;
    this.canvas.current.height = window.innerHeight;
    this.ctx = this.canvas.current.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 3;
    const self = this;
    window.addEventListener('keyup', function (e) {
      if (self.activeCursor === 'text') {
        if (e.keyCode === 13) {
          self.drawText(self.text);
        }
      }
    })
  }

  onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
    if (this.activeCursor === 'text') {
      this.setState({
        openModal: true
      });
    }
  };

  onMouseMove = ({ nativeEvent }) => {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
    }
  };

  endPaintEvent = ({ nativeEvent }) => {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
      this.ctx.closePath();
    }
  };

  paint = (prevPos, currPos, strokeStyle) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;

    this.ctx.globalCompositeOperation = 'source-over';
    this.switchPaint(x, y, offsetX, offsetY);
  };

  switchPaint = (x, y, offsetX, offsetY) => {
    const width = offsetX - this.startX;
    const height = offsetY - this.startY;
    const midX = (offsetX + this.startX) / 2;
    const midY = (offsetY + this.startY) / 2;
    switch (this.activeCursor) {
      case 'pencil':
        this.drawPencil(x, y, offsetX, offsetY);
        break;
      case 'straight-line':
        this.drawPencil(this.startX, this.startY, offsetX, offsetY, true);
        break;
      case 'rect':
      case 'rect-fill':
        this.ctx.rect(this.startX, this.startY, width, height);
        break;
      case 'circle':
      case 'circle-fill':
        this.ctx.ellipse(midX, midY, Math.abs(height), Math.abs(width), Math.PI / 2, 0, 2 * Math.PI);
        break;
      case 'erase':
        this.erase(x, y, offsetX, offsetY);
        break;
      case 'arrow':
        this.drawArrow(offsetX, offsetY);
        break;
      default:
        break;
    }
  };

  handleCloseModal = () => {
    this.setState({
      openModal: false,
    }, () => this.text = '');
  };

  drawText = (value) => {
    this.ctx.font = `${this.state.size * 2}px sans-serif`;
    this.ctx.fillText(value, this.startX, this.startY);
    this.handleCloseModal();
  }

  setText = e => {
    this.text = e.target.value;
  }

  drawPencil = (x, y, offsetX, offsetY, isStraightLine) => {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    if (!isStraightLine) this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  };

  drawArrow = (offsetX, offsetY) => {
    var headlen = 10;
    var angle = Math.atan2(offsetY - this.startY, offsetX - this.startX);
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.moveTo(offsetX, offsetY);
    this.ctx.lineTo(offsetX - headlen * Math.cos(angle - Math.PI / 7), offsetY - headlen * Math.sin(angle - Math.PI / 7));
    this.ctx.lineTo(offsetX - headlen * Math.cos(angle + Math.PI / 7), offsetY - headlen * Math.sin(angle + Math.PI / 7));
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.lineTo(offsetX - headlen * Math.cos(angle - Math.PI / 7), offsetY - headlen * Math.sin(angle - Math.PI / 7));
  };

  erase = (x, y, offsetX, offsetY) => {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.arc(offsetX, offsetY, this.state.size, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.lineWidth = 20;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { x, y };
  };

  sendPaintData = () => {
    this.line = [];
    this.ctx.stroke();
    if (this.activeCursor === 'rect-fill' || this.activeCursor === 'circle-fill') {
      this.ctx.fillStyle = this.userStrokeStyle;
      this.ctx.lineWidth = this.state.size;
      this.ctx.fill();

    }
  };

  changeActive = (value, size) => {
    this.activeCursor = value;
    this.setState({ size });
    this.ctx.lineWidth = size;
  };

  clearPaint = () => {
    this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
  };

  togglePopup = id => {
    var popup = document.getElementById(id);
    popup.classList.toggle("show");
  };

  handleChangeColor = (e) => {
    this.userStrokeStyle = this.activeCursor !== 'erase' ? e.target.value : this.userStrokeStyle;
  };

  decrement = () => {
    const { size } = this.state;
    if (size > 1)
      this.setState(prevState => ({
        size: prevState.size - 1
      }), () => this.ctx.lineWidth = this.state.size)
  };

  increment = () => {
    const { size } = this.state;
    if (size < 15)
      this.setState(prevState => ({
        size: prevState.size + 1
      }), () => this.ctx.lineWidth = this.state.size)
  };

  render() {
    return (
      <Container
        ref={this.canvas}
        {...this.state}
        startX={this.startX}
        startY={this.startY}
        increment={this.increment}
        decrement={this.decrement}
        userStrokeStyle={this.userStrokeStyle}
        activeCursor={this.activeCursor}
        setText={this.setText}
        handleCloseModal={this.handleCloseModal}
        handleChangeColor={this.handleChangeColor}
        changeActive={this.changeActive}
        togglePopup={this.togglePopup}
        clearPaint={this.clearPaint}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
        drawText={this.drawText}
      />
    );
  }
}
