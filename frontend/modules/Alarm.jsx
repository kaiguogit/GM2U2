import React, {Component} from 'react';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';


const styles = {
  checkbox: {
    marginBottom: 0,
    float: 'left',
    maxWidth: '13%'
  },
  digits:{
    width: '400px'
  }
};
/* a function which performs zerofill on a numeric */
var paddy = function(n, p, c){
    var pad_char = (typeof c !== 'undefined' ? c : '0');
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
};

/* the default sounds for selection */
var bells = [
//    {type: 'audio/mpeg', path: 'mp3/ru-zhen-qu'},
    {type: 'audio/wav',  path: 'bell/70214__qlc__65bpm-piano-melody-0589.wav'},
    {type: 'audio/mpeg', path: 'bell/70002__qlc__240bpm-fractal-ramp-sonnet-track-1.mp3'},
    {type: 'audio/wav',  path: 'bell/70213__qlc__152bpm-osng.wav'},
    {type: 'audio/wav',  path: 'bell/70217__qlc__85bpm-zichus.wav'}
];

/* A clock component displaying the current time */
var Clock = React.createClass({
    getInitialState: function(){
        return {time: new Date(), id: 0};
    },
    componentDidMount: function(){
        var state = this.state;
        state.id = setInterval(function(){
            var state = this.state;
            state.time = new Date();
            this.setState(state);
        }.bind(this), 1000);
        this.setState(state);
    },
    componentWillUnmount: function(){
        clearInterval(this.state.id);
    },
    render: function(){
        return (
            <div className="center-align wall-clock">{$.format.date(this.state.time, 'HH:mm:ss')}</div>
        );
    }
});

/* A component for selecting and playing a sound */
var Bell = React.createClass({
    ring: function(){
        this.refs.audio.getDOMNode().load();
        this.refs.audio.getDOMNode().play();
    },
    getInitialState: function(){
        return this.props.bells[0];
    },
    handleChange: function(event){
        var state = this.state;
        var key = event.target.value;
        state = this.props.bells[key];
        this.setState(state);
    },
    handlePlay: function(){
        this.refs.audio.getDOMNode().load();
        this.refs.audio.getDOMNode().play();
    },
    handleStop: function(){
        this.refs.audio.getDOMNode().pause();
    },
    render: function(){
        var options = this.props.bells.map(function(bell, i){
            return (
                <option value={i} key={i} >{bell.path}</option>
            );
        });
        return (
            <div className="bell">
                <audio ref="audio" loop>
                    <source src={this.state.path} type={this.state.type} />
                    Your browser does not support the audio element.
                </audio>
                <div className="form-inline">
                    <select className="form-control" onChange={this.handleChange} >
                        {options}
                    </select>
                    <button className="btn btn-default" onClick={this.handlePlay}>Preview</button>
                    <button className="btn btn-danger" onClick={this.handleStop}>Stop</button>
                </div>
            </div>
        );
    }
});

/* A single alarm record */
var AlarmEntry = React.createClass({
    enable: function(){
        var currentTime = new Date();
        var interval = this.props.time.getHours() * 3600 + this.props.time.getMinutes() * 60 + this.props.time.getSeconds();
        interval -= currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
        interval *= 1000;

        if(interval < 0)
            interval += 86000 * 1000;

        var id = window.setTimeout(function() {
            this.setState($.extend(this.state, {enable: false}));
            this.props.onRing();
            this.disable();
        }.bind(this), interval);

        var state = this.state;
        state.intervalId = id;
        console.log("Set alarm at", this.props.time);
        console.log("interval id is", id);
        this.setState(state);
    },
    disable: function(){
        var state = this.state;
        window.clearTimeout(state.intervalId);
        state.intervalId = 0;
        this.setState(state);
    },
    handleToggle: function (event) {
        var state = this.state;
        state.enable = event.target.checked;
        this.setState(state);

        this.handleSwitch();
    },
    handleSwitch: function(){
        if(this.state.enable && this.state.intervalId == 0)
            this.enable();
        else if(!this.state.enable && this.state.intervalId != 0)
            this.disable();
    },
    getInitialState: function(){
        return {time: this.props.time, comment: this.props.comment, enable: true, intervalId: 0};
    },
    getDefaultProps: function () {
        return {
            onRing: function(){},
            onClose: function(){},
            enable: true,
            comment: '',
            time: new Date()
        };
    },
    componentDidMount: function(){
        this.handleSwitch();
    },
    componentWillUnmount: function(){
        clearTimeout(this.state.intervalId);
    },
    render: function(){
        return (
            <div className="row">
            <ListItem 
              className="col s10"
              primaryText={$.format.date(this.state.time, 'HH:mm:ss') + " " + this.state.comment}
              rightToggle={<Toggle toggled={this.state.enable} onToggle={this.handleToggle}/>}/>
              <div className="col s2 valign-wrapper">
                <FloatingActionButton 

                  mini={true} onTouchTap={this.props.onClose}>
                  <ContentClear />
                </FloatingActionButton>
              </div>  
            </div>
        );
    }
});

