// Entry point with ES6 support
// Happy Coding!
module.hot.accept();
//var jQuery = $ = require('jquery');
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import KanbanBoardContainer from './KanbanBoardContainer'
import KanbanBoard from './KanbanBoard'
import NewCard from './NewCard'
import EditCard from './EditCard'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


ReactDOM.render((
  <Router history={hashHistory}>
    <Route component={KanbanBoardContainer}>
      <Route path="/" component={KanbanBoard}>
        <Route path="new" component={NewCard} />
        <Route path="edit/:card_id" component={EditCard} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));

// (function Happy($) {
//   $.fn.isHappy = function isHappy(config) {
//     var fields = [], item;
//     var pauseMessages = false;
//     function  isFunction(obj) {
//       return typeof obj === 'function';
//     }
//
//     function defaultError(error) {
//         var msgErrorClass = config.classes && config.classes.message || 'unhappyMessage';
//         return $('<span id="'+error.id+'" class="'+msgErrorClass+'" role="alert">"'+error.message+'"</span>');
//     }
//
//     function getError(error) {
//       if(isFunction(config.errorTemplate)) {
//         return config.errorTemplate(error);
//       }
//
//       return defaultError(error);
//     }
//
//     function handleSubmit(e) {
//       var i, l;
//
//       var errors = false;
//       if(config.testMode) {
//         e.preventDefault();
//       }
//
//       for (var i = 0, l = fields.length; i <l; i+=1) {
//         if(!fields[i].testValid(true)) {
//           errors = true;
//         }
//       }
//
//       if(errors) {
//         if(isFunction(config.unHappy)) config.unHappy(e);
//         return false;
//       } else if(config.testMode) {
//         if(window.console) console.warn("would have submitted");
//         if(isFunction(config.happy)) return config.happy(e);
//       }
//
//       if(isFunction(config.happy)) return config.happy(e);
//     }
//
//     function handleMouseUp() {
//       pauseMessages = false;
//     }
//
//     function handleMouseDown() {
//       pauseMessages = true;
//     }
//
//     function processField(opts, selector) {
//       var field = $(selector);
//       if(!field.length) return;
//
//       selector = field.prop('id') || field.prop('name').replace(['[',']'], '');
//       var error = {
//         message: opts.message || '',
//         id: selector + '_unhappy'
//       }
//
//       var errorEl = $(error.id).length > 0 ? $(error.id) : getError(error);
//
//       var handleBlur = function() {
//         console.log("pauseMessages: ", pauseMessages);
//         if(!pauseMessages) {
//           field.testValid();
//         } else {
//           $(window).one('mouseup', field.testValid);
//         }
//       }
//
//       fields.push(field);
//       field.testValid = function testValid(submit) {
//         var val, temp;
//         var required = field.prop('required') || opts.required;
//         var password = field.attr('type') === 'password';
//         var arg = isFunction(opts.arg) ? opts.arg() : opts.arg;
//         var errorTarget = (opts.errorTarget && $(opts.errorTarget)) || field;
//         var fieldErrorClass = config.classes && config.classes.field || 'unhappy';
//         var testResult = errorTarget.hasClass('fieldErrorClass');
//         var oldMessage = error.message;
//
//         if(field.length > 1) {
//           val = [];
//           field.each((i, obj) => {
//             val.push($(obj).val());
//           });
//
//           val = val.join(',');
//         }
//         else {
//           if(isFunction(opts.clean)) {
//             val = opts.clean(field.val());
//           }
//           else if(!password && typeof opts.trim === 'undefined' || opts.trim) {
//             val = $.trim(field.val());
//           } else {
//             val = field.val();
//           }
//
//           field.val(val);
//         }
//
//         if(submit === true && required === true) {
//           testResult = !val.length;
//         }
//
//         if( (val.length > 0 || required === 'sometimes') && opts.test){
//           if(isFunction(opts.test)) {
//             testResult = opts.test(val, arg);
//           }
//
//           else if( typeof opts.test === 'object') {
//             $.each(opts.test, function (i, test) {
//               if(isFunction(test)) {
//                 testResult = test(val, arg);
//                 if(testResult !== true) {
//                   return false;
//                 }
//               }
//             })
//           }
//
//           if(testResult instanceof Error) {
//             error.message = testResult.message;
//           }
//           else {
//             testResult = !testResult;
//             error.message = opts.message || '';
//           }
//         }
//
//         if(!oldMessage !== error.message) {
//           temp = getError(error);
//           errorEl.replaceWith(temp);
//           errorEl = temp;
//         }
//
//         if(testResult) {
//           errorTarget.addClass(fieldErrorClass).after(errorEl);
//           return false;
//         }
//         else {
//           errorEl.remove();
//           errorTarget.removeClass(fieldErrorClass);
//           return true;
//         }
//       };
//
//       field.on(opts.when || config.when || 'blur', handleBlur);
//
//     }
//
//     for(item in config.fields) {
//       if(config.fields.hasOwnProperty(item)){
//         processField(config.fields[item], item);
//       }
//     }
//
//     $(config.submitButton || this).on('mousedown', handleMouseDown);
//     $(window).on('mouseup', handleMouseUp);
//
//     if(config.submitButton) {
//       $(config.submitButton).click(handleSubmit);
//     }
//     else {
//       this.on('submit', handleSubmit);
//     }
//
//
//     return this;
//   }
// })($);
//
// $('#myForm').isHappy({
//   fields: {
//     '#name': {
//       required: true,
//       message: 'Give me a real name',
//     },
//     '#password': {
//       required: true,
//       message: 'Give me a real password',
//     },
//     '#email': {
//       required: true,
//       message: 'Give me a real email',
//     },
//   }
// })

