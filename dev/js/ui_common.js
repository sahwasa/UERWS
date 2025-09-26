$(function () {
  //addOPT
  $('[data-checkEvt]').on('change', function (e) {
    const getTarget = e.target.dataset.checkevt.split('!')
    let target
    if (getTarget[1]) {
      target = $('#' + getTarget[1])
      $(this).prop('checked') ? target.hide() : target.show()
    } else {
      target = $('#' + getTarget[0])
      $(this).prop('checked') ? target.show() : target.hide()
    }
  }); 
  $('[data-selectTarget]').hide();
  $('[data-selectEvt]').on('change', function (e) {
    const getTarget = e.target.dataset.selectevt;
    const result = $(this).val();
    let target = $('#' + getTarget + result);
    console.log(target)
    $('[data-selectTarget]').hide();
    if(target.length){
      target.show();
    }
  });
  $('dialog:has(.p_header)').draggable({ handle: ".p_header", cursor: "move" ,containment: "#wrap",scroll: true, scrollSensitivity: 100, scrollSpeed: 100});

  function DatetimepickerDefaults(opts) {
    return $.extend({},{
      locale: 'ko',
      format: 'Y-m-d',
      timepicker: false,
      step:10
    }, opts);
  }
  $('[data-datepicker="date"]').datetimepicker(DatetimepickerDefaults());
  $('[data-datepicker="datetime"]').datetimepicker(DatetimepickerDefaults({
      format: 'Y-m-d H:i',
      timepicker: true
  }));
  $('#date_timepicker_start').datetimepicker(DatetimepickerDefaults({
    onShow: function (ct) {
      this.setOptions({
        maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
      })
    }
  })); 
  $('#date_timepicker_end').datetimepicker(DatetimepickerDefaults({
    onShow: function (ct) {
      this.setOptions({
        minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
      })
    }
  }));
 

  // tab
  var tab_conts = $('.tab_conts'),
      tab_list = $('.tab_list'),
      tab_btn = $('.tab_list li');

  tab_conts.find('.tab_cont').hide();
  tab_conts.find('.tab_cont:first').show();
  tab_list.find('li:first').find('a').addClass('on');
  tab_btn.on('click', 'a', function (e) {
    e.preventDefault();
    var getId = $(this).prop('href').split('#')[1];
    $(this).parents('.tab').next('.tab_conts').find('.tab_cont').hide();
    $(this).parents('.tab_list').find('a').removeClass('on');
    $(this).addClass('on');
    $('#' + getId).show();
  });

  // pop
  var popBtn = $('[openpop]');
  popBtn.on('click', function () {
    var target = $(this).attr('openpop');
    $('#' + target).show();
  })
  $('dialog').on('click','.btn_cross',function(){
    var target = $(this).parents('dialog').attr('id');
    document.getElementById(target).close();
  })
  var closePop = $('.btn_pop_close');
  closePop.on('click', function () {
    $(this).parents('.pop_overlay').hide();
  })
  $('.btn_cancel').on('click', function () {
    $(this).parents('.pop_overlay').fadeOut();
  })
  $('.con_list .more').on('click', function () {
    $(this).toggleClass('on');
    $(this).parent('p').nextAll('ul').slideToggle('fast');
  })

  // tree
  $('.tree li:has(ul)').addClass('arrow')
  $('.tree').on('click', 'li > button', function () {
    var children = $(this).parent('li.arrow').find(' > ul > li')
    if (children.is(':visible')) {
      children.hide(0)
      $(this).parent('li').addClass('close')
    } else {
      children.show(0)
      $(this).parent('li').removeClass('close')
    }
    return false
  })
  $('.tree_ctrl .tgl_tree').on('change','input',function(){
    var cur = $(this).prop('checked');
    var treelst = $('.tree').find('ul > li');
    var txt = $(this);
    if (cur) {
      treelst.hide(0)
      treelst.addClass('close')
      txt = '전체펼치기';
    } else {
      // tree.show();
      treelst.show(0)
      treelst.removeClass('close')
      txt = '전체접기';
    }
    $(this).next('label').text(txt);
  })
  $('.btn_subclose').on('click', function () {
    $('.panel_sub').hide();
  })
  // table_row checked
  $('.row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked'),
          checkName = 'select_tr',
          thisP = $(this).parents('.tbl_wrap');
      childBody = thisP.find('tbody');
      if ($(this).hasClass('all_check')) {
        var childCheckIpt = childBody.find('.row_check');
        childCheckIpt.each(function () {
          var elRow = $(this).parents('tr')
          $(this).prop('checked', cur)
          cur ? elRow.addClass(checkName) : elRow.removeClass(checkName)
        })
      } else {
        var thisRow = $(this).parents('tr');
        if ($(this).prop('type') == 'radio') $(this).parents('table').find('tr').removeClass(checkName);
        cur ? thisRow.addClass(checkName) : thisRow.removeClass(checkName);
        var checkSize = childBody.find('.row_check:checked').length,
            allCtrl = thisP.find('.all_check');
        childBody.find('input:checkbox').length <= checkSize
            ? allCtrl.prop('checked', true)
            : allCtrl.prop('checked', false)
      }
    },
  })
  // tbl_list Handle checked
  $('.tbl_list .row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked')
      var thisLi = $(this).closest('li')
      if (cur) {
        thisLi.addClass('select_li')
      } else {
        thisLi.removeClass('select_li')
      }
    },
  })
  // list all check
  function all_check_evt(el) {
    const allCtrl = el.prop('checked'),
          thisChild = el.closest('.all_lst_ctrl').next('.lst_ctrl').find('input:checkbox');
    thisChild.prop('checked', allCtrl)
  }
  function all_check(el) {
    var thisP = el.parents('.lst_ctrl'),
        checkSize = thisP.find('input:checked').length,
        allCtrl = thisP.prev('.all_lst_ctrl').find('input:checkbox')
    thisP.find('input:checkbox').length <= checkSize
        ? allCtrl.prop('checked', true)
        : allCtrl.prop('checked', false)
  }
  $('.all_lst_ctrl').on('click change', 'input:checkbox', function () {
    all_check_evt($(this))
  })
  $('.lst_ctrl').on('click change', 'input:checkbox', function () {
    all_check($(this))
  })
  $('.lst_ctrl')
    .find('input:checkbox')
    .each(function (index, item) {
      all_check($(item))
  })
})


