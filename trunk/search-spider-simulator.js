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

function addLi(tag, text) {
    tag = document.createElement(tag);
    tag.innerText = text;
    return tag;
}

function getHeadingsListElement() {
    console.log('getHeadingsListElement');

    var hs = ['h1', 'h2', 'h3', 'h4', 'h5'];

    var newUl = document.createElement('ul');
    for (var i = 0; i < hs.length; i++) {
        var els = document.querySelectorAll(hs[i]);
        newUl.appendChild(addLi('lh', "### " + hs[i]));

        for (var h = 0; h < els.length; h++) {
            newUl.appendChild(addLi('li', "- " + els[h].innerText));
        }
    }

    return newUl;


}

/* ========================================================================= */

function noscript(strCode) {
    strCode = strCode.replace(/<head.*?>.*?<\/head>/igm, '');
    strCode = strCode.replace(/<script.*?>.*?<\/script>/igm, '');
    strCode = strCode.replace(/<style.*?>.*?<\/style>/igm, '');
    strCode = strCode.replace(/<meta.*?>.*?<\/meta>/igm, '');

    return strCode;
}

/* ========================================================================= */

function getGTMKey(script) {
    var uaRegex = "UA-[\\d]+-[\\d]+";
    var uaCharCnt = 13;
    var gtmRegex = "GTM-[A-Z1-9]+";
    var gtmCharCnt = 11;

    var data = '';

    if (script.innerText) {
        data = data + script.innerText;
    }

    if (script.getAttribute('src')) {
        data = data + script.getAttribute('src');
    }

    var gtmPos = data.search(gtmRegex);
    if (gtmPos > 0) {
        var gtmLi = document.createElement('li');
        gtmLi.setAttribute('class', 'green');
        gtmLi.innerText = "Google Tag Manager: " + data.slice(gtmPos, gtmPos + gtmCharCnt);
        return gtmLi;
    }

    var uaPos = data.search(uaRegex);

    if (uaPos > 0) {
        var uaLi = document.createElement('li');
        uaLi.setAttribute('class', 'green');
        uaLi.innerText = "Google App Id: " + data.slice(uaPos, uaPos + uaCharCnt);
        return uaLi;
    }

    return false;
}

function getAnalyticsElement() {
    var scripts = document.getElementsByTagName("script");
    var scriptList = document.createElement('ul');
    var found = false;
    for (var i = 0; i < scripts.length; ++i) {
        var googleTagManagerID = getGTMKey(scripts[i]);
        if (false !== googleTagManagerID) {
            scriptList.appendChild(googleTagManagerID);
            found = true;
        }
    }

    if(false === found) {
        var notFound = document.createElement('li');
        notFound.innerHTML = "No analytics found."
        notFound.setAttribute('class', 'red');
        scriptList.appendChild(notFound);
    }

    return scriptList;

}
/* ========================================================================= */

function getContentLength() {
    var minLength = 350;
    var content = document.body[('innerText' in document.body) ? 'innerText' : 'textContent'];
    content = noscript(content);
    var contentLength = content.match(/\S+/g).length;
    var liContentLength = document.createElement('li');
    liContentLength.innerHTML = "<b>Word Count: </b>" + contentLength + ' / ' + minLength;
    return liContentLength;
}

/* ========================================================================= */

function getImgAltListElement() {
    console.log('getImgAltListElement');

    var imgList = document.createElement('ul');
    var images = document.images;

    for (var i = 0; i < images.length; i++) {

        var img = images[i];

        if (img.title) {
            imgList.appendChild(addLi('lh', '### title: ' + img.title));
        } else {
            imgList.appendChild(addLi('lh', '### title: blank'));
        }

        imgList.appendChild(addLi('li', '- alt: ' + img.alt));
        imgList.appendChild(addLi('li', '- width: ' + img.width));
        imgList.appendChild(addLi('li', '- height: ' + img.height));

        if (img.getAttribute('data-orig-size')) {
            imgList.appendChild(addLi('li', '- data-orig-size: ' + img.getAttribute('data-orig-size')));
        }

        var a = document.createElement("a");
        a.textContent = img.src;
        a.setAttribute('href', img.src);
        imgList.appendChild(document.createElement('li').appendChild(a));

    }

    return imgList;
}

function getTitleLength() {
    var allowedLength = 60;

    var li = document.createElement('li');
    li.innerHTML = "<b>Title Length: </b>" + document.title.length + " / " + allowedLength;
    return li;
}

function getMetaLength() {
    var allowedLength = 160;
    var metas = document.querySelectorAll('meta');
    var metaLength;
    var li = document.createElement('li');

    li.innerHTML = "<b>No meta description</b>"
    for (var i = 0; i < metas.length; i++) {
        var metaName = metas[i].getAttribute('name');
        if ("description" === metaName) {
            metaLength = metas[i].getAttribute('content').length;
            li.innerHTML = "<b>Meta description Length: </b>" + metaLength + " / " + allowedLength;
        }
    }

    return li;
}

/* ========================================================================= */

function getContentElement() {
    console.log('getContentElement');

    var contentList = document.createElement('ul');

    contentList.appendChild(getContentLength());
    contentList.appendChild(getTitleLength());
    contentList.appendChild(getMetaLength());

    return contentList;
}

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

        if (metaName) {
            obj['meta ' + metaName] = metas[i].getAttribute('content');
        }

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
            '## DOCUMENT'
        )
    );

    div.appendChild(
        getHeadElementsCol(
            getAnalyticsElement(),
            '## ANALYTICS'
        )
    );

    div.appendChild(
        getHeadElementsCol(
            getHeadingsListElement(),
            '## HEADINGS'
        )
    );

    div.appendChild(
        getHeadElementsCol(
            getContentElement(),
            '## CONTENT'
        )
    );

    div.appendChild(
        getHeadElementsCol(
            getImgAltListElement(),
            '## IMAGES'
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
