'use strict';

/* ========================================================================= */

function disableStylesheets() {
    for (var i = 0; i < document.styleSheets.length; i++) {
        document.styleSheets[i].disabled = true;
    }

}

/* ========================================================================= */

function objectToListElement(obj) {
    var newUl = document.createElement('ul');

    for (var prop in obj) {

        if (obj.hasOwnProperty(prop)) {

            var liElem = document.createElement('li');

            var strongElem = document.createElement('strong');
            var strongText = document.createTextNode(prop + ':');
            strongElem.appendChild(strongText);

            liElem.appendChild(strongElem);

            var liText = document.createTextNode(' ' + obj[prop]);
            liElem.appendChild(liText);

            newUl.appendChild(liElem);

        }

    }

    return newUl;

}

/* ========================================================================= */

function getHeadMetaListElement() {

    console.log('getHeadMetaListElement');
    var obj = {
        url: document.URL,
        charset: document.charset,
        title: document.title,
        lastModified: document.lastModified
    };

    var metas = document.querySelectorAll('meta');

    for (var i = 0; i < metas.length; i++) {

        var metaName = metas[i].getAttribute('name');
        if (metaName) obj['meta ' + metaName] = metas[i].getAttribute('content');

    }

    var newUl = objectToListElement(obj);

    return newUl;

}

/* ========================================================================= */

function getCookiesListElement() {
    console.log('getCookiesListElement');

    var obj = {};

    var cookiesArray = document.cookie.split(';');

    for (var i = 0; i < cookiesArray.length; i++) {

        var cookieArray = cookiesArray[i].split('=');
        if (cookieArray[0]) obj[cookieArray[0]] = cookieArray[1];

    }

    var newUl = objectToListElement(obj);

    return newUl;

}

/* ========================================================================= */

function getHeadElementsCol(listElement, colTitle) {
    console.log('getHeadElementsCol');

    var colDiv = document.createElement('div');
    colDiv.className = 'foxy-head-elements-col';

    var metaTitleElem = document.createElement('p');
    var metaTitleText = document.createTextNode(colTitle);
    metaTitleElem.appendChild(metaTitleText);

    colDiv.appendChild(metaTitleElem);
    colDiv.appendChild(listElement);

    return colDiv;


}
/* ========================================================================= */

function displayHeadElements() {
    var div = document.createElement('div');
    div.className = 'foxy-head-elements';

    /* ========================================================================= */

    var notification = document.createElement('p');
    notification.className = 'foxy-notification';
    var notificationText = document.createTextNode(
        chrome.i18n.getMessage('spiderSimulatorReloadNotification')
    );
    notification.appendChild(notificationText);
    div.appendChild(notification);

    /* ========================================================================= */

    div.appendChild(
        getHeadElementsCol(
            getHeadMetaListElement(),
            'DOCUMENT'
        )
    );

    div.appendChild(
        getHeadElementsCol(
            getCookiesListElement(),
            'COOKIES'
        )
    );

    var divClear = document.createElement('div');
    divClear.className = 'foxy-clearfix';
    div.appendChild(divClear);


    document.body.insertBefore(div, document.body.firstElementChild);

}

/* ========================================================================= */

function replaceImgWithAlt() {
    // images are already set to display: none with css

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    for (var i = 0; i < document.images.length; i++) {

        var text = '';
        var cssClass = '';

        var newSpan = document.createElement('span');

        if (document.images[i].alt) {

            text = document.images[i].alt;
            cssClass = 'foxy-img-alt';

        }
        else {

            text = 'blank';
            cssClass = 'foxy-img-alt-none';

        }

        newSpan.className = cssClass;
        var newContent = document.createTextNode(text);
        newSpan.appendChild(newContent);

        var parentElement = document.images[i].parentElement;

        parentElement.insertBefore(newSpan, document.images[i]);

    }

}

/* ========================================================================= */

function replaceInputImgWithValue() {

    var formInputs = document.querySelectorAll('input[src]');

    for (var i = 0; i < formInputs.length; i++) {

        if (formInputs[i].value) {

            var newDiv = document.createElement('span');

            newDiv.className = 'foxy-input-value';

            var newContent = document.createTextNode(formInputs[i].value);
            newDiv.appendChild(newContent);

            var parentElement = formInputs[i].parentElement;

            parentElement.insertBefore(newDiv, formInputs[i]);

        }

    }


}

/* ========================================================================= */

function addExternalClassLinks() {
    // ex: http://stackoverflow.com
    var pageOrigin = window.location.protocol + '//' + window.location.host;

    var links = document.querySelectorAll('a[href^="http"]');

    for (var i = 0; i < links.length; i++) {

        var linkOrigin = links[i].protocol + '//' + links[i].host;

        if (pageOrigin !== linkOrigin) {

            links[i].className = 'foxy-external-link';

        }
    }
}

/* ========================================================================= */

disableStylesheets();
displayHeadElements();
replaceImgWithAlt();
replaceInputImgWithValue();
addExternalClassLinks();
