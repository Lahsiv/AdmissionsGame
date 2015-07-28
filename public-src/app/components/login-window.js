import Ember from 'ember';


export default Ember.Component.extend({
  highschooler: false,
  collegestudent: false,
  issigningup: false,
  something_selected: function() {
    return (this.get('highschooler') || this.get('collegestudent'));
  }.property('highschooler', 'collegestudent'),

  invalid_college: false,
  invalid_name: false,
  invalid_school: false,
  invalid_email: false,
  email_taken: false,

  actions: {
    setCollege: function(college_name) {
      this.set('college', college_name);
    },

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
    },
    validate_highschool: function() {
      this.validate_common();
      if(!this.get("hschool")) {
        this.set('invalid_school', true);
      } else {
        this.set('invalid_school', false);
      }

      if(this.get('invalid_name') || this.get('invalid_email') || this.get('invalid_school') || this.get('invalid_college')) {
        return;
      }
      else {
        this.signup_highschool();
      }
    },

    validate_college: function() {
      this.validate_common();
      if(this.get('invalid_name') || this.get('invalid_email') || this.get('invalid_college')) {
        console.log(this.get('invalid_college'));
        return;
      }
      else {
        this.signup_college();
      }
    }
  },

  validate_common : function() {
    if(this.isEmailValid(this.get('email'))) {
      this.set('invalid_email', false);
    } else {
      this.set('invalid_email', true);
    }
    if(!this.get("first-name") || !this.get('last-name')) {
      this.set('invalid_name', true);
    } else {
      this.set('invalid_name', false);
    }
    if(!this.get('college')) {
      this.set('invalid_college', true);
    } else {
      this.set('invalid_college', false);
    }
    console.log(this.get('college'));
    console.log(!this.get('college'));
    return;
  },

  signup_college : function() {
    this.set('issigningup', true);
    document.getElementById("cbutton").disabled = true;
    var body = new Object();
    body.first_name = this.get('first-name');
    body.last_name = this.get('last-name');
    body.college = this.get('college');
    body.email = this.get('email');
    var self = this;
    Ember.$.post('http://localhost:3000/login3cs', body, function(post) {
      self.set('issigningup', false);
      console.log(post);
      if(post.response === "There was an error.") {
        self.set('email_taken', true);
      }
      else {
        self.set('email_taken', false);
        /*Cookies.set('u_mail', self.get('email'), { expires: 7 });
        Cookies.set('u_fname', self.get('first-name'), { expires: 7 });
        Cookies.set('u_lname', self.get('last-name'), { expires: 7 });
        Cookies.set('u_college', self.get('college'), { expires: 7 });
        Cookies.set('is_hs', false, { expires: 7 });*/
        window.location.replace("/");
      }
    });
  },

  signup_highschool : function() {
    this.set('issigningup', true);
    var body = new Object();
    body.first_name = this.get('first-name');
    body.last_name = this.get('last-name');
    body.email = this.get('email');
    body.college = this.get('college');
    body.school = this.get('hschool');
    var self = this;
    Ember.$.post('http://localhost:3000/login3hs', body, function(post) {
      self.set('issigningup', false);
      console.log(post);
      if(post.response === "There was an error.") {
        self.set('email_taken', true);
      }
      else {
        self.set('email_taken', false);
      }
    });
  },

  isEmailValid : function(email) {
    var regex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    return (email !== undefined && email.match(regex) != null);
  }
});
