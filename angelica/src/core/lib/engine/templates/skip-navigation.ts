/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const skipNavigationMethod: string = `
      // SO: SKIP NAVIGATION
      if(document.body.firstElementChild && !document.body.firstElementChild.textContent.toLowerCase().includes("skip")) {
        var mainContentIncluded = document.getElementById("content");
        var navigationContent;  
        var focusable = 'button, a, input, select, textarea';

        if(mainContentIncluded) {
           navigationContent = mainContentIncluded.querySelector(focusable);
        } else {
          var navContent = document.querySelector("nav");  
          if(navContent && navContent.nextSibling) {
            navigationContent = navContent.nextSibling.querySelector(focusable);
          }
        }

        if(navigationContent) {
          var skipContentButton = document.createElement("button");
          var skipContentCss = document.createElement("style");
          skipContentButton.setAttribute("class", "skipnav-a11y");
          skipContentButton.onclick = function clickElement() {
            navigationContent.focus();
          };
          skipContentButton.innerText = "Skip Navigation";
          skipContentCss.textContent = ".skipnav-a11y { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; } .skipnav-a11y:focus, .skipnav-a11y:active { position: absolute; left: 6px; width: auto; height: auto; overflow: visible; padding: 6px; }";
          document.head.append(skipContentCss);
          document.body.prepend(skipContentButton);      
        }
      }
      // EO: SKIP NAVIGATION
	`;
