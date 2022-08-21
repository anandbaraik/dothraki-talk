const input = document.querySelector("#input");
const inputTranslation = document.querySelector("#input-translation");
const btnTranslate = document.querySelector("#btn-translate");
const api = `https://api.funtranslations.com/translate/dothraki.json`;

function getApi(text) {
    return `${api}?text=${encodeURI(text)}`;
}

function translateText() {
    let text = input.value;

    if(!text){
        alert('please enter text!'); return;
    }

    if(/\d/.test(text)) {
        alert('please enter only text not numbers!'); return;
    }
    
    document.querySelector("#btn-translate").disabled = true;

    fetch(getApi(text))
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            let {contents} = jsonResponse;
            if(contents.translated) inputTranslation.value = contents.translated;
        })
        .catch((error) => {
            console.log(error);
            alert('Something went wrong! please try after some time.');
        }).finally(() => {
            document.querySelector("#btn-translate").disabled = false;
        });
}

btnTranslate.addEventListener('click', translateText);