/* jshint devel:true */
var RouletteSeqence = function() {
  'use strict';
  console.log('RouletteSeqence Init');
  var sequenceNow = false;
  var addName = function(name){
    var nameCont = $('<tr class="table-content seq-checked">' +
                     '  <td class="table-cont-num" >#</td>' +
                     '  <td class="table-cont-name"></td>' +
                     '  <td>' +
                     '    <input  class="table-cont-use" type="checkbox" checked />'+
                     '  </td>' +
                     '  <td>' +
                     '    <button class="btn btn-danger table-cont-del">'+
                     '      <span class="glyphicon glyphicon-remove"></span>'+
                     '      削除</button>'+
                     '  </td>' +
                     '</tr>');
    nameCont.on('click', '.table-cont-del', function(){
      $(this).closest('.table-content').remove();
    })
      .find('.table-cont-name').html(name);
    $('#resultContainer').append(nameCont);
  };

  var shuffle = function(array) {
    var al = array.length, t, i;
    while(al) {
      i = Math.floor(Math.random() * al--);
      t = array[al];
      array[al] = array[i];
      array[i] = t;
    }
    return array;
  };

  var execSeqence = function(){
    if(sequenceNow) {return true;}
    sequenceNow = true;
    var useCont = $('.table-cont-use:checked').closest('.table-content'),
        notUseCont = $('.table-content').not(useCont), i;

    $('.table-content').hide('slow', function(){
      useCont.remove();
      notUseCont.remove();

      var shuffledUseCont = shuffle(useCont),
          shuffledUseContLength = shuffledUseCont.length;
      for(i = 0; i < shuffledUseContLength; i++ ){
        $(shuffledUseCont[i]).find('.table-cont-num').html(i+1);
        $(shuffledUseCont[i])
          .appendTo('#resultContainer')
          .show('slow');
      }
      notUseCont.find('.table-cont-num').html('#');
      notUseCont.appendTo('#resultContainer').show('slow');
      $('.table-content').on('click', '.table-cont-del', function(){
        $(this).closest('.table-content').remove();
      });
    });
    sequenceNow = false;
    return true;
  };

  $('#seqButton').on('click', function(){
    if(sequenceNow) {return true;}
    execSeqence();
    return true;
  });

  var keyCode = {};
  keyCode.Enter = '13';

  $('#addNameBox').focus().on('keydown', function(e){
    var keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == keyCode.Enter && $(this).val() != '') {
      var name = $(this).val();
      addName(name);
      $(this).val('');
    }
    return true;
  });

  $('#addNameButton').on('click', function(){
    var name = $('#addNameBox').val();
    if (name === '') {return true;}
    addName(name);
    $('#addNameBox').val('');
    return true;
  });
};

RouletteSeqence();
