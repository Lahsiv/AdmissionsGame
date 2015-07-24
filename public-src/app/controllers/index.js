import Ember from 'ember';

export default Ember.Controller.extend({
  highschooler: false,
  collegestudent: false,

  actions: {
    isStudent: function() {
      this.set('highschooler', true);
      this.set('collegestudent', false);
    },
    isCollege: function() {
      this.set('highschooler', false);
      this.set('collegestudent', true);
    }
  }
});
