var $ = jQuery;
$(document).ready(function() {
  var textArea = document.getElementById('reactive_grid_template');
  if(textArea){
    var editor = CodeMirror.fromTextArea(reactive_grid_template, {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    theme: "dracula",
    });
  }

  var textArea = document.getElementById('reactive_category_template');
  if(textArea){
    var editor = CodeMirror.fromTextArea(reactive_category_template, {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    theme: "dracula",
    });
  }

});