// const counter = (state = 0, action) => {
//   switch(action.type) {
//     case "INCREMENT":
//       return state+1;
//     case "DECREMENT":
//       return state-1;
//     default:
//       return state;
//   }
// }


// const createStore = (reducer) => {
//   let state;
//   let listeners = []
//
//   const getState = () => state;
//
//   const dispatch = (action) => {
//     state = reducer(state, action);
//
//     listeners.forEach(listener => listener())
//   };
//
//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter(l => l !== listener);
//     }
//   };
//
//   dispatch({})
//
//   return {getState:getState, dispatch: dispatch, subscribe: subscribe}
// }
//
// let data = [
//   {name: 'camilo', parent:'amelia'},
//   {name: 'amelia', parent:'mamita'},
//   {name: 'valentina', parent:'amelia'},
//   {name: 'mamita', parent:null},
// ]
//
// function getTree(categories, parent) {
//   parent = parent || null;
//   let node = {}
//   categories
//     .filter(x => x.parent === parent)
//     .forEach(x => node[x.name] = getTree(categories, x.name))
//   return node;
// }
//
// console.log(JSON.stringify(getTree(data)));

// function walkTheDOM(node, count, countArray) {
//   // do something with the actual node
//   var count = count || 0;
//   var countStoreForBranch = countArray || [];
//
//   if(node.tagName === "UL") {
//     count += 1;
//   }
//
//   if(node.children) {
//     if(node.children.length === 0){
//       // last node of branch
//       countStoreForBranch.push(count);
//       console.log("count => ", count);
//     }
//   }
//   node = node.firstChild;
//   while (node) {
//     walkTheDOM(node, count, countStoreForBranch);
//     node = node.nextSibling;
//   }
//
//   return Math.max.apply(null, countStoreForBranch);
// }
// console.log(walkTheDOM($('#doom').get(0)));

// function simple_tooltip(target_items, name) {
//   $(target_items).each(function(i) {
//     $("body").append('<div class="tooltip" id="'+name+i+'"><p>'+$(this).attr('title')+'</p></div>');
//
//     var my_tooltip = $("#"+name+i);
//
//     $(this).removeAttr("title")
//       .mouseover(function() {
//         my_tooltip.css({opacity: .8, display: "none"})
//       })
//       .mousemove(function (kmouse) {
//         var border_top = $(window).scrollTop();
//         var border_right = $(window).width();
//         var offset = 15;
//         var left_pos;
//         var top_pos;
//
//         if(border_right - (offset*2) >= my_tooltip.width() + kmouse.pageX) {
//           left_pos = kmouse.pageX+offset;
//         }
//         else {
//           left_pos = border_right-my_tooltip.width()-offset;
//         }
//
//         if(border_top + (offset*2)>= kmouse.pageY - my_tooltip.height()) {
//           top_pos =border_top + offset;
//         }
//         else {
//           top_pos = kmouse.pageY - my_tooltip.height()-offset;
//         }
//         my_tooltip.css({left: left_pos, top: top_pos }).fadeIn(400)
//       })
//       .mouseout(function(mouse) {
//
//         console.log(mouse.pageX);
//       })
//   })
// }



// var app = (function Manager() {
//   var modules = {};
//
//   function define(name, deps, impl) {
//
//     for (var i = 0; i < deps.length; i++) {
//       deps[i] = modules[deps[i]];
//     }
//     modules[name] = impl.apply(impl, deps);
//   }
//   function get(name) {
//     return modules[name];
//   }
//
//   return {
//     define: define,
//     get: get
//   }
// })();
// app.define('cookie', [], function(){
//   var value = "COME";
//
//   function getCookie() {
//     return { value: `value in cookie:: ${value}`}
//   }
//
//   function setCookie(name) {
//     value = name;
//   }
//   return {
//     getCookie: getCookie,
//     setCookie : setCookie
//   }
// });
//
// app.define('init', ['cookie'], function init(cookie) {
//
//   function init() {
//       console.log("init app: cookie: ", cookie.getCookie());
//   }
//   return {
//     init: init
//   }
// })
//
// var myApp = app.get('init');
// myApp.init();
// app.get('cookie').setCookie('CAMILO');
// myApp.init();