/* Alarm list */
var AlarmList = React.createClass({
    getInitialState: function(){

        //Use slice() here to create a new array with same data, new pointer
        //This acheived to save a local copy of props.alarms array
        return {alarms: this.props.alarms.slice()};
    },

    updateState: function(){
        this.setState({alarms: this.props.alarms.slice()});
    },
    
    handleEntryClose: function(index){
        var state = this.state;
        state.alarms.splice(index, 1);
        this.setState(state);
    },
    handleAddEntry: function(entry){
        var state = this.state;
        state.alarms.push(entry);
        this.setState(state);
    },
    render: function () {
        console.log("rendering alarm list");
        console.log("Alarm list updated state");
        console.log("Alarm list updated state, this is", this);
        console.log("Alarm list alarms is", this.state.alarms);
        console.log("Alarm list props alarms is", this.props.alarms);
        var alarmNodes = this.state.alarms.map(function(alarm, i){
            var time = new Date(alarm.time)
            if(alarm === undefined) return undefined;
            return (
                <AlarmEntry time={time} comment={alarm.comment} onClose={this.handleEntryClose.bind(this, i)} key={i} onRing={this.props.onRing} />
            );
        }.bind(this));

        var list = function(){
            if(this.state.alarms.length == 0) {
                return (<span className="list-group-item">None</span>);
            }
            else
            {
                return alarmNodes;
            }
        }.bind(this);

        return (
            <List className="alarmList">
              {list()}
            </List>
            
        );
    }
});

