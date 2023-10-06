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
// @match        *://www.aghoststorycomic.com/*
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
// @match        *://www.grrlpowercomic.com/*
// @match        *://www.sisterclaire.com/*
// @match        *://sisterclaire.com/*
// @match        *://howbabycomic.com/*
// @match        *://www.howbabycomic.com/*
// @match        *://www.thethiefoftales.com/*
// @match        *://www.phantomarine.com/*
// @match        *://www.theglassscientists.com/*
// @match        *://theglassscientists.com/*
// @match        *://jeaniebottle.com/*
// @match        *://www.niinaeveliina.com/numb/*
// @match        *://niinaeveliina.com/numb/*
// @match        *://www.fairmeadowcomic.com/*
// @match        *://fairmeadowcomic.com/*
// @match        *://www.howtobeawerewolf.com/*
// @match        *://motherlovercomic.com/*
// @match        *://www.motherlovercomic.com/*
// @match        *://www.tryinghuman.com/*
// @match        *://heirsoftheveil.com/*
// @match        *://www.heirsoftheveil.com/*
// @match        *://www.endcomic.com/*
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
            // 1
            return {
                comic: '#comic-1 img',
                body: '#comic-1'
            };
        } else if (currDomain.endsWith('comicaurora.com')) {
            // 1
            return {
                comic: '#mgsisk_webcomic_collection_widget_webcomicmedia-5 img',
                body: '#mgsisk_webcomic_collection_widget_webcomicmedia-5'
            };
        } else if (currDomain.endsWith('itneverrainscomic.com')) {
            // 1
            return {
                comic: 'table div span img',
                bodyFunc: (comic) => comic.parentNode.parentNode
            };
        } else if (
            (currDomain.endsWith('xkcd.com'))
            || (currDomain.endsWith('yokokasquest.com'))
            || (currDomain.endsWith('superredundant.com'))
            || (currDomain.endsWith('thespecialistscomic.com'))
            || (currDomain.endsWith('grrlpowercomic.com'))
            || (currDomain.endsWith('howbabycomic.com'))
            || (currDomain.endsWith('thethiefoftales.com'))
            || (currDomain.endsWith('jeaniebottle.com'))
            || (currDomain.endsWith('niinaeveliina.com'))
            || (currDomain.endsWith('motherlovercomic.com'))
            || (currDomain.endsWith('heirsoftheveil.com'))
            || (currDomain.endsWith('endcomic.com'))
        ) {
            // 12
            return {
                comic: '#comic img',
                body: '#comic'
            };
        } else if (currDomain.endsWith('agirlandherfed.com')) {
            // 1
            return {
                comic: '#comic-image img',
                body: '#comic-box'
            }
        } else if (currDomain.endsWith('saffroncomic.com')) {
            // 1
            return {
                comic: '#comic picture',
                body: '#comic'
            };
        } else if (currDomain.endsWith('sombulus.com')) {
            // 1
            return {
                comic: '#page img',
                body: '#page',
                afterFunc: (comic) => comic
            };
        } else if (currDomain.endsWith('giftscomic.com')) {
            // 1
            return {
                comic: '.comic_nav img',
                body: '.comic_nav'
            };
        } else if (
            (currDomain.endsWith('sleeplessdomain.com'))
            || (currDomain.endsWith('wychwoodcomic.com'))
            || (currDomain.endsWith('spinnyverse.com'))
            || (currDomain.endsWith('theglassscientists.com'))
        ) {
            // 4
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'color: white'
            };
        } else if (currDomain.endsWith('monster-pulse.com')) {
            // 1
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'color: black'
            };
        } else {
            // 26
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
