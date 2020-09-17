///plus minus button for number
function up(max) {
    document.getElementById("myNumber").value = parseInt(document.getElementById("myNumber").value) + 1;
    if (document.getElementById("myNumber").value >= parseInt(max)) {
        document.getElementById("myNumber").value = max;
    }
}
function down(min) {
    document.getElementById("myNumber").value = parseInt(document.getElementById("myNumber").value) - 1;
    if (document.getElementById("myNumber").value <= parseInt(min)) {
        document.getElementById("myNumber").value = min;
    }
}

////description/additional information tab///////




function switchTab(){
    var descriptionTab = document.querySelector('#description')
    var descriptionBtn = document.querySelector('#description-tab')
    var additionalTab = document.querySelector('#additional-info')
    var additionalBtn = document.querySelector('#additional-tab')

    var target = this.event.target
    console.log(target);
    if (target == descriptionBtn){
        descriptionTab.style.display = 'block'
        additionalTab.style.display = 'none'


        descriptionBtn.style.color = '#13aff0'
        descriptionBtn.style.borderTop = '1px solid #13aff0'
        descriptionBtn.style.borderBottom = '1px solid #13aff0'

        additionalBtn.style.color = '#9b9b9b'
        additionalBtn.style.borderTop = 'none'
        additionalBtn.style.borderBottom = 'none'

    } else if (target == additionalBtn){
        descriptionTab.style.display = 'none'
        additionalTab.style.display = 'block'


        descriptionBtn.style.color = '#9b9b9b'
        descriptionBtn.style.borderTop = 'none'
        descriptionBtn.style.borderBottom = 'none'

        additionalBtn.style.color = '#13aff0'
        additionalBtn.style.borderTop = '1px solid #13aff0'
        additionalBtn.style.borderBottom = '1px solid #13aff0'
    }
}