/* A component for selecting a number */
var AlarmDigit = React.createClass({
    getInterval: function(counter){
        if(counter > 5)
            return 75;
        else if(counter > 20)
            return 50;
        else if(counter > 30)
            return 5;
        else
            return 150;
    },
    getInitialState: function(){
        var val = typeof this.props.val !== 'undefined' ? this.props.val : 0;
        return {value: val, increasing: 0, decreasing: 0, increaseCounter: 0, decreaseCounter: 0};
    },
    handleCarry: function(){
        this.handleIncrease(true);
    },
    handleBorrow: function(){
        this.handleDecrease(true);
    },
    handleIncrease: function(once){
        var state = this.state;
        state.value ++;
        state.increaseCounter ++;
        if(state.value >= this.props.numberSystem)
        {
            if(typeof this.props.onCarry === 'function')
                this.props.onCarry();
            state.value = 0;
        }

        if(once !== true)
            state.increasing = setTimeout(this.handleIncrease, this.getInterval(this.state.increaseCounter));
        this.setState(state);
    },
    handleStartIncrease: function(){
        var state = this.state;
        state.increaseCounter = 0;
        this.setState(state);
        this.handleIncrease();
    },
    handleStopIncrease: function(){
        var state = this.state;
        clearTimeout(state.increasing);
        this.setState(state);
    },
    handleDecrease: function(once){
        var state = this.state;
        state.value --;
        state.decreaseCounter ++;
        if(state.value < 0)
        {
            if(typeof this.props.onBorrow === 'function')
                this.props.onBorrow();
            state.value = this.props.numberSystem - 1;
        }
        if(once !== true)
            state.decreasing = setTimeout(this.handleDecrease, this.getInterval(this.state.decreaseCounter));
        this.setState(state);
    },
    handleStartDecrease: function(){
        var state = this.state;
        state.decreasing = true;
        state.decreaseCounter = 0;
        this.setState(state);
        this.handleDecrease();
    },
    handleStopDecrease: function(){
        var state = this.state;
        clearTimeout(state.decreasing)
        this.setState(state);
    },
    handleChange: function(event){
        var value = event.target.value.slice(-2);
        if(value >= this.props.numberSystem)
            value = event.target.value.slice(-1);
        console.log(value);
        this.setState($.extend(this.state, {value: value}));
    },
    handleKeyDown: function(event){
        if(event.keyCode == 38) {
            this.handleIncrease(true);
        }

        if(event.keyCode == 40) {
            this.handleDecrease(true);
        }
    },
    handleWheel: function(event){
        event.preventDefault();
        if(event.deltaY > 0){
            this.handleDecrease(true);
        }
        if(event.deltaY < 0){
            this.handleIncrease(true);
        }
    },
    render: function(){
        console.log("Rendering Alarms.");
        var value = paddy(this.state.value, 2);
        return (
            <div className="col s4 alarmDigit alarm-digit">
                <FlatButton onMouseDown={this.handleStartIncrease} onMouseUp={this.handleStopIncrease}><ArrowUp/></FlatButton>
                  <input className="form-control center-align" type="text" value={value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onWheel={this.handleWheel}/>
                <FlatButton onMouseDown={this.handleStartDecrease} onMouseUp={this.handleStopDecrease}><ArrowDown/></FlatButton>
            </div>
        );
    }
});

/* main component */
var Alarm = React.createClass({
    handleCarry: function(digit){
        this.refs[digit].handleCarry();
    },
    handleBorrow: function(digit){
        this.refs[digit].handleBorrow();
    },
    handleRing: function(){
        console.log("in handle ring, this is", this);
        this.props.onRing();
    },
    handleAddAlarm: function(){
        var date = new Date();
        date.setHours(this.refs.hourDigit.state.value);
        date.setMinutes(this.refs.minuteDigit.state.value);
        date.setSeconds(this.refs.secondDigit.state.value);
        this.refs.alarmList.handleAddEntry({time: date, comment: this.refs.comment.value });
    },
    render: function(){ 
        var date = new Date();
        console.log("rendering alarm");
        console.log("Alarm updated state");
        console.log("Alarm updated state, this is", this);
        console.log("Alarm props alarms is", this.props.alarms);
        return (
            <div className="alarm">
                <Clock />
                <div className="alarm-container">
                    <div className="row alarm-digits" style={styles.digits}>
                        <AlarmDigit numberSystem={24} val={date.getHours()} ref="hourDigit"/>
                        <AlarmDigit numberSystem={60} val={date.getMinutes()} onCarry={this.handleCarry.bind(this, 'hourDigit')} onBorrow={this.handleBorrow.bind(this, 'hourDigit')} ref="minuteDigit"/>
                        <AlarmDigit numberSystem={60} val={date.getSeconds()} onCarry={this.handleCarry.bind(this, 'minuteDigit')} onBorrow={this.handleBorrow.bind(this, 'minuteDigit')} ref="secondDigit"/>
                    </div>
                    <div className="form-inline center-align comment">
                        <input className="form-control" type="text" ref="comment" placeholder="Leave your comment..." ref="comment"/>
                        <FloatingActionButton mini={true} onTouchTap={this.handleAddAlarm}>
                          <ContentAdd />
                        </FloatingActionButton>
                        <div>
                            <Checkbox
                                  label="Sun"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                            <Checkbox
                                  label="Mon"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                            <Checkbox
                                  label="Tue"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                            <Checkbox
                                  label="Wed"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                            <Checkbox
                                  label="Thu"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                            <Checkbox
                                  label="Fri"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                            <Checkbox
                                  label="Sta"
                                  defaultChecked={true}
                                  style={styles.checkbox}
                                />
                        </div>
                    </div>
                    <p>Alarms</p>
                    <AlarmList alarms={this.props.alarms} ref="alarmList" onRing={this.handleRing}/>
                </div>
            </div>
        );
    }
});
export default Alarm;