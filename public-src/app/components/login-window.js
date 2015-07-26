import Ember from 'ember';

export default Ember.Component.extend({
  highschooler: false,
  collegestudent: false,

  colleges: ["caltech", "uchicago"],

  actions: {
    isStudent: function() {
      if(!this.get('collegestudent') || this.get('highschooler')) {
        Ember.$('.ui.center.aligned.form').transition('slide down');
      }
      this.set('highschooler', true);
      this.set('collegestudent', false);
    },
    isCollege: function() {
      if(!this.get('highschooler') || this.get('collegestudent')) {
        Ember.$('.ui.center.aligned.form').transition('slide down');
      }
      this.set('highschooler', false);
      this.set('collegestudent', true);
    }
  }
});
