import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('profiles');
  this.route('signup');
  this.route('login');
  this.route('faq');
  this.route('theteam');
  this.route('index2');
  this.route('myaccount');
});

export default Router;
