import DS from 'ember-data';

export default DS.Model.extend({
  decision : DS.attr('boolean'),
  text : DS.attr('string'),
  college : DS.attr('string')
});
