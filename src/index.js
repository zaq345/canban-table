// код для работы кнопки для добавления новых колонок
let plus = document.getElementById('plus');             // выбираем кнопку
plus.onclick = function(){
  
  let newColHead = document.createElement('td');        // создаём td для нового заголовка новой колонки
  let tableHeadRow = document.getElementById('hrow');   // выбираем ряд заголовков таблицы
  tableHeadRow.appendChild(newColHead);                 // вставляем td в ряд заголовков

  let newColHeader = document.createElement('p');       // создаём p для названия заголовка новой колонки
  newColHeader.innerText = "Новый заголовок";
  newColHeader.setAttribute('class', 'column-header');  // добавляем заголовку класс
  newColHead.appendChild(newColHeader);                 // вставляем заголовок в таблицу

  let newColBody = document.createElement('td');        // создаём td для нового тела где будут карточки
  newColBody.setAttribute('class', 'card-container');
  let tableBodyRow = document.getElementById('brow');   // выбираем ряд с карточками
  tableBodyRow.appendChild(newColBody);                 // вставляем 

  //код для изменения заголовков что созданы в новых колонках по нажатию кнопки
  //let changeHeader = document.getElementsByClassName('column-header'); // выбираем заголовок для изменения
  let changeHeader = document.querySelectorAll('.column-header'); // работает также как и строка выше
  for (let elem of changeHeader) {
    elem.onclick = function(){
      let inputHeader = document.createElement('input');  // создаём input для ввода нового заголовка
      inputHeader.setAttribute('class', 'column-header');
      let ColHeader = elem.innerText;                     // сохраняем значение предыдущего заголовка
      elem.setAttribute('class', 'column-header-none');   // скрываем заголовок
 
      let headtd = elem.closest('td');                    // выбираем ближайшего родителя td
      headtd.appendChild(inputHeader);                    // вставляем в него input
      inputHeader.value = ColHeader;                      // вставляем в input значение предыдущего заголовка
      
      inputHeader.onblur = function(){                    // при потере фокуса на ввод
        elem.innerText = inputHeader.value;               // присваиваем значение из поля ввода заголовку
        inputHeader.remove();                             // удаляем поле ввода
        elem.setAttribute('class', 'column-header');      // делаем заголовок вновь видимым
      }
    }
  }
  ////////////////////////
  ////////////////////////
  let clearEventListeners = document.querySelectorAll('.card-container');    
  for (let elem of clearEventListeners){
    let old_element = elem;
    let new_element = elem.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
  }
  // этот кусочек кода удаляет все предыдущие обработчики событий
  // он необходим тк, в случае без него при создании n новых колонок
  // начинают создаваться n+1 форма создания карточки
  // честно говоря я хз из-за чего точно это, но возможно
  // это из-за того что при каждом нажатии кнопки добавления колонки,
  // мы добавляем ещё один обработчик кликов с точно такими же функциями
  ////////////////////////
  let createCard = document.querySelectorAll('.card-container');
  for (let elem of createCard){
    elem.addEventListener('click', addform);
    function addform(){
      //
      elem.removeEventListener('click', addform);         
      // удаляем обработчик события чтобы при кликах по форме не создавать новые формы

      let formCard = document.createElement('div');       // создаём блок для формы добавления новой карточки
      formCard.setAttribute('class', 'card-form');
      elem.appendChild(formCard);

      let formHeader = document.createElement('p');
      formHeader.innerText = 'Введите заголовок карточки';
      formCard.appendChild(formHeader);

      let inputCardHeader = document.createElement('input');  // поле ввода для заголовка
      formCard.appendChild(inputCardHeader);

      let formBody = document.createElement('p');
      formBody.innerText = 'Введите описание';
      formCard.appendChild(formBody);

      let inputCardBody = document.createElement('textarea'); // поле ввода описания
      formCard.appendChild(inputCardBody);

      let formColor = document.createElement('p');
      formColor.innerText = 'Выберите цвет карточки';
      formCard.appendChild(formColor);

      let inputCardColor = document.createElement('input');   // выбор цвета карточки
      inputCardColor.setAttribute('type', 'color');
      formCard.appendChild(inputCardColor);
      
      let addButton = document.createElement('button');       // создаём кнопку подтверждения
      addButton.innerText = 'Создать';
      addButton.onclick = function(){

        let newCard = document.createElement('div');          // создаём обёртку карточки
        newCard.setAttribute('class', 'card');

        // это для карточек которые будут созданы в новы стобцах
        // нужно дописать для изначальных и новых карточек в начальных столбцах
        
        newCard.onclick = function(event){
          newCard.setAttribute('class', 'card-none');

          ////////////////////////
          let closerCardForm = newCard.closest('.card-container');

          let editCardForm = document.createElement('div');       // вставляем форму редактирования
          editCardForm.setAttribute('class', 'card-edit-form');
          closerCardForm.appendChild(editCardForm);
          editCardForm.onclick = function(event){                 // чтобы при нажатии на форму редактирования
            event.stopPropagation();                              // не создавалась обычная форма создания карточки
          }
  
          let editCardHeaderP = document.createElement('p');      // заголовок перед вводом заголовка
          editCardHeaderP.innerText = "Введите заголовок";
          editCardForm.appendChild(editCardHeaderP);
  
          let editCardHeader = document.createElement('input');   // создаём поле ввода для заголовка
          let oldCardHeader = newCard.querySelector('.card-header');
          editCardHeader.value = oldCardHeader.textContent;       // и присваиваем значение предыдущего заголовка
          editCardForm.appendChild(editCardHeader);
  
          let editCardBodyP = document.createElement('p');        // заголовок перед вводом описания
          editCardBodyP.innerText = "Введите описание";
          editCardForm.appendChild(editCardBodyP);
  
          let editCardBody = document.createElement('textarea');  // создаём поле ввода для описание
          let oldCardBody = newCard.querySelector('.card-body');
          editCardBody.value = oldCardBody.textContent;           // копируем в него предыдущее значение
          editCardForm.appendChild(editCardBody);
  
          let editCardColorP = document.createElement('p');       // заголовок для выбора цвета
          editCardColorP.innerText = 'Выберите цвет';
          editCardForm.appendChild(editCardColorP);
  
          let editCardColor = document.createElement('input');
          editCardColor.setAttribute('type', 'color');
          editCardForm.appendChild(editCardColor);
  
          let saveButton = document.createElement('button');      // сохранение
          saveButton.innerText = 'Сохранить';
          saveButton.onclick = function(){
            let editedCardHeader = newCard.querySelector('.card-header');  // меняем заголовок
            editedCardHeader.textContent = editCardHeader.value;
  
            let editedCardBody = newCard.querySelector('.card-body');      // меняем описание
            editedCardBody.textContent = editCardBody.value;
  
            newCard.style.backgroundColor = editCardColor.value;           // меняем цвет
  
            editCardForm.remove();
            newCard.setAttribute('class', 'card');
          }
          editCardForm.appendChild(saveButton);
  
          let cancelButton = document.createElement('button');    // отмена
          cancelButton.innerText = 'Отмена';
          cancelButton.onclick = function(){
            editCardForm.remove();
            newCard.setAttribute('class', 'card');
          }
          editCardForm.appendChild(cancelButton);
  
          let deleteButton = document.createElement('button');    // удаление
          deleteButton.innerText = 'Удалить';
          deleteButton.onclick = function(){
            editCardForm.remove();
            newCard.remove();
          }
          editCardForm.appendChild(deleteButton);
          ////////////////////////

          event.stopPropagation();                             
        }

        newCard.style.backgroundColor = inputCardColor.value; // задаём цвет фона

        let newCardHeader = document.createElement('p');      // создаем заголовок новой карточки
        newCardHeader.innerText = inputCardHeader.value;      // присваиваем значение заголовку
        newCardHeader.setAttribute('class', 'card-header');

        let newCardBody = document.createElement('p');        // создаем описание
        newCardBody.innerText = inputCardBody.value;          // присваиваем значение описанию
        newCardBody.setAttribute('class', 'card-body');

        formCard.remove();                                    // удаляем форму

        elem.appendChild(newCard);                            // показываем новую карточку
        newCard.appendChild(newCardHeader);
        newCard.appendChild(newCardBody);

        setTimeout(()=>{elem.addEventListener('click', addform)}, 0);   // возвращаем возможность вызывать форму
      }
      formCard.appendChild(addButton);

      let cancelButton = document.createElement('button');     // создаём кнопку отмены
      cancelButton.innerText = 'Отменить';
      cancelButton.onclick = function(){
        formCard.remove();
        setTimeout(()=>{elem.addEventListener('click', addform)}, 0);
      }
      formCard.appendChild(cancelButton);

    }
  }
}
// это повторяющийся кусок кода, чтобы можно было переименовывать те заголовки, что заданы изначально
// я хз пока как это пофиксить
let changeHeader = document.getElementsByClassName('column-header'); // выбираем заголовок для изменения
for (let elem of changeHeader) {
  elem.onclick = function(){
    let inputHeader = document.createElement('input');  // создаём input для ввода нового заголовка
    inputHeader.setAttribute('class', 'column-header');
    let ColHeader = elem.innerText;                     // сохраняем значение предыдущего заголовка
    elem.setAttribute('class', 'column-header-none');   // скрываем заголовок

    let headtd = elem.closest('td');                    // выбираем ближайшего родителя td
    headtd.appendChild(inputHeader);                    // вставляем в него input
    inputHeader.value = ColHeader;                      // вставляем в input значение предыдущего заголовка
    
    inputHeader.onblur = function(){                    // при потере фокуса на ввод
      elem.innerText = inputHeader.value;               // присваиваем значение из поля ввода заголовку
      inputHeader.remove();                             // удаляем поле ввода
      elem.setAttribute('class', 'column-header');      // делаем заголовок вновь видимым
    }
  }
}
//////////////////////////////////
// код для редактирования карточек
let editCard = document.querySelectorAll('.card');
for (let elem of editCard){
  elem.onclick = function(event){
    
    elem.setAttribute('class', 'card-none');

    let closerCardForm = elem.closest('.card-container');

    let editCardForm = document.createElement('div');       // вставляем форму редактирования
    editCardForm.setAttribute('class', 'card-edit-form');
    closerCardForm.appendChild(editCardForm);
    editCardForm.onclick = function(event){                 // чтобы при нажатии на форму редактирования
      event.stopPropagation();                              // не создавалась обычная форма создания карточки
    }

    let editCardHeaderP = document.createElement('p');      // заголовок перед вводом заголовка
    editCardHeaderP.innerText = "Введите заголовок";
    editCardForm.appendChild(editCardHeaderP);

    let editCardHeader = document.createElement('input');   // создаём поле ввода для заголовка
    let oldCardHeader = elem.querySelector('.card-header');
    editCardHeader.value = oldCardHeader.textContent;       // и присваиваем значение предыдущего заголовка
    editCardForm.appendChild(editCardHeader);

    let editCardBodyP = document.createElement('p');        // заголовок перед вводом описания
    editCardBodyP.innerText = "Введите описание";
    editCardForm.appendChild(editCardBodyP);

    let editCardBody = document.createElement('textarea');  // создаём поле ввода для описание
    let oldCardBody = elem.querySelector('.card-body');
    editCardBody.value = oldCardBody.textContent;           // копируем в него предыдущее значение
    editCardForm.appendChild(editCardBody);

    let editCardColorP = document.createElement('p');       // заголовок для выбора цвета
    editCardColorP.innerText = 'Выберите цвет';
    editCardForm.appendChild(editCardColorP);

    let editCardColor = document.createElement('input');
    editCardColor.setAttribute('type', 'color');
    editCardForm.appendChild(editCardColor);

    let saveButton = document.createElement('button');      // сохранение
    saveButton.innerText = 'Сохранить';
    saveButton.onclick = function(){
      let editedCardHeader = elem.querySelector('.card-header');  // меняем заголовок
      editedCardHeader.textContent = editCardHeader.value;

      let editedCardBody = elem.querySelector('.card-body');      // меняем описание
      editedCardBody.textContent = editCardBody.value;

      elem.style.backgroundColor = editCardColor.value;           // меняем цвет

      editCardForm.remove();
      elem.setAttribute('class', 'card');
    }
    editCardForm.appendChild(saveButton);

    let cancelButton = document.createElement('button');    // отмена
    cancelButton.innerText = 'Отмена';
    cancelButton.onclick = function(){
      editCardForm.remove();
      elem.setAttribute('class', 'card');
    }
    editCardForm.appendChild(cancelButton);

    let deleteButton = document.createElement('button');    // удаление
    deleteButton.innerText = 'Удалить';
    deleteButton.onclick = function(){
      editCardForm.remove();
      elem.remove();
    }
    editCardForm.appendChild(deleteButton);

    event.stopPropagation();                             // предотвращает всплытие клика к форме
  }
}
//////////////////////////////////