$("#draggable").draggable();

// main : weather
$('.btn_weather').on('click', function () {
  $(this).toggleClass('on');
  $('.con_weather').fadeToggle();
})
$('.btn_weather_close').on('click', function () {
  $('.btn_weather').toggleClass('on');
  $('.con_weather').fadeToggle();
})

// alert
$('.alert').on('click', function () {
  // $('.p_alert').parents('.pop_overlay').show();
  $('#p_alert')[0].showModal();
})

// toggle button
$('.btn_toggle').on('click', function (e) {
  e.preventDefault();
  var cur = $(this).attr('datavalue');
  if ($(this).attr('disabled') == 'disabled') return false;
  if (cur == 'on') {
    $(this).attr('datavalue', 'off');
  } else {
    $(this).attr('datavalue', 'on');
  }
})
$('.slide_tit i').on('click', function () {
  $(this).children('.how_to_use').toggleClass('on');
})
$('.axi-close').on('click', function () {
  $(this).parent('li').remove();
})
$('.btn_reset').on('click', function () {
  $('.selectlocate_wrap').remove();
})

// 선택지역
$('.selectlocate_wrap').on('click', function () {
  var parentUl = $(this).find('.selectlocate_box').children().length;
  if (parentUl < 1) {
    $(this).find('.selectlocate_box').remove();
  }
})
$('.selectlocate_wrap').on('click', function () {
  var parentUlAll = $(this).find('.selectlocate_box_wrap').children().length;
  console.log(parentUlAll);
  if (parentUlAll == 1) {
    $(this).remove();
  }
})

//case eqtabs
$('ul.eqtabs li, .eq_map_list li').on('click', function () {
  var tab_id = $(this).attr('data_tab');
  $('ul.eqtabs li, .eqtab_content, .eq_map_list li').removeClass('current');
  $(this).addClass('current');
  $()
  $("." + tab_id).addClass('current');
  return false;
});

//slide
var slideIndex = 0;

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
}

var createDot = (index) => {
  var dotBtn = document.createElement('button');
  dotBtn.innerHTML = index + 1;
  dotBtn.setAttribute('class', 'slide_dots');
  dotBtn.setAttribute('type', 'button');
  dotBtn.addEventListener('click', () => currentSlide(index + 1));
  return dotBtn;
}

function showSlides() {
  var slides = document.querySelectorAll('.slide_item');
  var dots = document.querySelectorAll('.slide_dots');

  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => {
    slide.style.display = 'none';
  });

  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  slides[slideIndex].style.display = 'flex';
  dots[slideIndex].classList.add('active');
}

function initSlideshow() {
  var slides = document.querySelectorAll('.slide_item');
  var slideRemote = document.querySelector('.slideRemote');
  var dotContainer = document.querySelector('.dots_container');
  if (slides.length === 0) return;
  if (slides.length <= 1) {
    slideRemote.style.display = 'none';
    dotContainer.style.display = 'none';
  }else{
    slideRemote.style.display = 'block';
    dotContainer.style.display = 'block';
  }
  
  for (var i = 0; i < slides.length; i++) {
    dotContainer.appendChild(createDot(i));
  }
  
  showSlides(); // Initial display of the first slide
}

function nextSlide() {
  slideIndex++;
  showSlides();
}

function prevSlide() {
  slideIndex--;
  showSlides();
}


