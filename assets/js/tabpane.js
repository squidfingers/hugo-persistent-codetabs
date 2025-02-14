// Set initial state of all .tabpane[id] elements on the page
window.addEventListener(
  "DOMContentLoaded",
  function (event) {
    const updateHash = (state) => {
      const hash = Object.keys(state)
        .map(function (tabpaneId) {
          const defaultTab = document.querySelector(`#${tabpaneId} input[type=radio][data-default]`);
          if (defaultTab && state[tabpaneId] == defaultTab.id) {
            // Only include the item in the hash if it's not the default
            return null;
          }
          if (!state[tabpaneId]) {
            return tabpaneId; // Anchor link
          }
          return `${tabpaneId}=${state[tabpaneId]}`;
        }).filter(Boolean).join("&");
      // Update the hash without affecting the browser history
      history.replaceState(null, null, (hash ? `#${hash}` : " "));
    };
    const getStateFromHash = () => {
      const hash = window.location.hash.substring(1);
      let state = {};
      if (hash) {
        hash.split("&").forEach(function (pair) {
          let [key, value] = pair.split("=");
          state[key] = value;
        });
      }
      return state;
    };
    // Get the initial state from the hash
    const state = getStateFromHash();
    // Find all tabpanes with an id, and set their initial state
    const tabpanes = document.querySelectorAll(".tabpane[id]");
    tabpanes.forEach(function (tabpane) {
      const tabpaneId = tabpane.id;
      const defaultTab = tabpane.querySelector("input[type=radio]:checked") || tabpane.querySelector("input[type=radio]");
      const defaultTabId = defaultTab.id
      defaultTab.dataset.default = true;
      const selectedTabId = state[tabpaneId] || defaultTabId;
      const selectedTab = document.getElementById(selectedTabId);
      if (selectedTab && selectedTab.closest(".tabpane") === tabpane) {
        selectedTab.checked = true;
      }
      // Attach event listeners to update the hash
      const tabs = tabpane.querySelectorAll("input[type=radio]");
      tabs.forEach(function (tab) {
        tab.addEventListener("change", function () {
          state[tabpaneId] = this.id;
          updateHash(state);
        });
      });
    });
    // Intercept all anchor links on the page, so they will persist the state in the hash
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        const anchorId = this.href.substring(this.href.indexOf("#") + 1);
        // Remove any existing anchor id in the state object
        for (let key in state) {
          if (state[key] === undefined) {
            delete state[key];
          }
        }
        // Add this anchor id to the state object
        state[anchorId] = undefined;
        // Update the location
        updateHash(state);
        // Navigate to the closest element with this anchor id
        const anchor = this.closest(`#${anchorId}`);
        if (anchor) {
          anchor.scrollIntoView();
        }
        event.preventDefault();
      })
    });
    // If there's an anchor id embedded in the hash string along with the tabpane state, extract the anchor id and scroll to the element
    if (Object.keys(state).length > 1) {
      for (let key in state) {
        if (state[key] === undefined) {
          const anchor = document.getElementById(key);
          if (anchor) {
            anchor.scrollIntoView();
          }
          break;
        }
      }
    }
  },
  false,
);
