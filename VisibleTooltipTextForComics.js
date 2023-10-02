// ==UserScript==
// @name         Visible Tooltip Text for Comics
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes tooltip text on comic sites visible below the comic
// @author       You
// @run-at       document-end
// @match        *://www.sakana-comic.com/*
// @match        *://www.daughterofthelilies.com/*
// @match        *://www.littletinythings.com/*
// @match        *://www.dumbingofage.com/*
// @match        *://www.gogetaroomie.com/*
// @match        *://comicaurora.com/*
// @match        *://www.itneverrainscomic.com/*
// @match        *://itneverrainscomic.com/*
// @match        *://xkcd.com/*
// @match        *://www.startripcomic.com/*
// @match        *://www.starhammercomic.com/*
// @match        *://www.agirlandherfed.com/*
// @match        *://yokokasquest.com/*
// @match        *://www.sleeplessdomain.com/*
// @match        *://www.namesakecomic.com/*
// @match        *://namesakecomic.com/*
// @match        *://www.aliceandthenightmare.com/*
// @match        *://aliceandthenightmare.com/*
// @match        *://www.saffroncomic.com/*
// @match        *://saffroncomic.com/*
// @match        *://www.solstoria.net/*
// @match        *://solstoria.net/*
// @match        *://sombulus.com/*
// @match        *://www.sombulus.com/*
// @match        *://www.forgottenordercomic.com/*
// @match        *://forgottenordercomic.com/*
// @match        *://www.cassiopeiaquinn.com/*
// @match        *://cassiopeiaquinn.com/*
// @match        *://www.monster-pulse.com/*
// @match        *://www.wychwoodcomic.com/*
// @match        *://www.godslavecomic.com/*
// @match        *://www.misfile.com/*
// @match        *://giftscomic.com/*
// @match        *://www.widdershinscomic.com/*
// @match        *://widdershinscomic.com/*
// @match        *://www.tigertigercomic.com/*
// @match        *://www.thewitchdoor.com/*
// @match        *://www.white-noise-comic.com/*
// @match        *://white-noise-comic.com/*
// @match        *://www.sdamned.com/*
// @match        *://www.noendcomic.com/*
// @match        *://transfusionscomic.com/*
// @match        *://www.transfusionscomic.com/*
// @match        *://www.spinnyverse.com/*
// @match        *://superredundant.com/*
// @match        *://www.superredundant.com/*
// @match        *://thespecialistscomic.com/*
// @grant        none
// ==/UserScript==

// match directives starting with https://www.monster-pulse.com
// and below are for sites where the tooltip doesn't have extra
// comments.

(function() {
    'use strict';

    function removeTooltips(elem) {
        elem.removeAttribute('title');
        elem.removeAttribute('alt');

        for (const c of elem.children) {
            removeTooltips(c);
        }
    }

    function getComicData() {
        const currDomain = `${window.location.hostname}`;

        if (currDomain.endsWith('dumbingofage.com')) {
            return {
                comic: '#comic-1 img',
                body: '#comic-1'
            };
        } else if (currDomain.endsWith('comicaurora.com')) {
            return {
                comic: '#mgsisk_webcomic_collection_widget_webcomicmedia-5 img',
                body: '#mgsisk_webcomic_collection_widget_webcomicmedia-5'
            };
        } else if (currDomain.endsWith('itneverrainscomic.com')) {
            return {
                comic: 'table div span img',
                bodyFunc: (comic) => comic.parentNode.parentNode
            };
        } else if (
            (currDomain.endsWith('xkcd.com'))
            || (currDomain.endsWith('yokokasquest.com'))
            || (currDomain.endsWith('superredundant.com'))
            || (currDomain.endsWith('thespecialistscomic.com'))
        ) {
            return {
                comic: '#comic img',
                body: '#comic'
            };
        } else if (currDomain.endsWith('agirlandherfed.com')) {
            return {
                comic: '#comic-image img',
                body: '#comic-box'
            }
        } else if (currDomain.endsWith('saffroncomic.com')) {
            return {
                comic: '#comic picture',
                body: '#comic'
            };
        } else if (currDomain.endsWith('sombulus.com')) {
            return {
                comic: '#page img',
                body: '#page',
                afterFunc: (comic) => comic
            };
        } else if (currDomain.endsWith('giftscomic.com')) {
            return {
                comic: '.comic_nav img',
                body: '.comic_nav'
            };
        } else if (
            (currDomain.endsWith('sleeplessdomain.com'))
            || (currDomain.endsWith('wychwoodcomic.com'))
            || (currDomain.endsWith('spinnyverse.com'))
        ) {
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'color: white'
            };
        } else if (currDomain.endsWith('monster-pulse.com')) {
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'color: black'
            };
        } else {
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody'
            };
        }
    }

    const comicData = getComicData();

    const comicImg = document.querySelector(comicData.comic);
    const tooltipStr = comicImg?.title;

    if (tooltipStr) {
        const ttParText = document.createTextNode(tooltipStr);

        const ttPar = document.createElement('p');

        if (comicData.ttCss) {
            ttPar.style = comicData.ttCss;
        }

        ttPar.appendChild(ttParText);

        const comicBody = comicData.bodyFunc?.(comicImg) ?? document.querySelector(comicData.body);
        removeTooltips(comicBody);

        const prevElem = comicData.afterFunc?.(comicImg) ?? document.querySelector(comicData.after);
        comicBody.insertBefore(ttPar, prevElem?.nextSibling);
    }
})();
