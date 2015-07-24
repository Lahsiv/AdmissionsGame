import Ember from 'ember';

export default Ember.Controller.extend({
  data_fields: function() {
    var lines = this.get('model').get('text').split("\n");
    return lines.filter(function(n){ return n !== ""; });
  }.property('model'),

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
