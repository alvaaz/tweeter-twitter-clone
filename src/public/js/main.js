var c;
/*look for any elements with the class "custom-select":*/
const allSelects = document.getElementsByClassName("custom-select");
const qtySelects = allSelects.length;

for (let i = 0; i < qtySelects; i++) {
  const selElmnt = allSelects[i].getElementsByTagName("select")[0];
  const qtyOptions = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  const selectCustom = document.createElement("DIV");
  selectCustom.setAttribute("class", "select-selected");
  selectCustom.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  allSelects[i].appendChild(selectCustom);
  /*for each element, create a new DIV that will contain the option list:*/
  const optionsContainer = document.createElement("DIV");
  optionsContainer.setAttribute("class", "select-items select-hide");
  for (let j = 0; j < qtyOptions; j++) {
    /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
    const option = document.createElement("DIV");
    /* first element preselected */
    if (j === 0) option.setAttribute("class", "same-as-selected");
    option.innerHTML = selElmnt.options[j].innerHTML;
    option.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
            and the selected item:*/
      const selectOriginal = this.parentNode.parentNode.getElementsByTagName(
        "select"
      )[0];
      const qtyOptionsSelectOriginal = selectOriginal.length;
      const selectCustom = this.parentNode.previousSibling;

      for (let z = 0; z < qtyOptionsSelectOriginal; z++) {
        if (selectOriginal.options[z].innerHTML == this.innerHTML) {
          selectOriginal.selectedIndex = z;
          selectCustom.innerHTML = this.innerHTML;
          const optionsSelected = this.parentNode.getElementsByClassName(
            "same-as-selected"
          );
          const qtyOptionsSelected = optionsSelected.length;
          for (let k = 0; k < qtyOptionsSelected; k++) {
            optionsSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      selectCustom.click();
    });
    optionsContainer.appendChild(option);
  }
  allSelects[i].appendChild(optionsContainer);
  selectCustom.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
          and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
      except the current select box:*/
  var arrNo = [];
  const selectItems = document.getElementsByClassName("select-items");
  const selectSelected = document.getElementsByClassName("select-selected");
  const qtySelectItems = selectItems.length;
  const qtySelectSelected = selectSelected.length;
  for (let i = 0; i < qtySelectSelected; i++) {
    if (elmnt == selectSelected[i]) {
      arrNo.push(i);
    } else {
      selectSelected[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < qtySelectItems; i++) {
    if (arrNo.indexOf(i)) {
      selectItems[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
