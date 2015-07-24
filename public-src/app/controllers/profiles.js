import Ember from 'ember';

export default Ember.Controller.extend({
  data_fields: function() {
    var lines = this.get('model').get('text').split("\n");
    return lines.filter(function(n){ return n !== ""; });
  }.property('model'),

  guessed: false,
  correct: false,

  actions: {
    reload: function() {
      //this.get('model').reload();
      //this.set('guessed', false);
      this.set('guessed', false);
      var self = this;
      Ember.$.getJSON('http://localhost:3000/profiles/1', function(post) {
        self.set('model', Ember.Object.create(post));
      })
      //this.get('target').refresh();
      /*var self = this;
      this.store.find('profile', 1).then(function(result) {
        self.set('model', result);
        debugger;
      })*/
    },

    guess: function(value, actual) {
      this.set('guessed', true);
      this.set('correct', value === actual);
    }
  }

});
