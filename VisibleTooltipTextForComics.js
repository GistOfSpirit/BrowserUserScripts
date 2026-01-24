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
// @match        *://www.wildelifecomic.com/*
// @match        *://earth2068.cfw.me/*
// @match        *://www.earth2068.cfw.me/*
// @match        *://www.xpboostcomic.com/*
// @match        *://xpboostcomic.com/*
// @match        *://johnnywander.com/*
// @match        *://www.vaingloriouscomic.com/*
// @match        *://www.lothcomic.com/*
// @match        *://navcomic.com/*
// @match        *://www.clockwork-comic.com/*
// @match        *://spellxsword.com/*
// @match        *://www.spellxsword.com/*
// @match        *://flakypastry.runningwithpencils.com/*
// @match        *://www.flakypastry.runningwithpencils.com/*
// @match        *://riverine.thecomicseries.com/*
// @match        *://properfountaincare.the-comic.org/*
// @match        *://www.properfountaincare.the-comic.org/*
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
// @match        *://www.automansdaughter.com/*
// @match        *://ninegatescomic.com/*
// @match        *://www.awkwardzombie.com/*
// @match        *://www.nighheavenandhell.com/*
// @match        *://twokinds.keenspot.com/*
// @match        *://megatokyo.com/*
// @match        *://www.megatokyo.com/*
// @match        *://www.ozziethevampire.com/*
// @match        *://ozziethevampire.com/*
// @match        *://saintsquarter.com/*
// @match        *://www.saintsquarter.com/*
// @match        *://melvin.jeaniebottle.com/*
// @match        *://nortverse.com/*
// @match        *://reallifecomics.com/*
// @match        *://www.reallifecomics.com/*
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

    function compareDomain(domName) {
        const currDomain = `${window.location.hostname}`;

        return currDomain === domName
        || currDomain === `www.${domName}`;
    }

    function getComicData() {
        if (compareDomain('dumbingofage.com')) {
            // 1
            return {
                comic: '#spliced-comic img',
                body: '#spliced-comic'
            };
        } else if (compareDomain('comicaurora.com')) {
            // 1
            return {
                comic: '#mgsisk_webcomic_collection_widget_webcomicmedia-5 img',
                body: '#mgsisk_webcomic_collection_widget_webcomicmedia-5'
            };
        } else if (compareDomain('itneverrainscomic.com')) {
            // 1
            return {
                comic: 'table div img',
                bodyFunc: (comic) => comic.parentNode.parentNode
            };
        } else if (
            (compareDomain('xkcd.com'))
            || (compareDomain('yokokasquest.com'))
            || (compareDomain('superredundant.com'))
            || (compareDomain('thespecialistscomic.com'))
            || (compareDomain('grrlpowercomic.com'))
            || (compareDomain('howbabycomic.com'))
            || (compareDomain('thethiefoftales.com'))
            || (compareDomain('jeaniebottle.com'))
            || (compareDomain('melvin.jeaniebottle.com'))
            || (compareDomain('niinaeveliina.com'))
            || (compareDomain('motherlovercomic.com'))
            || (compareDomain('heirsoftheveil.com'))
            || (compareDomain('endcomic.com'))
            || (compareDomain('ninegatescomic.com'))
            || (compareDomain('megatokyo.com'))
            || (compareDomain('saintsquarter.com'))
            || (compareDomain('xpboostcomic.com'))
            || (compareDomain('reallifecomics.com'))
            || (compareDomain('saffroncomic.com'))
            || (compareDomain('lothcomic.com'))
        ) {
            // 20
            return {
                comic: '#comic img',
                body: '#comic'
            };
        } else if (compareDomain('agirlandherfed.com')) {
            // 1
            return {
                comic: '#comic-image img',
                body: '#comic-box'
            }
        } else if (compareDomain('sombulus.com')) {
            // 1
            return {
                comic: '#page img',
                body: '#page',
                afterFunc: (comic) => comic
            };
        } else if (compareDomain('giftscomic.com')) {
            // 1
            return {
                comic: '.comic_nav img',
                body: '.comic_nav'
            };
        } else if (compareDomain('twokinds.keenspot.com')) {
            // 1
            return {
                comic: '.comic img',
                body: '.comic'
            };
        } else if (compareDomain('earth2068.cfw.me')) {
            // 1
            return {
                comic: '#comicimage',
                body: '#comicpage2',
                after: 'div.comicimage'
            };
        } else if (
            (compareDomain('sleeplessdomain.com'))
            || (compareDomain('wychwoodcomic.com'))
            || (compareDomain('spinnyverse.com'))
            || (compareDomain('theglassscientists.com'))
            || (compareDomain('namesakecomic.com'))
            || (compareDomain('howtobeawerewolf.com'))
        ) {
            // 6
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'color: white'
            };
        } else if(compareDomain('nortverse.com')) {
            // 1
            return {
                comic: '#spliced-comic a',
                body: '#spliced-comic a'
            }
        } else if (
            compareDomain('monster-pulse.com')
            || compareDomain('vaingloriouscomic.com')
            || compareDomain('clockwork-comic.com')
        ) {
            // 3
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'color: black'
            };
        } else if (compareDomain('wildelifecomic.com')) {
            // 1
            return {
                comic: '#cc-comic',
                body: '#cc-comicbody',
                ttCss: 'background-color: white'
            };
        } else if (compareDomain('navcomic.com')) {
            // 1
            return {
                comic: '.attachment-full',
                body: '.webcomic-image'
            };
        } else if (compareDomain('flakypastry.runningwithpencils.com')) {
            // 1
            return {
                comic: 'map ~ img',
                bodyFunc: (comic) => comic.parentElement,
                afterFunc: (comic) => comic
            };
        } else if (compareDomain('riverine.thecomicseries.com')) {
            // 1
            return {
                comic: '#comicimage',
                body: '#comicimagewrap'
            }
        } else if (compareDomain('properfountaincare.the-comic.org')) {
            // 1
            return {
                comic: '.comicsegments img',
                body: '.comicsegments'
            }
        } else {
            // 30
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
