'use strict';
document.addEventListener("DOMContentLoaded", function () {
    let autoFiller = new AutoFiller();
    autoFiller.setPlaceholders();
});

class AutoFiller {
    setPlaceholders() {
        let elements = document.body.getElementsByClassName('form__text-field');
        let elementsMap = new Map();
        elementsMap.set('firstName', 'first-name');
        elementsMap.set('lastName', 'last-name');
        elementsMap.set('gender', 'gender');
        elementsMap.set('email', 'email');

        let genders = document.body.getElementsByClassName('radio-group__radio');
        let gendersMap = new Map();
        gendersMap.set('female', 'gender-female');
        gendersMap.set('male', 'gender-male');

        let href = location.href;
        let searchParameters = new URLSearchParams(href);
        let first = href.substring(href.indexOf('?') + 1, href.indexOf('='));
        let args = [];
        let searchParametersEntries = searchParameters.entries();
        let firstElementToReplace = searchParametersEntries.next();
        firstElementToReplace.value[0] = first;
        args.push(firstElementToReplace.value);
        for (let i of searchParametersEntries) {
            args.push(i);
        }

        for (let i = 0; i < Math.min(elements.length, args.length); i++) {
            let value = elementsMap.get(args[i][0]);
            if(value === 'gender') {
                let gender = gendersMap.get(args[i][1]);
                for (let g of genders) {
                    if(g.id === gender) {
                        g.checked = "checked";
                    }
                }
            }
            for (let item of elements) {
                if (item.id === value) {
                    item.value = args[i][1];
                }
            }

        }
    }
}