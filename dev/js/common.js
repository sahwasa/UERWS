$(function(){

	// nav
	var $nav=$('.nav'),
    	$deps1=$('.nav>li'),
    	$deps2=$('.nav ul li'),
    	preLocate,deps1Locate,deps2Locate,
    	indexDeps1,getDeps,indexDeps2,
    	locate=window.location.href;

	menuInit();
	function menuInit(){
		$deps1.find('ul').hide();
		$deps1.each(function(index, item){
		var getAttr=$(this).children('a').attr('href');
		index+=1;
		indexDeps1=$(this).children('a').attr('href',"#?index="+ index +',1');
		indexDeps2=$(this).find($deps2);
		getDeps=$(this).children('a').attr('href');

		indexDeps2.each(function(index2, item){
	        getAttr=$(this).children('a').attr('href');
	        index2+=1;
	        indexDeps2=$(this).children('a').attr('href',"#?index="+index+',' + index2);
		});
    });

		if(locate.indexOf("index=")>-1){
			preLocate=locate.split("index=")[1].split(',');
			deps1Locate=preLocate[0]-1;
			deps2Locate=preLocate[1]-1;

      $deps1.eq(deps1Locate).addClass('on');
			$deps1.eq(deps1Locate).children($deps2).slideDown();
      $deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).addClass('on');
		}
	};

  function menu1Open(onItem){
    var onItem=onItem.parent('li');
		if(!(onItem.hasClass('on'))){
			if(onItem.children('ul').length === 0){
				$deps1.removeClass('on').find('ul').slideUp();
				onItem.addClass('on');
			}
			onItem.children('ul').slideToggle();
		}

  }
  function menu2Open(onSubItem){
		$deps1.removeClass('on');
		$deps2.removeClass('on');
		onSubItem.addClass('on').parents('li').addClass('on');

		$deps1.each(function(i){
			if($deps1.eq(i).attr('class') == "on"){
					$deps1.eq(i).slideDown();
			}else{
				$deps1.eq(i).find('ul').slideUp();
			}
		});
  }

  $deps1.children('a').on('click',function(){menu1Open($(this))});
  $deps2.on('click',function(){menu2Open($(this))});
});

function init(){
	/* layer_popup */
	var modal= $( "[dataformat='modal']" );
	  modal.draggable({ handle: ".pop_header h1" });
	  modal.find('.btn_close').on('click',function(e){
		    e.preventDefault();
		    $(this).parents('.pop_wrap').hide();
		    $(this).parents('.overlay').hide();
		  });

	  // tab
	  $( ".tab_wrap" ).tabs();
		/* fileDeco */
		function fileNameInput(){
			var fName=$('#file').val().split('\\');
			$('#file_name').val($(fName)[2]);
		}

	  /*calendar*/
		$.datepicker.setDefaults({
			buttonImageOnly: true,
			showOn: "both",
			buttonImage: "../img/btn_calendar.gif",
			defaultDate: "+1w",
			changeMonth: true,
	    changeYear: true,
	    dateFormat:"yy-mm-dd",
			numberOfMonths: 1
		});
		$.datepicker.setDefaults( $.datepicker.regional[ "ko" ] );

	  $( ".datepicker" ).on('click',function(){
	    $(this).next('img').click();
	  });
	  $( "[dataformat='datepicker']" ).datepicker({
	      buttonText: "날짜를 선택해주세요."
	    });
	  $( "[dataformat='from']" ).datepicker({
	    buttonText: "시작날짜를 선택해주세요.",
	    onClose: function( selectedDate ) {
			  var getName=$(this).attr('name');
			  $("input[name='"+ getName +"'].to").datepicker( "option", "minDate", selectedDate );
	    }
	  });
	  $( "[dataformat='to']" ).datepicker({
	    buttonText: "종료날짜를 선택해주세요.",
	    onClose: function( selectedDate ) {
	      var getName=$(this).attr('name');
	      $("input[name='"+ getName +"'].from").datepicker( "option", "maxDate", selectedDate );
	    }
	  });

	  var tblToggle=$('.table_toggle');

	  /**
	   * timespinner "hh:mm"
	   */
	  $.widget( "ui.timespinner", $.ui.spinner, {
	      options: { step: 1, page: 1 },
	      _parse: function( value ) {
	          if ( typeof value === "string" ) {
	              if ( Number( value ) == value ) {
	                  return Number( value );
	              }
	              if(value == '') {
	                  return null;
	              }
	              var t = value.split(':', 2);
	              var n = (Number(t[0]) * 60 + Number(t[1]));
	              return Number(n);
	          }
	          return value;
	      },
	      _format: function( value ) {
	          if(value == null) {
	              return '';
	          }
	          var v = Number(value);
	          while(v < 0) {
	              v += (24 * 60);
	          }
	          v = (v % (24 * 60));
	          var mm = "00" + (v % 60);
	          mm = mm.substring(mm.length - 2);
	          var hh = "00" + (Math.floor(v / 60) % 24);
	          hh = hh.substring(hh.length - 2);
	          return hh + ":" + mm;
	      }
	  });
	  var spinner = $( "[dataformat='time']" ).timespinner();
	  var scail = $( "[dataformat='scail']" ).spinner({
	    spin: function( event, ui ) {
	        if ( ui.value > 10 ) {
	          $( this ).spinner( "value", 0 );
	          return false;
	        } else if ( ui.value < 0 ) {
	          $( this ).spinner( "value", 10 );
	          return false;
	        }
	      }
	  });
	  // ui_tooltip
	  $( document ).tooltip({
	    position: {
	      my: "center bottom-20",
	      at: "center top",
	      using: function( position, feedback ) {
	        $( this ).css( position );
	        $( "<div>" )
	          .addClass( "arrow" )
	          .addClass( feedback.vertical )
	          .addClass( feedback.horizontal )
	          .appendTo( this );
	      }
	    }
	  });
}
