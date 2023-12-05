// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')

  if (!menu) {
    return null
  }

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// // Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
// function fixedNav() {
//   const nav = document.querySelector('nav')

//   // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
//   const breakpoint = 1
//   if (window.scrollY >= breakpoint) {
//     nav.classList.add('fixed__nav')
//   } else {
//     nav.classList.remove('fixed__nav')
//   }
// }
// window.addEventListener('scroll', fixedNav)

function updateFileName(input) {
  const fileInput = document.querySelector('[data-custom-file-input]');

  if (!fileInput) {
    return null
  }

  const fileLabel = document.querySelector('[ data-custom-file-label]');

  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    // Изменяем текст на имя файла (или на название товара, если это то, что вам нужно)
    fileLabel.textContent = fileName;
  } else {
    // Возвращаем исходный текст, если файл не выбран
    fileLabel.textContent = 'Прикрепить файл';
  }
}

function updatePercentage(input) {
  const percentageLabel = document.getElementById('percentageLabel');
  if (!percentageLabel) {
    return null
  }

  const value = input.value;
  percentageLabel.textContent = `${value}%`;
}




document.querySelectorAll('select').forEach(function (select) {
  var selectOptions = select.children.length;

  select.classList.add('hide-select');

  var customSelectContainer = document.createElement('div');
  customSelectContainer.classList.add('select');
  select.parentNode.insertBefore(customSelectContainer, select);
  customSelectContainer.appendChild(select);

  var customSelect = document.createElement('div');
  customSelect.classList.add('custom-select');
  customSelectContainer.appendChild(customSelect);
  customSelect.textContent = select.options[0].text;

  var optionList = document.createElement('ul');
  optionList.classList.add('select-options');
  customSelectContainer.appendChild(optionList);

  for (var i = 0; i < selectOptions; i++) {
    var optionListItem = document.createElement('li');
    optionListItem.textContent = select.options[i].text;
    optionListItem.setAttribute('rel', select.options[i].value);
    optionList.appendChild(optionListItem);
  }

  var optionListItems = optionList.children;

  customSelect.addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelectorAll('div.custom-select.active').forEach(function (el) {
      if (el !== customSelect) {
        el.classList.remove('active');
        el.nextElementSibling.style.display = 'none';
      }
    });
    customSelect.classList.toggle('active');
    customSelectContainer.classList.toggle('active');
    customSelect.nextElementSibling.style.display = customSelect.classList.contains('active') ? 'block' : 'none';
  });

  optionList.addEventListener('click', function (e) {
    e.stopPropagation();
    customSelect.textContent = e.target.textContent;
    customSelect.classList.remove('active');
    customSelectContainer.classList.remove('active');
    select.value = e.target.getAttribute('rel');
    optionList.style.display = 'none';
  });

  document.addEventListener('click', function () {
    customSelect.classList.remove('active');
    customSelectContainer.classList.remove('active');
    optionList.style.display = 'none';
  });
});


// validate////////////////////////////////////////////////////////////////////////////////////////////////////////
let form = document.querySelector('.form'),
  formInputs = document.querySelectorAll('[data-js-input]'),
  inputEmail = document.querySelector('[data-js-input-email]');
// inputPhone = document.querySelector('.js-input-phone');


function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  return re.test(String(phone));
}


form.onsubmit = function () {
  let emailVal = inputEmail.value,
    // phoneVal = inputPhone.value,
    emptyInputs = Array.from(formInputs).filter(input => input.value === '');

  formInputs.forEach(function (input) {
    if (input.value === '') {
      input.classList.add('error');
      console.log('input not filled');
    } else {
      input.classList.remove('error');
    }


  })

  if (emptyInputs.length !== 0) {
    console.log('inputs not filled');
    return false;
  }

  if (!validateEmail(emailVal)) {
    console.log('email not valid');
    inputEmail.classList.add('error');
    return false;
  } else {
    inputEmail.classList.remove('error');
  }

  // if (!validatePhone(phoneVal)) {
  //   console.log('phone not valid');
  //   inputPhone.classList.add('error');
  //   return false;
  // } else {
  //   inputPhone.classList.remove('error');
  // }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
