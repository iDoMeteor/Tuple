Template.alert.onRendered(function () {
  var duration = this.data.duration || 6000;
  var target = this.find('.alert');
  Meteor.setTimeout(function () {
    $(target).hide('fade', function () {
      $(target).alert('close');
    });
  }, duration);
});

Template.modal.onRendered(function () {
    const target = this.find('.modal');
    $(target).modal('show');
    $(target).on('hidden.bs.modal', function () {
        $(target).remove();
    });
});
