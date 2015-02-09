/* jshint devel:true */
var RouletteSeqence = function() {
  'use strict';
  console.log('RouletteSeqence Init');
  var sequenceNow = false;

  var urlHashUpdate = function(){
    var names = [];
    Array.prototype.map.call(
      document.getElementsByClassName('table-cont-name'),
      function(current){
        names.push(current.innerHTML);
      });
    window.location.hash = encodeURI(names.reduce(function(sum,item){
      return sum + '&' + item;
    }));
  };

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
      $(this).closest('.table-content')
        .hide('fast',function(){
          $(this).remove();
          urlHashUpdate();
        });
    })
      .find('.table-cont-name').html(name);
    nameCont.hide().appendTo('#resultContainer').show('fast');
    urlHashUpdate();
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

    $('.table-content').remove();

    var shuffledUseCont = shuffle(useCont),
        shuffledUseContLength = shuffledUseCont.length,
        tableContList = [];
    Array.prototype.forEach.call(shuffledUseCont, function(item, index){
      $(item).find('.table-cont-num').html(index + 1);
      tableContList.push(item);
    });
    notUseCont.find('.table-cont-num').html('#');
    tableContList = tableContList.concat(notUseCont);
    tableContList.forEach(function(item, index, array){
      setTimeout(function(){
        $(item).on('click', '.table-cont-del', function(){
          $(this).closest('.table-content')
            .hide('fast',function(){$(this).remove();});
        })
          .appendTo('#resultContainer')
          .show('fast');
        if (index == array.length - 1) {
          sequenceNow = false;
        }
      }, 500 * (index + 1));
    });
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
  if (window.location.hash) {
    try {
      var nameList = decodeURI(window.location.hash).replace('#','').split('&');
      nameList.map(function(current){
        addName(current);
      });
    } catch(e) {
      console.log('URI Parse Error!');
    }
  }
};

RouletteSeqence();