// код для создания новых карточек
let createCard = document.querySelectorAll('.card-container');
for (let elem of createCard){
  elem.addEventListener('click', addform);
  function addform(){
    //
    elem.removeEventListener('click', addform);         
    // удаляем обработчик события чтобы при кликах по форме не создавать новые формы

    let formCard = document.createElement('div');         // создаём блок для формы добавления новой карточки
    formCard.setAttribute('class', 'card-form');
    elem.appendChild(formCard);

    let formHeader = document.createElement('p');
    formHeader.innerText = 'Введите заголовок карточки';
    formCard.appendChild(formHeader);

    let inputCardHeader = document.createElement('input');  // поле ввода для заголовка
    formCard.appendChild(inputCardHeader);

    let formBody = document.createElement('p');
    formBody.innerText = 'Введите описание';
    formCard.appendChild(formBody);

    let inputCardBody = document.createElement('textarea'); // поле ввода описания
    formCard.appendChild(inputCardBody);

    let formColor = document.createElement('p');
    formColor.innerText = 'Выберите цвет карточки';
    formCard.appendChild(formColor);

    let inputCardColor = document.createElement('input');   // выбор цвета карточки
    inputCardColor.setAttribute('type', 'color');
    formCard.appendChild(inputCardColor);
    
    let addButton = document.createElement('button');       // создаём кнопку подтверждения
    addButton.innerText = 'Создать';
    addButton.onclick = function(){

      let newCard = document.createElement('div');          // создаём обёртку карточки
      newCard.setAttribute('class', 'card');

      //
      newCard.onclick = function(event){
        newCard.setAttribute('class', 'card-none');

        /////////////////////////////
        
        let closerCardForm = newCard.closest('.card-container');

        let editCardForm = document.createElement('div');       // вставляем форму редактирования
        editCardForm.setAttribute('class', 'card-edit-form');
        closerCardForm.appendChild(editCardForm);
        editCardForm.onclick = function(event){                 // чтобы при нажатии на форму редактирования
          event.stopPropagation();                              // не создавалась обычная форма создания карточки
        }

        let editCardHeaderP = document.createElement('p');      // заголовок перед вводом заголовка
        editCardHeaderP.innerText = "Введите заголовок";
        editCardForm.appendChild(editCardHeaderP);

        let editCardHeader = document.createElement('input');   // создаём поле ввода для заголовка
        let oldCardHeader = newCard.querySelector('.card-header');
        editCardHeader.value = oldCardHeader.textContent;       // и присваиваем значение предыдущего заголовка
        editCardForm.appendChild(editCardHeader);

        let editCardBodyP = document.createElement('p');        // заголовок перед вводом описания
        editCardBodyP.innerText = "Введите описание";
        editCardForm.appendChild(editCardBodyP);

        let editCardBody = document.createElement('textarea');  // создаём поле ввода для описание
        let oldCardBody = newCard.querySelector('.card-body');
        editCardBody.value = oldCardBody.textContent;           // копируем в него предыдущее значение
        editCardForm.appendChild(editCardBody);

        let editCardColorP = document.createElement('p');       // заголовок для выбора цвета
        editCardColorP.innerText = 'Выберите цвет';
        editCardForm.appendChild(editCardColorP);

        let editCardColor = document.createElement('input');
        editCardColor.setAttribute('type', 'color');
        editCardForm.appendChild(editCardColor);

        let saveButton = document.createElement('button');      // сохранение
        saveButton.innerText = 'Сохранить';
        saveButton.onclick = function(){
          let editedCardHeader = newCard.querySelector('.card-header');  // меняем заголовок
          editedCardHeader.textContent = editCardHeader.value;

          let editedCardBody = newCard.querySelector('.card-body');      // меняем описание
          editedCardBody.textContent = editCardBody.value;

          newCard.style.backgroundColor = editCardColor.value;           // меняем цвет

          editCardForm.remove();
          newCard.setAttribute('class', 'card');
        }
        editCardForm.appendChild(saveButton);

        let cancelButton = document.createElement('button');    // отмена
        cancelButton.innerText = 'Отмена';
        cancelButton.onclick = function(){
          editCardForm.remove();
          newCard.setAttribute('class', 'card');
        }
        editCardForm.appendChild(cancelButton);

        let deleteButton = document.createElement('button');    // удаление
        deleteButton.innerText = 'Удалить';
        deleteButton.onclick = function(){
          editCardForm.remove();
          newCard.remove();
        }
        editCardForm.appendChild(deleteButton);

        /////////////////////////////


        event.stopPropagation();                             
      }
      //

      newCard.style.backgroundColor = inputCardColor.value; // задаём цвет фона

      let newCardHeader = document.createElement('p');      // создаем заголовок новой карточки
      newCardHeader.innerText = inputCardHeader.value;      // присваиваем значение заголовку
      newCardHeader.setAttribute('class', 'card-header');

      let newCardBody = document.createElement('p');        // создаем описание
      newCardBody.innerText = inputCardBody.value;          // присваиваем значение описанию
      newCardBody.setAttribute('class', 'card-body');

      formCard.remove();                                    // удаляем форму

      elem.appendChild(newCard);
      newCard.appendChild(newCardHeader);
      newCard.appendChild(newCardBody);

      setTimeout(()=>{elem.addEventListener('click', addform)}, 0);   // возвращаем возможность вызывать форму
    }
    formCard.appendChild(addButton);

    let cancelButton = document.createElement('button');     // создаём кнопку отмены
    cancelButton.innerText = 'Отменить';
    cancelButton.onclick = function(){
      formCard.remove();
      setTimeout(()=>{elem.addEventListener('click', addform)}, 0);
    }
    formCard.appendChild(cancelButton);
  }
}


///////////////
// не работает изменения изначально созданных карточек после того как создадим новую колонку
